/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("\n\nconst selectors = {\n  boardContainer: document.querySelector('.board-container'),\n  board: document.querySelector('.board'),\n  moves: document.querySelector('.moves'),\n  timer: document.querySelector('.timer'),\n  start: document.querySelector('button'),\n  win: document.querySelector('.win')\n};\nconst state = {\n  gameStarted: false,\n  flippedCards: 0,\n  totalFlips: 0,\n  totalTime: 0,\n  loop: 0\n};\nconst pickRandom = (array, items) => {\n  const clonedArray = [...array];\n  const randomPicks = [];\n  for (let index = 0; index < items; index++) {\n    const randomIndex = Math.floor(Math.random() * clonedArray.length);\n    randomPicks.push(clonedArray[randomIndex]);\n    clonedArray.splice(randomIndex, 1);\n  }\n  return randomPicks;\n};\nconst shuffle = array => {\n  const clonedArray = [...array];\n  for (let index = clonedArray.length - 1; index > 0; index--) {\n    const randomIndex = Math.floor(Math.random() * (index + 1));\n    const original = clonedArray[index];\n    clonedArray[index] = clonedArray[randomIndex];\n    clonedArray[randomIndex] = original;\n  }\n  return clonedArray;\n};\nconst generateGame = () => {\n  const dimensions = selectors.board.getAttribute('data-dimension');\n  const emojis = ['🍄', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝'];\n  const picks = pickRandom(emojis, dimensions * 4 / 2);\n  const items = shuffle([...picks, ...picks]);\n  const cards = `\n            <div class=\"board\" style=\"grid-template-columns: repeat(${dimensions}, auto)\">\n                ${items.map(item => `\n                    <div class=\"card\">\n                        <div class=\"card-front\"></div>\n                        <div class=\"card-back\">${item}</div>\n                    </div>\n                `).join('')}\n           </div>\n        `;\n  const parser = new DOMParser().parseFromString(cards, 'text/html');\n  selectors.board.replaceWith(parser.querySelector('.board'));\n};\nconst startGame = () => {\n  state.gameStarted = true;\n  selectors.start.classList.add('disabled');\n  state.loop = setInterval(() => {\n    state.totalTime++;\n    selectors.moves.innerText = `${state.totalFlips} moves`;\n    selectors.timer.innerText = `time: ${state.totalTime} sec`;\n  }, 1000);\n};\nconst flipBackCards = () => {\n  document.querySelectorAll('.card:not(.matched)').forEach(card => {\n    card.classList.remove('flipped');\n  });\n};\nconst flipCard = card => {\n  state.flippedCards++;\n  state.totalFlips++;\n  if (!state.gameStarted) {\n    startGame();\n  }\n  if (state.flippedCards <= 2) {\n    card.classList.add('flipped');\n    const flippedCards = document.querySelectorAll('.flipped:not(.matched)');\n    if (flippedCards.length === 2) {\n      if (flippedCards[0].innerText === flippedCards[1].innerText) {\n        flippedCards[0].classList.add('matched');\n        flippedCards[1].classList.add('matched');\n        setTimeout(() => {\n          flippedCards[0].style.cssText = \"visibility: hidden;\";\n          flippedCards[1].style.cssText = \"visibility: hidden;\";\n        }, 1000);\n        state.flippedCards = 0;\n      }\n    }\n  }\n  if (state.flippedCards === 3) {\n    setTimeout(() => {\n      flipBackCards();\n      card.classList.add('flipped');\n      state.flippedCards = 1;\n    }, 1000);\n  }\n  if (!document.querySelectorAll('.card:not(.flipped)').length) {\n    setTimeout(() => {\n      selectors.boardContainer.classList.add('flipped');\n      selectors.win.innerHTML = `\n                    <span class=\"win-text\">\n                        You won!<br />\n                        with <span class=\"highlight\">${state.totalFlips}</span> moves<br />\n                        under <span class=\"highlight\">${state.totalTime}</span> seconds\n                    </span>\n                `;\n      clearInterval(state.loop);\n    }, 1000);\n    selectors.start.setAttribute('style', \"color: red;\");\n    selectors.start.addEventListener('click', restart);\n  }\n};\nconst attachEventListeners = () => {\n  document.addEventListener('click', event => {\n    const eventTarget = event.target;\n    const eventParent = eventTarget.parentElement;\n    if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {\n      flipCard(eventParent);\n    } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {\n      startGame();\n    }\n  });\n};\nfunction restart() {\n  window.location.reload();\n}\ngenerateGame();\nattachEventListeners();\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;