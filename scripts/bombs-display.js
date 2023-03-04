function setBombsDisplay(bombsCount) {
    const displayBombsElement = document.querySelector('.bombs');
    let bombsCountDigits;

    if (bombsCount < 0) {
        bombsCountDigits = '000';
        return
    }

    if (bombsCount < 10) {
        bombsCountDigits = '00' + bombsCount; 
    } else if (bombsCount < 100) {
        bombsCountDigits = '0' + bombsCount;
    } else {
        bombsCountDigits = String(bombsCount);
    }

    const bombs = bombsCountDigits.split('');

    const bombsDigitsElements = displayBombsElement.children;
    [...bombsDigitsElements].forEach((digit) => digit.removeAttribute('class'));
    bombsDigitsElements[0].classList.add(`number-${bombs[0]}`);
    bombsDigitsElements[1].classList.add(`number-${bombs[1]}`);
    bombsDigitsElements[2].classList.add(`number-${bombs[2]}`);
}

export {setBombsDisplay};
