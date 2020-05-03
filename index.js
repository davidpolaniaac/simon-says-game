const lightBlue = document.getElementById('lightBlue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 10

class Game {
    constructor() {
        this.initialize = this.initialize.bind(this)
        this.initialize()
        this.generateSequence()
        setTimeout(this.nextLevel, 500)

    }

    initialize() {
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.togglebtnStart()
        this.level = 1
        this.colors = {
            lightBlue,
            violet,
            orange,
            green
        }
    }

    togglebtnStart() {

        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide')

        } else {
            btnStart.classList.add('hide')
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(x => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        this.sublevel = 0
        this.illuminateSequence()
        this.addEventsClick()
    }

    transformNumberAColor(number) {
        switch (number) {
            case 0:
                return 'lightBlue'
            case 1:
                return 'violet'
            case 2:
                return 'orange'
            case 3:
                return 'green'
        }
    }

    transformColorANumero(color) {
        switch (color) {
            case 'lightBlue':
                return 0
            case 'violet':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3
        }
    }

    illuminateSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberAColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i)
        }
    }

    illuminateColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350)
    }

    turnOffColor(color) {
        this.colors[color].classList.remove('light')
    }

    addEventsClick() {
        this.colors.lightBlue.addEventListener('click', this.chooseColor)
        this.colors.green.addEventListener('click', this.chooseColor)
        this.colors.violet.addEventListener('click', this.chooseColor)
        this.colors.orange.addEventListener('click', this.chooseColor)
    }

    removeEventsClick() {
        this.colors.lightBlue.removeEventListener('click', this.chooseColor)
        this.colors.green.removeEventListener('click', this.chooseColor)
        this.colors.violet.removeEventListener('click', this.chooseColor)
        this.colors.orange.removeEventListener('click', this.chooseColor)
    }

    chooseColor(ev) {
        const nameColor = ev.target.dataset.color
        const numberColor = this.transformColorANumero(nameColor)
        this.illuminateColor(nameColor)
        if (numberColor === this.sequence[this.sublevel]) {
            this.sublevel++;
            if (this.sublevel === this.level) {
                this.level++
                this.removeEventsClick()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.winGame()
                } else {
                    setTimeout(this.nextLevel, 1500)

                }
            }
        } else {
            this.loserGame()
        }
    }

    winGame() {
        swal("Simon", "Congratulations, you won the game", "success")
            .then(() => this.initialize())
    }

    loserGame() {
        swal("Simon", "Sorry, you lost the game :(", "error")
            .then(() => {
                this.initialize()
                this.removeEventsClick()
            })
    }

}

function startGame() {
    var game = new Game()
    window.Game = game
}