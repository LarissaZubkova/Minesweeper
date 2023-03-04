import {HEIGHT, WIDTH, BOMB_COUNT} from '../consts.js';
import {boardMousdownHandler, boardMousupHandler, startBtnMousdownHandler, startBtnMousupHandler} from './handlers.js';
import {setBombsDisplay} from './bombs-display.js';
import {setTimerDisplay, stopTimer, resetTimerDisplay} from './timer.js';
import {isInMargin, getBombsCount} from './utils.js';

const boardElement = document.querySelector('main');
const startBtnElement = document.querySelector('.start-btn');

let bombs = [];
let cells = [];
let bombLoose;
let closedCellsCount = WIDTH * HEIGHT;
let bombsCountOnField = BOMB_COUNT;

function resetGame() {
    cells = [];
    bombs = [];
    bombLoose = '';
    closedCellsCount = WIDTH * HEIGHT;
    boardElement.innerHTML = '';
    resetTimerDisplay();
    startBtnElement.classList.remove('win', 'loose');
}

function renderGame() {
    for (let x = 0; x < WIDTH; x++) {
        let columnElement = document.createElement('div');
        columnElement.setAttribute('class', 'column');

        for (let y = 0; y < HEIGHT; y++) {
            let cellElement = document.createElement('div');
            cellElement.setAttribute('class', 'cell');
            columnElement.append(cellElement);
        }
        boardElement.append(columnElement);
    }
}

function startClickHandler() {
    let bombsCountOnField = BOMB_COUNT;
    
    stopTimer();
    resetTimerDisplay();
    resetGame();
    renderGame();
    
    cells = [...boardElement.querySelectorAll('.cell')];
    bombs = [...Array(cells.length).keys()]
    .sort(() => Math.random() - 0.5).slice(0, BOMB_COUNT);

    setBombsDisplay(bombsCountOnField);
    
    boardElement.addEventListener('click', boardClickHandler);
    boardElement.addEventListener('contextmenu', contextmenuHendler);
    boardElement.addEventListener('mousedown', boardMousdownHandler);
    boardElement.addEventListener('mouseup', boardMousupHandler);

    function boardClickHandler(evt) {
        if (!evt.target.classList.contains('cell')) {
         return;
        }

        const index = cells.indexOf(evt.target);
        const row = Math.floor(index / WIDTH)
        const column = index % WIDTH;

        setTimerDisplay();

        if (closedCellsCount === WIDTH * HEIGHT && isBomb(row, column)) {
            cells[index].classList.add('first-bomb');
            boardElement.addEventListener('mousedown', boardMousdownHandler);
            boardElement.addEventListener('mouseup', boardMousupHandler);
            return;
        }
        if (evt.target.classList.contains('question')) {
            evt.target.classList.remove('question');
            openField(row, column);
           }
        if (isBomb(row, column))  bombLoose = cells[index];
        openField(row, column);
    }
} 

function contextmenuHendler(evt) {
    evt.preventDefault();
    const cell = evt.target;
    cell.removeAttribute('disabled');
    
    if (cell.classList.contains('flag')) {
        cell.classList.remove('flag');
        cell.classList.add('question');
        bombsCountOnField++;

    } else if (cell.classList.contains('question')) {
        cell.classList.remove('question');
      
    } else {
        if (bombsCountOnField <= 0) return;
        cell.classList.add('flag');

        bombsCountOnField--;

        cell.setAttribute('disabled', 'disabled');  
    }
    setBombsDisplay(bombsCountOnField);
}

function openField(row, column) {
    if (!isInMargin(row, column)) return;

    const index = row * WIDTH + column;
    const cell = cells[index];

    if (cell.getAttribute('disabled') === 'disabled') return;
    
    cell.setAttribute('disabled', 'disabled');
    if (isBomb(row, column)) {
         startBtnElement.classList.add('loose');
         stopTimer();
         cells.forEach((cell) => {
            const indexCurrent = cells.indexOf(cell);
            const rowCurrent = Math.floor(indexCurrent / WIDTH)
            const columnCurrent = indexCurrent % WIDTH;
            if (isBomb(rowCurrent, columnCurrent)) {
                openField(rowCurrent, columnCurrent);
                cell.classList.add('bomb-loose');
                bombLoose.classList.add('bomb');
            }
            cell.setAttribute('disabled', 'disabled');
            cell.classList.add('loose');
         });
      } else {
        cell.classList.add(getBombsCount(row, column).class);
      }  

    closedCellsCount--;

    if (closedCellsCount <= BOMB_COUNT) {
        startBtnElement.classList.add('win');
        stopTimer();
        return;
    }

    const bombsCount = getBombsCount(row, column).count;

    if (bombsCount === 0) {
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
               openField(row + y, column + x);
            }
        }
        return;
    }
}

function isBomb(row, column) {
    if(!isInMargin(row, column)) return;

    const index = row * WIDTH + column;
    return bombs.includes(index);
}

startBtnElement.addEventListener('mousedown', startBtnMousdownHandler);
startBtnElement.addEventListener('mouseup', startBtnMousupHandler);

startClickHandler();
startBtnElement.addEventListener('click', startClickHandler);

export {isBomb};
