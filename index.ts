const selectors = {
    boardContainer: document.querySelector('.board-container') as HTMLDivElement | null,
    board: document.querySelector('.board') as HTMLDivElement,
    moves: document.querySelector('.moves') as HTMLDivElement | null,
    timer: document.querySelector('.timer') as HTMLDivElement | null,
    start: document.querySelector('button') as HTMLDivElement | null,
    win: document.querySelector('.win') as HTMLDivElement | null
};


const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
};

const pickRandom = (array: [...string[]], items: number): [(string | undefined)?] => {
    const clonedArray: [...string[]] = [...array];
    const randomPicks: [string?] = [];

    for (let index: number = 0; index < items; index++) {
        const randomIndex: number = Math.floor(Math.random() * clonedArray.length);
        randomPicks.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }

    return randomPicks;
}

//  const shuffle =  array: => {
//         const clonedArray: [...string[]] = [...array];
    
//         for (let index = clonedArray.length - 1; index > 0; index--) {
//             const randomIndex = Math.floor(Math.random() * (index + 1));
//             const original = clonedArray[index];
    
//             clonedArray[index] = clonedArray[randomIndex];
//             clonedArray[randomIndex] = original;
//         }
    
//         return clonedArray;
//     }
    
//     const generateGame = () => {
//         const dimensions = selectors.board.getAttribute('data-dimension');
//         const emojis: string[] = ['🍄', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝'];
//         const picks = pickRandom(emojis, (dimensions * 4) / 2);
//         const items = shuffle([...picks, ...picks]);
//         const cards = `
//             <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
//                 ${items.map(item => `
//                     <div class="card">
//                         <div class="card-front"></div>
//                         <div class="card-back">${item}</div>
//                     </div>
//                 `).join('')}
//            </div>
//         `;
    
//         // const parser = new DOMParser().parseFromString(cards, 'text/html');
//         // selectors.board.replaceWith(parser.querySelector('.board'));
//     }


