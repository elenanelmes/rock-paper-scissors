const body = document.querySelector('#body');

const CHOICES = ['rock', 'paper', 'scissors'];
const rounds = 5;

let computerScore = 0;
let humanScore = 0;
let roundCounter = 0;

function capitaliseStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const btnStart = document.querySelector('#btn-start');
btnStart.addEventListener("click", () => {
    btnStart.remove();

    const choiceContainer = document.createElement('div');
    choiceContainer.setAttribute('id', 'choice-container');
    
    const choiceHeader = document.createElement('h2');
    choiceHeader.innerText = 'Make a choice:';
    choiceContainer.appendChild(choiceHeader);
    
    let choiceButtons = document.createElement('div');
    choiceButtons.setAttribute('id', 'choice-buttons');
    choiceContainer.appendChild(choiceButtons);
    
    function printButtons() {
        for (let i = 0; i < CHOICES.length; i++) {
            const btn = document.createElement('button');
            btn.setAttribute('id', `${CHOICES[i]}`);
            btn.setAttribute('class', 'btn-choice');
            btn.innerText = `${CHOICES[i][0].toUpperCase()}` + `${CHOICES[i].slice(1)}`;
            choiceButtons.appendChild(btn);
        }
    };
    printButtons();

    document.body.appendChild(choiceContainer);

    choiceButtons = document.querySelectorAll('button.btn-choice');
    choiceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            playRound(button.id);
        });
    });

    const scoreContainer = document.createElement('div');
    scoreContainer.setAttribute('id', 'score-container');

    const scoreHeader = document.createElement('h2');
    scoreHeader.innerText = 'Running Score';
    scoreContainer.appendChild(scoreHeader);

    const scoreTable = document.createElement('table');
    scoreTable.setAttribute('id', 'score-table');
    scoreTable.style.border = '1px solid black';
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    scoreTable.appendChild(thead);
    scoreTable.appendChild(tbody);
    
    const TABLE_HEADERS = ['round', 'human', 'computer', 'winner'];
    
    function printTableHeaders() {
        const tr = thead.insertRow();
        for (let i = 0; i < TABLE_HEADERS.length; i++) {
            const th = tr.insertCell();
            th.innerText = capitaliseStr(TABLE_HEADERS[i]);
            tr.appendChild(th);
        }
    }
    printTableHeaders();

    scoreContainer.appendChild(scoreTable);
    document.body.appendChild(scoreContainer);
});

function playRound(humanChoice) {
    const computerChoice = CHOICES[Math.floor(Math.random() * 3)];
    const winner = determineWinner(humanChoice, computerChoice);
    const table = document.querySelector('#score-table');

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

    const tr = table.insertRow(roundCounter + 1);
    const roundVal = tr.insertCell(0);
    const humanVal = tr.insertCell(1);
    const computerVal = tr.insertCell(2);
    const winnerVal = tr.insertCell(3);

    roundVal.textContent = roundCounter + 1;
    humanVal.textContent = capitaliseStr(humanChoice);
    computerVal.textContent = capitaliseStr(computerChoice);
    winnerVal.textContent = capitaliseStr(winner);
    
    if (roundCounter === rounds - 1) {
        const choiceContainer = document.querySelector('#choice-container');
        if (choiceContainer) choiceContainer.remove();
        printFinalScore();
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
        'scissors': 'paper'
    };

    return winningConditions[humanChoice] === computerChoice ? 'human' : 'computer';
}

function endGame() {
    const btnReset = document.createElement('button');
    btnReset.setAttribute('id', 'btn-reset');
    btnReset.textContent = 'Play Again';
    document.body.appendChild(btnReset);

    btnReset.addEventListener("click", () => {
        window.location.reload();
    });
}

function printFinalScore() {
    const finalScore = document.createElement('h2');
    finalScore.innerText = `Final Score: Human ${humanScore} | Computer ${computerScore}`;
    document.body.appendChild(finalScore);
}

function announceWinner() {
    const winnerAnnouncement = document.createElement('h2');

    if (humanScore === computerScore) {
        winnerAnnouncement.textContent = '*** Everybody wins! ***';
    } else if (humanScore > computerScore) {
        winnerAnnouncement.textContent = "*** Human wins! That's you. Congrats! ***";
    } else {
        winnerAnnouncement.textContent = '*** Computer wins! ***';
    }
    
    document.body.appendChild(winnerAnnouncement);
}
