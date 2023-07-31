//G L O B A L  V A R I A B L E S

const guessedLettersElement = document.querySelector(".guessed-letters");
//The ul where guessed letters will appear

const guessButton = document.querySelector(".guess");
//The "Guess!" buttom

const letterInput = document.querySelector(".letter");
//The text input

const wordInProgress = document.querySelector(".word-in-progress");
//The empty paragraph where the word in progress will appear

const remainingGueses = document.querySelector(".remaining");
//The paragraph where the remaining guesses will display

const remainingSpan = document.querySelector(".remaining span");
//The span inside the remaning guesses paragraph

const message = document.querySelector(".message");
//The empty paragraph where messages will appear when a letter is guessed

const playAgainButton = document.querySelector(".play-again");
//The hidden Play Again button that will appear after a game

const word = "magnolia";
//starting word

const guessedLetters = [];
// Will contain letters guessed by user

// Add "●"s as placeholders for the letters of the word to be guessed
const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


// Button click event listener, empty input box after input has been collected
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    // Grab what was entered in the input
    const inputValue = letterInput.value;
    // Make sure it is a single letter
    const goodGuess = validateInput(inputValue);

    if (goodGuess) {
        // All set to guess
        makeGuess(inputValue);
    }

    
    letterInput.value = "";
    

    //console.log(letterInput);
});


// Validate the user's input
const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please only enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a single letter from A-Z";
    } else {
        return input;
    }
    
};

const makeGuess = function(inputValue) {
    //guess = guess.toUpperCase();
    if (guessedLetters.includes(inputValue)) {
        message.innerText = "Oops, you've already guessed that. Try again!";
    } else {
        guessedLetters.push(inputValue);
        console.log(guessedLetters);
    }
};

