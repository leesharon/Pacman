function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            if (cell === GHOST) { }
            strHTML += `<td class="${className}"> ${cell} </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function renderCellGhostColor(location, color) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.style.color = color
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// returns a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// returning a fixed number from array
function drawNum(gNums) {
    var randIdx = getRandomInt(0, gNums.length)
    var num = gNums[randIdx]
    gNums.splice(randIdx, 1)
    return num
}

// Gets a random Integer
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomEmptyCell(board) {
    var cells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell === EMPTY) {
                var coord = { i, j }
                cells.push(coord)
            }
        }
    }
    var randomCell = drawNum(cells)
    return randomCell
}
