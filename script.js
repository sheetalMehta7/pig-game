'use strict';
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const diceImg = document.querySelector(".dice");
const players = document.querySelectorAll(".player");
const scoreElement = document.querySelectorAll(".score");
const currentScoreElement = document.querySelectorAll(".current-score");

let diceNumber;
let activePlayer;
let totalScoreP1;
let totalScoreP2;
let currentScoreP1;
let currentScoreP2;

function rollaDice() {
    diceImg.style.display = "block";
    diceNumber = Math.floor(Math.random() * 6) + 1;
    console.log(diceNumber)
    if (totalScoreP1 >= 100 || totalScoreP2 >= 100) return;
    if (diceNumber === 1) {
        if (activePlayer === 1) {
            currentScoreP1 = 0;
            currentScoreElement[0].textContent = currentScoreP1;
            activePlayer = 2;
            players[0].classList.remove("player--active");
            players[1].classList.add("player--active");
        } else {
            currentScoreP2 = 0;
            currentScoreElement[1].textContent = currentScoreP2;
            activePlayer = 1;
            players[0].classList.add("player--active");
            players[1].classList.remove("player--active");
        }
    } else {
        if (activePlayer === 1) {
            currentScoreP1 += diceNumber;
        } else {
            currentScoreP2 += diceNumber;
        }
        currentScoreElement[activePlayer - 1].textContent = activePlayer === 1 ? currentScoreP1 : currentScoreP2;
    }
    diceImg.setAttribute("src", `dice-${diceNumber}.png`)
}

function holdScore() {
    //fun to hold the score.
    if (totalScoreP1 >= 100 || totalScoreP2 >= 100) return;
    if (activePlayer === 1) {
        totalScoreP1 += currentScoreP1;
        scoreElement[0].textContent = totalScoreP1;
        if (totalScoreP1 >= 100) {
            players[0].classList.add("player--winner");
            return;
        }
        currentScoreP1 = 0;
        activePlayer = 2;
        currentScoreElement[0].textContent = currentScoreP1;
        players[0].classList.remove("player--active");
        players[1].classList.add("player--active");
    } else {
        totalScoreP2 += currentScoreP2;
        scoreElement[1].textContent = totalScoreP2;
        if (totalScoreP2 >= 100) {
            rollDiceBtn.setAttribute("disabled", true);
            holdBtn.setAttribute("disabled", true);
            players[1].classList.add("player--winner");
            return;
        }
        currentScoreP2 = 0;
        activePlayer = 1;
        currentScoreElement[1].textContent = currentScoreP2;
        players[1].classList.remove("player--active");
        players[0].classList.add("player--active");
    }

}

function startGame() {
    //fun to re-set or start the game
    activePlayer = 1;
    totalScoreP1 = 0;
    totalScoreP2 = 0;
    currentScoreP1 = 0;
    currentScoreP2 = 0;
    for (let i = 0; i < 2; i++) {
        scoreElement[i].textContent = "0";
        currentScoreElement[i].textContent = "0";
        if (players[i].classList.contains("player--winner")) {
            players[i].classList.remove("player--winner")
        }
    }
    players[0].classList.add("player--active");
    diceImg.style.display = "none";
}

window.onload = () => {
    startGame();
}

rollDiceBtn.addEventListener("click", rollaDice);
holdBtn.addEventListener("click", holdScore);
newGameBtn.addEventListener("click", startGame)