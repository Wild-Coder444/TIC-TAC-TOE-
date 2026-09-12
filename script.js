const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => cellClick(index));
});

function cellClick(index){
    if(cells[index].innerText !== "" || !gameActive) return;

    cells[index].innerText = currentPlayer;

    if(checkWin()){
        statusText.innerText = `Player ${currentPlayer} Wins 🥳🎉`;
        gameActive = false;
        return;
    }

    if(checkDraw()){
        statusText.innerText = "Game Draw 🤫";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer} Turn`;
}

function checkWin(){
    return winPatterns.some(pattern => {
        return pattern.every(index => 
            cells[index].innerText === currentPlayer
        );
    });
}

function checkDraw(){
    return [...cells].every(cell => cell.innerText !== "");
}

function restartGame(){
    cells.forEach(cell => cell.innerText = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Player X Turn";
}
