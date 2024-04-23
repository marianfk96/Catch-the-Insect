const screens = document.querySelectorAll('.screen')
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn')
const startBtn = document.getElementById('start-btn')
const gameContainer = document.querySelector('.game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')

let seconds = 0
let score = 0
let selectedInsect= {}

startBtn.addEventListener("click", () => {
    screens[0].classList.add('up')
})

chooseInsectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')

        selectedInsect = {src, alt}
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame ()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let mins = Math.floor(seconds/60)
    let secs = seconds%60

    mins = mins<10 ? `0${mins}` : mins
    secs = secs<10 ? `0${secs}` : secs

    timeEl.innerHTML = `Time: ${mins}:${secs}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const {x, y} = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `
    <img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random()*360}deg)" />
    `

    insect.addEventListener("click", catchInsect)
    gameContainer.appendChild(insect)
}

function getRandomLocation () {
    /* get screen width and height -> we don't wanna place the insects outside of our screen */
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random()*(width-200)+100
    const y = Math.random()*(height-200)+100
    return {x, y}
}

function catchInsect() {
    increaseScore()
    /* this refers to the insect that is clicked on */
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore() {
    score++
    if (score>19) {
        messageEl.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}
