import {WIDTH, HEIGHT} from '../consts.js';
import {isBomb} from './main.js';

function isInMargin(row, column){
    return row >= 0 && row < HEIGHT
    && column >= 0 && column < WIDTH;
}

function getBombsCount(row, column) {
    let bombsCount = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (isBomb(row + y, column + x)) {
                bombsCount ++;
            }
        }
    }
    return {
        count: bombsCount,
        class: `count-${bombsCount}`,
    }
}

export {isInMargin, getBombsCount};
