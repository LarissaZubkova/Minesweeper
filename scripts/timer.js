import {TIMER_CLASS_DEFAULT} from '../consts.js';

const displayTimerElement = document.querySelector('.timer');
const timerDigitsElements = displayTimerElement.children;
const startBtnElement = document.querySelector('.start-btn');
let timer;
let milliseconds = 0;

function setTimerDisplay() {
    if (!displayTimerElement.classList.contains('stoped')) return;
    
    if (startBtnElement.classList.contains('loose') || startBtnElement.classList.contains('win')) return;
    displayTimerElement.classList.remove('stoped');
    clearInterval(timer);
    timer = setInterval(() => {
        milliseconds += 10;
        let dateTimer = new Date(milliseconds);
        dateTimer.getSeconds();
        const seconds = milliseconds/1000;
        let secondDigits;
        if (seconds < 10) {
            secondDigits = '00' + seconds; 
        } else if (seconds < 100) {
            secondDigits = '0' + seconds;
        } else {
            secondDigits = String(seconds);
        }

        const digits = secondDigits.split('');
        
        [...timerDigitsElements].forEach((digit) => digit.removeAttribute('class'));

        timerDigitsElements[0].classList.add(`number-${digits[0]}`);
        timerDigitsElements[1].classList.add(`number-${digits[1]}`);
        timerDigitsElements[2].classList.add(`number-${digits[2]}`);
    }, 10)
}

function stopTimer() {
    displayTimerElement.classList.add('stoped');
    clearInterval(timer);
}

function resetTimerDisplay() {
    milliseconds = 0;
    [...timerDigitsElements].forEach((digit) => digit.removeAttribute('class'));
    timerDigitsElements[0].classList.add(TIMER_CLASS_DEFAULT);
    timerDigitsElements[1].classList.add(TIMER_CLASS_DEFAULT);
    timerDigitsElements[2].classList.add(TIMER_CLASS_DEFAULT);
}

export {setTimerDisplay, stopTimer, resetTimerDisplay};
