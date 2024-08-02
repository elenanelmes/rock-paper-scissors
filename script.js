const body = document.querySelector('#body');

const CHOICES = ['rock', 'paper', 'scissors'];
const EMOJIS = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};
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
        }, formatChoice(choice));
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
    const scoreHeader = createElement('h2', {id: 'score-header'}, `Human ${humanScore} : Computer ${computerScore}`);
    scoreContainer.append(scoreHeader);
    document.body.appendChild(scoreContainer);
}

function printScoreTable() {
    const scoreContainer = document.querySelector('#score-container');

    const scoreTable = createElement('table', { id: 'score-table' });
    const thead = createElement('thead');
    const tbody = createElement('tbody');
    
    scoreTable.append(thead, tbody);
    scoreContainer.append(scoreTable);

    const headers = ['Round', 'Human', 'Computer', 'Winner'];
    const tr = createElement('tr');
    headers.forEach(header => {
        const th = createElement('th', {}, header);
        tr.appendChild(th);
    });
    thead.appendChild(tr);    
}

function updateScoreHeader() {
    const scoreHeader = document.querySelector('#score-header');
    scoreHeader.textContent = `Human ${humanScore} : Computer ${computerScore}`;
}

function playRound(humanChoice) {
    if (roundCounter === 0) {
        printScoreTable();
    }

    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    const winner = determineWinner(humanChoice, computerChoice);
    updateScoreTable(humanChoice, computerChoice, winner);

    if (++roundCounter === ROUNDS) {
        announceWinner(winner);
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
        formatChoice(humanChoice),
        formatChoice(computerChoice),
        capitaliseStr(winner)
    ];

    values.forEach(value => {
        const td = createElement('td', {}, value);
        tr.appendChild(td);
    });

    table.appendChild(tr);

    if (winner === 'human') humanScore++;
    if (winner === 'computer') computerScore++;

    updateScoreHeader();
}

function endGame() {
    document.querySelector('#choice-container').remove();
    createResetButton();
}

function announceWinner(winner) {
    const winnerHeader = createElement('h2', { id: 'winner-header'});
    const decorator = '***';
    const winnerAnnouncementText = {
        computer: 'Computer wins!',
        draw: 'Everybody wins!',
        human: "Human wins. That's you. Congrats!"
    };

    winnerHeader.innerHTML = decorator + ' ' + winnerAnnouncementText[winner] + ' ' + decorator;
    document.body.appendChild(winnerHeader);
}

function resetGame() {
    document.querySelector('#btn-reset').remove();
    document.querySelector('#score-container').remove();
    document.querySelectorAll('h2').forEach(elem => elem.remove());

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

function formatChoice(choice) {
    return `${EMOJIS[choice]}` + ' ' + capitaliseStr(choice);
}
