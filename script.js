const board = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");
const restartBtn = document.getElementById("restart");

const icons = ["🍎", "🍌", "🍇", "🍒", "🍓", "🥝", "🍍", "🍑"];
let cards = [...icons, ...icons];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = "";
    moves = 0;
    movesText.textContent = moves;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    shuffle(cards).forEach(icon => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.textContent = "";
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.textContent = this.dataset.icon;
    this.classList.add("open");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesText.textContent = moves;
    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        resetTurn();
    }, 800);
}

function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartBtn.addEventListener("click", createBoard);

createBoard();






















