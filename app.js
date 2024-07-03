let userInput = document.getElementById('enter_guess');
let submitBtn = document.getElementById("submit_btn");
let low_high_num = document.querySelector(".low_high_num");
let prev_guesses = document.querySelector('.prev_guesses');
let remain_guesses = document.querySelector('.remain_guesses');
let game_over = document.querySelector('.game_over');
let message = document.querySelector('.message');




let random_number = Math.round(Math.random() * 100 + 1);

let prevGuess = [];
let num_guess = 1;


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let user_guess = parseInt(userInput.value);
    verifyGuess(user_guess);
});

function verifyGuess(guess) {
    if (isNaN(guess)) {
        alert(`Enter a valid number`);
    }
    else if (guess > 100) {
        alert(`Enter a number smaller or equal to 100`);
    }
    else if (guess <= 0) {
        alert(`Enter a number greater or equal to 1`);
    }
    else {
        prevGuess.push(guess);
        if (num_guess === 10) {
            displayGuess();
            game_over.innerHTML = `Failed to guess correct number, play again`;
            displayLowHigh(`Game End &#128530, Random number was ${random_number}`);
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }


    function displayGuess() {
        userInput.value = '';
        prev_guesses.innerHTML = prevGuess;
        num_guess = num_guess + 1;
        remain_guesses.innerHTML = `${11 - num_guess}`
    }

    function checkGuess(guess) {
        if (guess === random_number) {
            game_over.innerHTML = `Game Won, random number is ${random_number}`;
            displayLowHigh(`Guessed matched, &#128512`)
            endGame();

        }
        else if (guess > random_number) {
            displayLowHigh(`Guessed number is larger.`);
        }
        else if (guess < random_number) {
            displayLowHigh(`Guessed number is smaller.`);
        }

    }

    function displayLowHigh(res) {
        low_high_num.innerHTML = `${res}`;
    }


    function endGame() {
        userInput.value = '';
        userInput.setAttribute('disabled', '');
        submitBtn.setAttribute('disabled', '');
        newGame();
    }

    function newGame() {
        let btn = document.querySelector('.new_start');
        btn.style.display = "block";
        btn.innerHTML = `Start new game`;

        btn.addEventListener('click', (e) => {
            random_number = Math.round(Math.random() * 100 + 1);
            prevGuess = [];
            num_guess = 1;
            userInput.removeAttribute('disabled');
            submitBtn.removeAttribute('disabled');
            prev_guesses.innerHTML = '';
            low_high_num.innerHTML = '';
            remain_guesses.innerHTML = `${11 - num_guess}`
            btn.style.display = "none";
            game_over.style.display = 'none';
        })

    }

}

