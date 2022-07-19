'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🥦'
const CHERRY = '🍒'

var gFoodCount = 60
var gCherryIntervalId
var gBoard
const gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    printMat(gBoard, '.board-container')
    createGhosts(gBoard)
    gGame.isOn = true
    gCherryIntervalId = setInterval(placeGameElement, 15000, CHERRY)
    gFoodCount = 53
}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (i === 1 && i === j || i === size - 2 && i === j
                || i === size - 2 && j === 1 || j === size - 2 && i === 1) {
                board[i][j] = POWER_FOOD
            }
        }
    }
    return board
}

function restartGame() {
    var elModal = document.querySelector('.game-over-modal')
    var elModalWin = document.querySelector('.game-win-modal')
    elModal.style.display = 'none'
    elModalWin.style.display = 'none'
    init()
    gGame.score = 0
}

function gameWin() {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalId)
    gGame.isOn = false
    var elModal = document.querySelector('.game-win-modal')
    elModal.style.display = 'block'
}

function gameOver() {
    // TODO
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalId)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    var elModal = document.querySelector('.game-over-modal')
    elModal.style.display = 'block'
}

function placeGameElement(elm) {
    gFoodCount++
    var cell = getRandomEmptyCell(gBoard)
    // renderCell(cell, elmImg)
    gBoard[cell.i][cell.j] = CHERRY
    var elCell = document.querySelector(`.cell-${cell.i}-${cell.j}`)
    elCell.innerText = elm
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff

    //DOM
    document.querySelector('h2 span').innerText = gGame.score
}

