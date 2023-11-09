let cells = document.getElementsByClassName("cell");
let playerO = document.getElementsByClassName("player-o")[0];
let playerX = document.getElementsByClassName("player-x")[0];
let playerOMessage = document.getElementById("player-o-message");
let playerXMessage = document.getElementById("player-x-message");
let move = 0;
let icon = document.getElementsByClassName("icon");
let resetBtn = document.getElementById("reset-btn");
let iconNum = document.getElementsByClassName("fa");
let gameMessage = document.getElementById("game-message");
let gameEnd = false;

playerX.style.border = 0;
playerO.style.border = 0;
playerXMessage.innerHTML = "Waiting...";
playerOMessage.innerHTML = "Waiting...";

for (let cell of cells) {
    cell.addEventListener("click", playerMoved);
    cell.addEventListener("click", checkForWins);
    cell.addEventListener("click", checkForDraws);
}

resetBtn.addEventListener("click", function () {
    gameEnd = false;
    move = 0;
    playerX.style.border = 0;
    playerO.style.border = 0;
    playerXMessage.innerHTML = "Waiting...";
    playerOMessage.innerHTML = "Waiting...";
    for (let cell of cells) {
        cell.removeEventListener("click", playerMoved);
        cell.removeEventListener("click", checkForWins);
        cell.removeEventListener("click", checkForDraws);
    }

    for (let cell of cells) {
        const iconElements = cell.getElementsByClassName("icon");
        for (let icon of iconElements) {
            cell.removeChild(icon);
        }
    }

    for (let cell of cells) {
        cell.addEventListener("click", playerMoved);
        cell.addEventListener("click", checkForWins);
        cell.addEventListener("click", checkForDraws);
    }

    gameMessage.innerHTML = "Click the board to start";
});

function playerMoved(event) {
    if (gameEnd === false){
        move++;
        // if (move === 1){
        //     if (move % 2 === 1) {
        //         createIconInCell(event.target, "fa-circle fa-solid fa-7x");
        //         playerOMessage.innerHTML = "Waiting...";
        //         playerXMessage.innerHTML = "Waiting...";
        //     } else {
        //         createIconInCell(event.target, "fa-xmark fa-solid fa-8x");
        //         playerX.style.border = 0;
        //         playerO.style.border = "5px solid white";
        //         playerXMessage.innerHTML = "Waiting...";
        //         playerOMessage.innerHTML = "Waiting...";
        //     }
        // }
        if (move % 2 === 1) {
            createIconInCell(event.target, "fa-circle fa-solid fa-7x");
            playerO.style.border = 0;
            playerO.style.opacity = 0.5;
            playerX.style.border = "5px groove #00ADB5";
            playerX.style.opacity = 1;
            playerOMessage.innerHTML = "Waiting...";
            playerXMessage.innerHTML = "Playing...";
        } else {
            createIconInCell(event.target, "fa-xmark fa-solid fa-8x");
            playerX.style.border = 0;
            playerX.style.opacity = 0.5;
            playerO.style.border = "5px groove #FF2E63";
            playerO.style.opacity = 1;
            playerXMessage.innerHTML = "Waiting...";
            playerOMessage.innerHTML = "Playing...";
        }
        event.target.removeEventListener("click", playerMoved);
    }
}

function createIconInCell(cell, iconClass) {
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon");
    iconDiv.innerHTML = `<i class="fa ${iconClass}"></i>`;
    cell.appendChild(iconDiv);
}

function checkForWins() {
    for (let i = 1; i <= 3; i++) {
        const row = document.querySelector(`.row-${i}`);
        const childElements = row.children;
        let countCircle = 0;
        let countXMark = 0;

        for (const element of childElements) {
            if (element.querySelector(".fa-circle")) {
                countCircle++;
                if (countCircle === 3) {
                    displayWinMessage("Circles");
                    return;
                }
                countXMark = 0;
            } else if (element.querySelector(".fa-xmark")) {
                countXMark++;
                if (countXMark === 3) {
                    displayWinMessage("Crosses");
                    return;
                }
                countCircle = 0;
            }
        }
    }

    for (let i = 1; i <= 3; i++) {
        const column = document.querySelectorAll(`.cell-${i}`);
        let countCircle = 0;
        let countXMark = 0;

        for (const cell of column) {
            if (cell.querySelector(".fa-circle")) {
                countCircle++;
                if (countCircle === 3) {
                    displayWinMessage("Circles");
                    return;
                }
                countXMark = 0; 
            } else if (cell.querySelector(".fa-xmark")) {
                countXMark++;
                if (countXMark === 3) {
                    displayWinMessage("Crosses");
                    return;
                }
                countCircle = 0;
            }
        }
    }

    let circleDiagonalCheck = 0;
    let xmarkDiagonalCheck = 0;
    for (let i = 1; i <= 3; i++) {
        const rowToCheck = document.querySelector(`.row-${i}`);
        const cellToCheck = rowToCheck.querySelector(`.cell-${i}`);
    
        if (cellToCheck.querySelector(".fa-circle")) {
            circleDiagonalCheck++;
        } else {
            circleDiagonalCheck = 0;
        }
    
        if (circleDiagonalCheck === 3) {
            displayWinMessage("Circles");
            return;
        }

        if (cellToCheck.querySelector(".fa-xmark")) {
            xmarkDiagonalCheck++;
        } else {
            xmarkDiagonalCheck = 0;
        }
    
        if (xmarkDiagonalCheck === 3) {
            displayWinMessage("Crosses");
            return;
        }
    }

    for (let i = 1; i <= 3; i++) {
        let rowToCheck = document.querySelector(`.row-${i}`);
        let cellToCheck = rowToCheck.querySelector(`.cell-${4 - i}`);
    
        if (cellToCheck.querySelector(".fa-circle")) {
            circleDiagonalCheck++;
        } else {
            circleDiagonalCheck = 0;
        }
    
        if (circleDiagonalCheck === 3) {
            displayWinMessage("Circles");
            return;
        }

        if (cellToCheck.querySelector(".fa-xmark")) {
            xmarkDiagonalCheck++;
        } else {
            xmarkDiagonalCheck = 0;
        }
    
        if (xmarkDiagonalCheck === 3) {
            displayWinMessage("Crosses");
            return;
        }
    }
}

function checkForDraws(){
    if (iconNum.length === 9){
        gameMessage.innerHTML = `It's a draw!`;
    }
}

function displayWinMessage(winner) {
    console.log("Before setting gameEnd:", gameEnd);
    gameMessage.innerHTML = `The ${winner} have won!`;
    gameEnd = true;
    console.log("After setting gameEnd:", gameEnd);
}