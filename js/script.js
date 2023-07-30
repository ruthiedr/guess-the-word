//G L O B A L  V A R I A B L E S

const guessedLetters = document.querySelector(".guessed-letters");
//The ul where guessed letters will appear

const guessButton = document.querySelector(".guess");
//The "Guess!" buttom

const letterInput = document.querySelector(".letter");
//The text input

const wordInProgress = document.querySelector(".word-in-progress");
//The empty paragraph where the word in progress will appear

const remainingGueses = document.querySelector(".remaining");
//The paragraph where the remaining guesses will display

const remainingSpan = document.querySelector("span");
//The span inside the remaning guesses paragraph

const message = document.querySelector(".message");
//The empty paragraph where messages will appear when a letter is guessed

const playAgainButton = document.querySelectorAll(".play-again.hide");
//The hidden Play Again button that will appear after a game

const word = "magnolia";
//starting word


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


// Button click event listener 
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const inputValue = letterInput.value;
    console.log(inputValue);
    letterInput.value = "";
});


