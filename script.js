const buttons = document.querySelectorAll('button');
const body = document.querySelector('#body');
const gameContainer = document.querySelector('#game-container');
const table = document.querySelector('#table');

const CHOICES = ['rock', 'paper', 'scissors'];
const rounds = 5;

let computerScore = 0;
let humanScore = 0;
let roundCounter = 0;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playRound(button.id);
    });
});

function playRound(humanChoice) {
    const computerChoice = CHOICES[Math.floor(Math.random() * 3)];
    const winner = determineWinner(humanChoice, computerChoice);

    switch (winner) {
        case 'draw':
            break;
        case 'human':
            humanScore++;
            break;
        case 'computer':
            computerScore++;
            break;
    }

    const tableRow = table.insertRow(roundCounter + 1);
    const valueRound = tableRow.insertCell(0);
    const valueHuman = tableRow.insertCell(1);
    const valueComputer = tableRow.insertCell(2);
    const valueWinner = tableRow.insertCell(3);

    valueRound.textContent = roundCounter + 1;
    valueHuman.textContent = humanChoice;
    valueComputer.textContent = computerChoice;
    valueWinner.textContent = winner;
    
    if (roundCounter === rounds - 1) {
        gameContainer.removeChild(gameContainer.firstElementChild);
        announceWinner();
        endGame();
    } else {
        roundCounter++;
    }

    return 'draw';
}

function determineWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) return 'draw';

    const winningConditions = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'rock'
    };

    return winningConditions[humanChoice] === computerChoice ? 'human' : 'computer';
}

function endGame() {
    const resetBtn = document.createElement('button');
    resetBtn.setAttribute('id', 'resetBtn');
    resetBtn.textContent = 'Play Again';
    document.body.appendChild(resetBtn);

    resetBtn.addEventListener("click", () => {
        window.location.reload();
    });
}

function announceWinner() {
    const h3 = document.createElement('h3');
    console.log('human score: ' + humanScore);
    console.log('comp score: ' + computerScore);

    if (humanScore === computerScore) {
        h3.textContent = '*** Everybody wins! ***';
    } else if (humanScore > computerScore) {
        h3.textContent = '*** Human wins! ***';
    } else {
        h3.textContent = '*** Computer wins! ***';
    }
    
    document.body.appendChild(h3);
}
