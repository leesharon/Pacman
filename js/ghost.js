'use strict'
const GHOST = '&#9781'
var gGhosts = []
var gIntervalGhosts

function createGhost(board, idx = 0) {
    // DONE
    var ghost = {
        location: {
            i: 2 + idx,
            // i: 2,
            j: 6
        },
        currCellContent: EMPTY,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = getGhostHTML(GHOST, ghost.color)
}

function createGhosts(board) {
    gGhosts = []
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === GHOST) return
    if (nextCell === POWER_FOOD) return

    // if (gIsWeak) {
    //     setTimeout(() => {

    //     }, 5000);
    // }
    // DONE: hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (gIsSuperPower) return
        gameOver()
        return
    }

    // DONE: moving from current position:
    // DONE: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)
    // renderCellGhostColor(ghost.location, '')

    // DONE: Move the ghost to new location
    // DONE: update the model
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost, ghost.color))
    // renderCellGhostColor(ghost.location, ghost.color)
}

function getMoveDiff() {
    // const randNum = getRandomIntInclusive(1, 100)
    // if (randNum <= 25) {
    //     return { i: 0, j: 1 }
    // } else if (randNum <= 50) {
    //     return { i: -1, j: 0 }
    // } else if (randNum <= 75) {
    //     return { i: 0, j: -1 }
    // } else {
    //     return { i: 1, j: 0 }
    // }

    const randNum = getRandomIntInclusive(1, 4)
    if (randNum === 1) {
        return { i: 0, j: 1 }
    } else if (randNum === 2) {
        return { i: -1, j: 0 }
    } else if (randNum === 3) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var color = gIsSuperPower ? 'blue' : ghost.color
    return `<span style="color:${color};">${GHOST}</span>`
}

function spliceGhostByLocation(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (ghost.location.i === location.i && ghost.location.j === location.j) {
            gGhosts.splice(i, 1)
        }
    }
}
