//G L O B A L  V A R I A B L E S

const guessedLettersElement = document.querySelector(".guessed-letters");
//The ul where guessed letters will appear

const guessButton = document.querySelector(".guess");
//The "Guess!" buttom

const letterInput = document.querySelector(".letter");
//The text input

const wordInProgress = document.querySelector(".word-in-progress");
//The empty paragraph where the word in progress will appear

const remaining = document.querySelector(".remaining");
//The paragraph where the remaining guesses will display

const remainingSpan = document.querySelector(".remaining span");
//The span inside the remaning guesses paragraph

const message = document.querySelector(".message");
//The empty paragraph where messages will appear when a letter is guessed

const playAgainButton = document.querySelector(".play-again");
//The hidden Play Again button that will appear after a game

let word = "magnolia";
//starting word

let guessedLetters = [];
// Will contain letters guessed by user

let remainingGuesses = 8;
// Sets the value of maximum numbrt of guesses

const getWord = async function () {
    const wordsList = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordsList.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
getWord();

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

// Change letteres to uppercase, sends a message if letter has been guessed twice, adds letter to the array otherwise
const makeGuess = function(inputValue) {
    inputValue = inputValue.toUpperCase();
    if (guessedLetters.includes(inputValue)) {
        message.innerText = "Oops, you've already guessed that. Try again!";
    } else {
        guessedLetters.push(inputValue);
        console.log(guessedLetters);
        countRemainingGuesses(inputValue);
        showGuessedLetters();
        updateWord(guessedLetters);
        
    }
};


// Show the list of guessed letters
const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

//Update the word in progress
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedArray = [];
    for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        updatedArray.push(letter.toUpperCase());
        
    } else {
        updatedArray.push("●");
    }
}
wordInProgress.innerText = updatedArray.join("");
winnerCheck();

};

// Output messages based on remaining guesses, start over if no more guesses remaining
const countRemainingGuesses = function(inputValue) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(inputValue)) {
        message.innerText = `The word doesn't contain ${inputValue}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `You got it! ${inputValue} is a part of the word.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `No more remaining guesses. The word is <span class = "highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;

    }

};

// Checks if player has won the game
const winnerCheck = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    };
};

// Starts the game over
const startOver = function() {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
    //reset all original values - grab new word
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingSpan.innerText = `${remainingGuesses} guesses`;
    // Grab a new word
    getWord();

    //show the right UI elements
    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    
});
