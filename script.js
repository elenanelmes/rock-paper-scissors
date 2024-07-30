const CHOICES = ['rock', 'paper', 'scissors'];

function getHumanChoice() {
    let input = prompt("Enter R for Rock, P for Paper or S for Scissors!").toLowerCase();

    switch (input) {
        case 'r': return CHOICES[0];
        case 'p': return CHOICES[1];
        case 's': return CHOICES[2];
        default: return 'blank';
    }
}

function getComputerChoice() {
    return CHOICES[Math.floor(Math.random() * 3)];
}

function determineWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) return 'draw';
    if (humanChoice === 'blank') return 'computer';

    const winningConditions = {
        [CHOICES[0]]: CHOICES[2],
        [CHOICES[1]]: CHOICES[0],
        [CHOICES[2]]: CHOICES[1]
    };

    return winningConditions[humanChoice] === computerChoice ? 'human' : 'computer';
}

function capitaliseChoice(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function playRound(humanChoice, computerChoice) {
    console.log(`Computer: ${capitaliseChoice(computerChoice)} | Human: ${capitaliseChoice(humanChoice)}`);

    const winner = determineWinner(humanChoice, computerChoice);

    switch (winner) {
        case 'draw':
            console.log("It's a draw!");
            console.log('---');
            break;
        case 'human':
            console.log(`Human wins! ${capitaliseChoice(humanChoice)} beats ${computerChoice}.`);
            console.log('---');
            return 'human';
        case 'computer':
            console.log(`Computer wins! ${capitaliseChoice(computerChoice)} beats ${humanChoice}.`);
            console.log('---');
            return 'computer';
    }

    return 'draw';
}

function playGame(rounds) {
    let computerScore = 0;
    let humanScore = 0;

    for (i = 0; i < rounds; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        const roundWinner = playRound(humanSelection, computerSelection);

        if (roundWinner === 'human') {
            humanScore++;
        } else {
            computerScore++;
        }
    }

    console.log(`Final Score: Computer ${computerScore} – Human ${humanScore}`);

    if (humanScore === computerScore) {
        console.log('Everybody wins!');
    } else if (humanScore > computerScore) {
        console.log('*** Congrats! You win. ***');
    } else {
        console.log('*** Computer wins. Better luck next time! ***');
    }
}

playGame(5);