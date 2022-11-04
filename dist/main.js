/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************!*\
  !*** ./index.js ***!
  \******************/


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var selectors = {
  boardContainer: document.querySelector('.board-container'),
  board: document.querySelector('.board'),
  moves: document.querySelector('.moves'),
  timer: document.querySelector('.timer'),
  start: document.querySelector('button'),
  win: document.querySelector('.win')
};
var state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: 0
};
var pickRandom = function pickRandom(array, items) {
  var clonedArray = _toConsumableArray(array);
  var randomPicks = [];
  for (var index = 0; index < items; index++) {
    var randomIndex = Math.floor(Math.random() * clonedArray.length);
    randomPicks.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return randomPicks;
};
var shuffle = function shuffle(array) {
  var clonedArray = _toConsumableArray(array);
  for (var index = clonedArray.length - 1; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    var original = clonedArray[index];
    clonedArray[index] = clonedArray[randomIndex];
    clonedArray[randomIndex] = original;
  }
  return clonedArray;
};
var generateGame = function generateGame() {
  var dimensions = selectors.board.getAttribute('data-dimension');
  var emojis = ['🍄', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝'];
  var picks = pickRandom(emojis, dimensions * 4 / 2);
  var items = shuffle([].concat(_toConsumableArray(picks), _toConsumableArray(picks)));
  var cards = "\n            <div class=\"board\" style=\"grid-template-columns: repeat(".concat(dimensions, ", auto)\">\n                ").concat(items.map(function (item) {
    return "\n                    <div class=\"card\">\n                        <div class=\"card-front\"></div>\n                        <div class=\"card-back\">".concat(item, "</div>\n                    </div>\n                ");
  }).join(''), "\n           </div>\n        ");
  var parser = new DOMParser().parseFromString(cards, 'text/html');
  selectors.board.replaceWith(parser.querySelector('.board'));
};
var startGame = function startGame() {
  state.gameStarted = true;
  selectors.start.classList.add('disabled');
  state.loop = window.setInterval(function () {
    state.totalTime++;
    selectors.moves.innerText = "".concat(state.totalFlips, " moves");
    selectors.timer.innerText = "time: ".concat(state.totalTime, " sec");
  }, 1000);
};
var flipBackCards = function flipBackCards() {
  document.querySelectorAll('.card:not(.matched)').forEach(function (card) {
    card.classList.remove('flipped');
  });
};
var flipCard = function flipCard(card) {
  state.flippedCards++;
  state.totalFlips++;
  if (!state.gameStarted) {
    startGame();
  }
  if (state.flippedCards <= 2) {
    card.classList.add('flipped');
    var flippedCards = document.querySelectorAll('.flipped:not(.matched)');
    if (flippedCards.length === 2) {
      if (flippedCards[0].innerText === flippedCards[1].innerText) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        setTimeout(function () {
          flippedCards[0].style.cssText = "visibility: hidden;";
          flippedCards[1].style.cssText = "visibility: hidden;";
        }, 1000);
        state.flippedCards = 0;
      }
    }
  }
  if (state.flippedCards === 3) {
    setTimeout(function () {
      flipBackCards();
      card.classList.add('flipped');
      state.flippedCards = 1;
    }, 1000);
  }
  if (!document.querySelectorAll('.card:not(.flipped)').length) {
    setTimeout(function () {
      selectors.boardContainer.classList.add('flipped');
      selectors.win.innerHTML = "\n                    <span class=\"win-text\">\n                        You won!<br />\n                        with <span class=\"highlight\">".concat(state.totalFlips, "</span> moves<br />\n                        under <span class=\"highlight\">").concat(state.totalTime, "</span> seconds\n                    </span>\n                ");
      clearInterval(state.loop);
    }, 1000);
    selectors.start.setAttribute('style', "color: red;");
    selectors.start.addEventListener('click', restart);
  }
};
var attachEventListeners = function attachEventListeners() {
  document.addEventListener('click', function (event) {
    var eventTarget = event.target;
    var eventParent = eventTarget.parentElement;
    if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
      flipCard(eventParent);
    } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
      startGame();
    }
  });
};
function restart() {
  window.location.reload();
}
generateGame();
attachEventListeners();
/******/ })()
;
//# sourceMappingURL=main.js.map