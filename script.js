const words = ["happy", "score","disco", "angry", "silly", "apple"]
const correctWord = words[Math.floor(Math.random() * words.length)].toUpperCase(); // Example word
const maxGuesses = 5;
let currentGuess = '';
let guessCount = 0;
const board = document.getElementById('board');
const input = document.getElementById('input');
const message = document.getElementById('message');
const submit = document.getElementById('submit');

function initializeBoard() {
    board.innerHTML = ''; // Clear board
    for (let i = 0; i < maxGuesses; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function updateBoard() {
    const rows = document.querySelectorAll('.row');
    const currentRow = rows[guessCount];
    const cells = currentRow.querySelectorAll('.cell');
    let correct = 0;

    for (let i = 0; i < 5; i++) {
        cells[i].textContent = currentGuess[i];
        if (currentGuess[i] === correctWord[i]) {
            cells[i].classList.add('correct');
            correct++;
        } else if (correctWord.includes(currentGuess[i])) {
            cells[i].classList.add('present');
        } else {
            cells[i].classList.add('absent');
        }
    }

    if (correct === 5) {
        message.textContent = 'Congratulations!';
        submit.disabled = true;
    } else if (guessCount === maxGuesses - 1) {
        message.textContent = `Game over! The word was ${correctWord}.`;
        submit.disabled = true;
    } else {
        guessCount++;
    }
}

submit.addEventListener('click', function() {
    currentGuess = input.value.toUpperCase();
    if (currentGuess.length === 5) {
        updateBoard();
        input.value = ''; // Clear input after guess
    } else {
        alert('Word must be 5 letters!');
    }
});

input.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        submit.click();
    }
});

initializeBoard();