const startBtnElement = document.querySelector('.start-btn');

function boardMousdownHandler(evt) {
    const cell = evt.target;
    if (!cell.classList.contains('cell')) {
        return;
       }

    if (cell.classList.contains('question')) {
       cell.classList.add('question-close');
     } else if (evt.target.classList.contains('first-bomb')) {
        cell.classList.add('bomb-first');
     } else {
       startBtnElement.classList.add('amaze');
     }
}

function boardMousupHandler(evt) {
    const cell = evt.target;
    if (!cell.classList.contains('cell')) {
        return;
       }
    if (cell.classList.contains('question')) {
        cell.classList.remove('question-close');
    } else if (cell.classList.contains('first-bomb')) {
         cell.classList.remove('bomb-first');
    } else {
        startBtnElement.classList.remove('amaze');
    }
}

const startBtnMousdownHandler = () => startBtnElement.classList.add('start');

const startBtnMousupHandler = () => startBtnElement.classList.remove('start');

export {boardMousdownHandler, boardMousupHandler, startBtnMousdownHandler, startBtnMousupHandler}