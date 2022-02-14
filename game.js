
let previousGuesses = [];
let numGuesses = 1;
let reStartBtn = document.querySelector("#restart");
let guess = document.querySelector("#guessField");
let guessSlot = document.querySelector('.guesses');
let lowOrHi = document.querySelector('.lowOrHi');
let remaining = document.querySelector('.lastResult');

let startOver = document.querySelector('.resultParas');
reStartBtn.remove();

let submit = document.querySelector("#submit");

let randomNumber = parseInt((Math.random() * 10) + 1);
console.log(randomNumber);

submit.addEventListener('click', playGame);

function playGame() {
    let guess = document.querySelector("#guessField").value;
    console.log(guess);
    let guessNumber = parseInt(guess);
    validateGuess(guessNumber);

}


function validateGuess(guessNumber) {
    if (isNaN(guessNumber)) {
        alert("Enter a valid Number");
    } else if (guessNumber > 10 || guessNumber < 1) {
        alert("Number is out of Range")
    } else {
        previousGuesses.push(guessNumber);
        if (numGuesses === 3) {
            displayGuesses(guessNumber);
            if(guessNumber != randomNumber){
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        }
            
        } else {
            displayGuesses(guessNumber);
        }
    }
}

function displayMessage(message) {
    let hints = document.querySelector(".hints");
    hints.innerHTML = `<h1>${message}</h1>`
}


function newGame() {
    let newGameButton = document.querySelector('.newgame');

    let button = newGameButton.appendChild(document.createElement('button'));
    button.innerHTML = "New Game";
    button.className = "btn btn-danger";
    
    button.addEventListener('click', function () {
        //Pick a new random number
        randomNumber = parseInt((Math.random() * 10) + 1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${4 - numGuesses}  `;
        guess.removeAttribute('disabled');
        displayMessage("");
        playGame = true;
        this.remove();
    })
}

function displayGuesses(guessNumber) {
    let remain = remaining.innerHTML;
    if (remain != 0) {
        if (guessNumber > randomNumber) {
            displayMessage("Too high!");
            selects(guessNumber);

        } else if (guessNumber < randomNumber) {
            displayMessage("Too low!");
            selects(guessNumber);

        } else if(guessNumber == randomNumber){
            displayMessage(`Congo the number was ${guessNumber}`);
            selects(guessNumber);
            endGame();

            reStartBtn.remove();
        }
    } else {
        selects(guessNumber);
    }



}

function selects(guessNumber) {
    let form = document.querySelector(".form");
    form.appendChild(reStartBtn);
    guess.value = '';
    guessSlot.innerHTML += `<span class="guess_div">${guessNumber}  </span>`;
    numGuesses++
    remaining.innerHTML = `${4 - numGuesses}  `;
}

function endGame() {
    reStartBtn.remove();
    //Clear user input
    guess.value = '';
    //Disable user input button
    guess.setAttribute('disabled', '');
    //Display Start new Game Button


    newGame();
}


reStartBtn.addEventListener('click', function (e) {
    //let p = document.createElement('p');
    randomNumber = parseInt((Math.random() * 10) + 1);
    previousGuesses = [];
    numGuesses = 1;
    guessSlot.innerHTML = '';
    lowOrHi.innerHTML = '';
    remaining.innerHTML = `${4 - numGuesses}  `;
    guess.removeAttribute('disabled');
    //startOver.removeChild(p);
    displayMessage("");
    playGame = true;
    this.remove();
    //newGame();

});


