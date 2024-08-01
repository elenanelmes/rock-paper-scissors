const body = document.querySelector('#body');

const CHOICES = ['rock', 'paper', 'scissors'];
const ROUNDS = 5;

let computerScore = 0;
let humanScore = 0;
let roundCounter = 0;

const btnStart = document.querySelector('#btn-start');
btnStart.addEventListener('click', startGame);

function startGame() {
    btnStart.remove();
    createChoiceContainer();
    createScoreContainer();
}

function createChoiceContainer() {
    const choiceContainer = createElement('div', { id: 'choice-container' });
    const choiceHeader = createElement('h2', {}, 'Make a choice:');
    const choiceButtons = createElement('div', { id: 'choice-buttons' });

    choiceContainer.append(choiceHeader, choiceButtons);
    document.body.appendChild(choiceContainer);

    CHOICES.forEach(choice => {
        const btnChoice = createElement('button', {
            id: choice,
            class: 'btn-choice'
        }, capitaliseStr(choice));
        choiceButtons.appendChild(btnChoice);
    });

    choiceButtons.addEventListener('click', event => {
        if (event.target.classList.contains('btn-choice')) {
            playRound(event.target.id);
        }
    });
}

function createScoreContainer() {
    const scoreContainer = createElement('div', { id: 'score-container' });
    const scoreHeader = createElement('h2', {}, 'Running Score');
    const scoreTable = createElement('table', { id: 'score-table', style: 'border: 1px solid black;' });
    const thead = createElement('thead');
    const tbody = createElement('tbody');

    scoreTable.append(thead, tbody);
    scoreContainer.append(scoreHeader, scoreTable);
    document.body.appendChild(scoreContainer);

    const headers = ['Round', 'Human', 'Computer', 'Winner'];
    const tr = createElement('tr');
    headers.forEach(header => {
        const th = createElement('th', {}, header);
        tr.appendChild(th);
    });
    thead.appendChild(tr);
}

function playRound(humanChoice) {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    const winner = determineWinner(humanChoice, computerChoice);
    updateScoreTable(humanChoice, computerChoice, winner);

    if (++roundCounter === ROUNDS) {
        endGame();
    }
}

function determineWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) return 'draw';

    const winningConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    return winningConditions[humanChoice] === computerChoice ? 'human' : 'computer';
}

function updateScoreTable(humanChoice, computerChoice, winner) {
    const table = document.querySelector('#score-table tbody');
    const tr = createElement('tr');
    const values = [
        roundCounter + 1,
        capitaliseStr(humanChoice),
        capitaliseStr(computerChoice),
        capitaliseStr(winner)
    ];

    values.forEach(value => {
        const td = createElement('td', {}, value);
        tr.appendChild(td);
    });

    table.appendChild(tr);

    if (winner === 'human') humanScore++;
    if (winner === 'computer') computerScore++;
}

function endGame() {
    document.querySelector('#choice-container').remove();
    printFinalScore();
    announceWinner();
    createResetButton();
}

function printFinalScore() {
    const finalScore = createElement('h2', {}, `Final Score: Human ${humanScore} | Computer ${computerScore}`);
    document.body.appendChild(finalScore);
}

function announceWinner() {
    const winnerAnnouncement = createElement('h2');
    if (humanScore > computerScore) {
        winnerAnnouncement.textContent = "*** Human wins. That's you. Congrats! ***";
    } else if (computerScore > humanScore) {
        winnerAnnouncement.textContent = '*** Computer wins! ***';
    } else {
        winnerAnnouncement.textContent = '*** Everybody wins! ***';
    }
    document.body.appendChild(winnerAnnouncement);
}

function resetGame() {
    document.querySelector('#btn-reset').remove();
    document.querySelector('#score-container').remove();
    document.querySelectorAll('h2').forEach(element => element.remove());

    computerScore = 0;
    humanScore = 0;
    roundCounter = 0;

    createChoiceContainer();
    createScoreContainer();
}

function createResetButton() {
    const btnReset = createElement('button', { id: 'btn-reset' }, 'Play Again');
    document.body.appendChild(btnReset);
    btnReset.addEventListener('click', resetGame);
}

function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    if (textContent) element.textContent = textContent;
    return element;
}

function capitaliseStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}