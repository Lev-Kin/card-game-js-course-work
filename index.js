"use strict";
const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
};
const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: 0
};
const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];
    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        randomPicks.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }
    return randomPicks;
};
const shuffle = (array) => {
    const clonedArray = [...array];
    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const original = clonedArray[index];
        clonedArray[index] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }
    return clonedArray;
};
const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension');
    const emojis = ['🍄', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝'];
    const picks = pickRandom(emojis, (dimensions * 4) / 2);
    const items = shuffle([...picks, ...picks]);
    const cards = `
            <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
                ${items.map(item => `
                    <div class="card">
                        <div class="card-front"></div>
                        <div class="card-back">${item}</div>
                    </div>
                `).join('')}
           </div>
        `;
    const parser = new DOMParser().parseFromString(cards, 'text/html');
    selectors.board.replaceWith(parser.querySelector('.board'));
};
const startGame = () => {
    state.gameStarted = true;
    selectors.start.classList.add('disabled');
    state.loop = window.setInterval(() => {
        state.totalTime++;
        selectors.moves.innerText = `${state.totalFlips} moves`;
        selectors.timer.innerText = `time: ${state.totalTime} sec`;
    }, 1000);
};
const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    });
};
const flipCard = (card) => {
    state.flippedCards++;
    state.totalFlips++;
    if (!state.gameStarted) {
        startGame();
    }
    if (state.flippedCards <= 2) {
        card.classList.add('flipped');
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');
        if (flippedCards.length === 2) {
            if (flippedCards[0].innerText === flippedCards[1].innerText) {
                flippedCards[0].classList.add('matched');
                flippedCards[1].classList.add('matched');
                setTimeout(() => {
                    flippedCards[0].style.cssText = "visibility: hidden;";
                    flippedCards[1].style.cssText = "visibility: hidden;";
                }, 1000);
                state.flippedCards = 0;
            }
        }
    }
    if (state.flippedCards === 3) {
        setTimeout(() => {
            flipBackCards();
            card.classList.add('flipped');
            state.flippedCards = 1;
        }, 1000);
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped');
            selectors.win.innerHTML = `
                    <span class="win-text">
                        You won!<br />
                        with <span class="highlight">${state.totalFlips}</span> moves<br />
                        under <span class="highlight">${state.totalTime}</span> seconds
                    </span>
                `;
            clearInterval(state.loop);
        }, 1000);
        selectors.start.setAttribute('style', "color: red;");
        selectors.start.addEventListener('click', restart);
    }
};
const attachEventListeners = () => {
    document.addEventListener('click', (event) => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;
        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent);
        }
        else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame();
        }
    });
};
function restart() {
    window.location.reload();
}
generateGame();
attachEventListeners();
