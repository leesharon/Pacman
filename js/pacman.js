'use strict'
const PACMAN = '😷'
var gIsSuperPower = false
var gPacman

function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 2,
            j: 2
        }
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST && gIsSuperPower) {
        spliceGhostByLocation(nextLocation)
        renderNextMovePacman(nextLocation)
        return
    }

    // DONE: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        gameOver()
        return
    }

    if (nextCell === FOOD) {
        gFoodCount--
        updateScore(1)
        if (gFoodCount === 1) gameWin()
    }

    if (nextCell === POWER_FOOD) {
        if (gIsSuperPower) return
        gIsSuperPower = true
        setTimeout(() => {
            gIsSuperPower = false
            while (gGhosts.length < 3) {
                createGhost(gBoard)
            }
        }, 5000);
    }

    if (nextCell === CHERRY) {
        gFoodCount--
        updateScore(10)
        if (gFoodCount === 1) gameWin()
    }

    renderNextMovePacman(nextLocation)
}

function renderNextMovePacman(nextLocation) {
    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation // {i:2 ,j:3}
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // TODO: figure out nextLocation
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;

        default:
            break;
    }
    return nextLocation
}