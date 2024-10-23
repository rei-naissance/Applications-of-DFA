const wordList = ["INPUT", "DETERMINISTIC", "COMPUTATION", "AUTOMATA", "RAINBOW"];

/*
                                            INPUTS
    ----------------------------------------------------------------------------
    states
                    correct letter      incorrect letter        win         lose     
    (q0) START      1                   0                       0           0
    (q1) ONGOING    1                   1                       2           3
    (q2) WIN        0                   0                       0           0
    (q3) LOSE       0                   0                       0           0
*/

const transitionTable = [
    [1, 0, 0, 0],  
    [1, 1, 2, 3],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let word = "";
let guessedWord = [];
let remainingAttempts = 6;
let guessedLetters = [];
let currentState = 0;

function startGame() {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    guessedWord = Array(word.length).fill("_");
    remainingAttempts = 6;
    guessedLetters = [];
    currentState = 0;
    updateDisplay();
}

function updateState(input) {
    currentState = transitionTable[currentState][input];
}

function makeGuess(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        alert(`Letter "${letter}" has already been guessed.`);
        return;
    }

    guessedLetters.push(letter);

    if (word.toUpperCase().includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                guessedWord[i] = letter;
            }
        }

        if (!guessedWord.includes("_")) {
            updateState(2); 
        } else {
            updateState(0);
        }
    } else {
        remainingAttempts--;
        
        if (remainingAttempts === 0) {
            updateState(3);
        } else {
            updateState(1);
        }
    }

    switch (currentState) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            alert(`You win! The word was: ${word}`);
            startGame();
            break;
        case 3:
            alert(`You lose! The word was: ${word}`);
            startGame();
            break;
    }
}

function updateDisplay() {
    document.getElementById('word-display').textContent = guessedWord.join(" ");
    document.getElementById('attempts-display').textContent = `Attempts left: ${remainingAttempts}`;
    document.getElementById('error-text').textContent = "";
}

function makeGuessUI() {
    let letter = document.getElementById('letter-input').value.toUpperCase();
    document.getElementById('letter-input').value = '';
    
    if (!/^[A-Z]$/.test(letter)) {
        document.getElementById('error-text').textContent = "Please enter a character from A-Z"
        return;
    }

    makeGuess(letter);
    updateDisplay();
}

document.getElementById('letter-input').addEventListener('input', function (event) {
    let input = event.target.value;
    event.target.value = input.replace(/[^a-zA-Z]/g, '');
});

window.onload = function() {
    startGame();
};
