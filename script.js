const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');

const cards = [
    '1', '1', '2', '2', '3', '3', '4', '4',
    '5', '5', '6', '6', '7', '7', '8', '8'
];

let score = 0;
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValue;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');

    const backImage = document.createElement('img');
    backImage.src = `images/${cardValue}.png`;
    back.appendChild(backImage);

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            flipCard(card);
        }
    });

    return card;
}

function flipCard(card) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        // Match
        new Audio('sounds/match.mp3').play();
        score++;
        scoreElement.textContent = score;
        matchedCards.push(card1, card2);
        flippedCards = [];
    } else {
        // Mismatch
        new Audio('sounds/mismatch.mp3').play();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function initGame() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    matchedCards = [];
    score = 0;
    scoreElement.textContent = score;
    cards.forEach(cardValue => {
        const card = createCard(cardValue);
        gameBoard.appendChild(card);
    });
    document.getElementById('win-message').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
}

document.getElementById('restart-btn').addEventListener('click', initGame);
document.getElementById('play-again-btn').addEventListener('click', initGame);

function checkForWin() {
    if (matchedCards.length === cards.length) {
        document.getElementById('final-score').textContent = score;
        document.getElementById('win-message').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        // Match
        new Audio('sounds/match.mp3').play();
        score++;
        scoreElement.textContent = score;
        matchedCards.push(card1, card2);
        flippedCards = [];
        checkForWin();
    } else {
        // Mismatch
        new Audio('sounds/mismatch.mp3').play();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

initGame();
