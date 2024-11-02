var player = 1;
var victory = -1; // -1 indicates the game is still ongoing
var matrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

function resetBoard() {
    for (let i = 0; i < document.querySelectorAll(".col").length; i++) {
        document.querySelectorAll(".col")[i].innerHTML = ""; // Clear each cell
    }
    // Reset the matrix and variables
    matrix = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];
    player = 1;
    victory = -1;
    document.getElementById("notify").innerHTML = "Player 1's turn";
}

function checkVictory() {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (matrix[i][0] === player && matrix[i][1] === player && matrix[i][2] === player) return true;
        if (matrix[0][i] === player && matrix[1][i] === player && matrix[2][i] === player) return true;
    }
    // Check diagonals
    if (matrix[0][0] === player && matrix[1][1] === player && matrix[2][2] === player) return true;
    if (matrix[0][2] === player && matrix[1][1] === player && matrix[2][0] === player) return true;
    return false;
}

function checkDraw() {
    // Check if all cells are filled
    for (let row of matrix) {
        if (row.includes(-1)) return false; // If there's an empty cell, it's not a draw
    }
    return true; // All cells are filled
}

function playerMove(value, row, col) {
    if (value.innerHTML !== "" || victory !== -1) return; // Prevent moves if cell is filled or game won

    // Update the matrix and display the move
    matrix[row][col] = player;
    if (player === 1) {
        value.innerHTML = "X";
    } else {
        value.innerHTML = "O";
    }
    
    // Check for victory
    if (checkVictory()) {
        victory = player;
        document.getElementById("notify").innerHTML = "Player " + player + " wins!";
        return;
    }

    // Check for draw if no victory
    if (checkDraw()) {
        victory = 0; // Set to 0 to indicate the game ended in a draw
        document.getElementById("notify").innerHTML = "No moves – Game ends in a draw!";
        return;
    }

    // Switch player if no victory or draw
    player = player === 1 ? 2 : 1;
    document.getElementById("notify").innerHTML = "Player " + player + "'s turn";
}
