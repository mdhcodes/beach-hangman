// Beach Hangman Game

// Global Variables
const beachWords = ['beach',
                    'waves',
                    'ocean',
                    'bay',
                    'beachball',
                    'boardwalk',
                    'sea',
                    'boat',
                    'lifeguard',
                    'sand',
                    'seashells',
                    'seashore',
                    'starfish',
                    'sun',
                    'sunglasses',
                    'tide',
                    'surfboard',
                    'swim',
                    'towel',
                    'seagulls'
                  ];

const wins = document.getElementById('wins');
const guessesRemaining = document.getElementById('guesses-remaining');
const alreadyGuessed = document.getElementById('already-guessed');
const guessedLetters = document.getElementById('guessed-letters');
const message = document.getElementById('message');
const lettersClass = document.getElementsByClassName('letters');
const spacesClass = document.getElementsByClassName('spaces');


const beachHangman = {
  randomWord: "",
  numOfGuesses: 0,
  numWins: 0,
  clearGame: function() {
    alreadyGuessed.textContent = '';
    guessesRemaining.textContent = '';
    guessedLetters.textContent = '';
  },
  restartGame: function() {

    // Create yes and no buttons
    const lineBreak = document.createElement('br')
    const answerYes = document.createElement('button');
    answerYes.setAttribute('class', 'answer-yes');
    const answerNo = document.createElement('button');
    answerNo.setAttribute('class', 'answer-no');
    answerYes.textContent = 'YES';
    answerNo.textContent = 'NO';
    message.append(lineBreak);
    message.append(answerYes);
    message.append(answerNo);

    const startOverTrue = answerYes.addEventListener('click', function() {

      // Clear game content
      beachHangman.clearGame();

      // Display a message to the player on screen.
      message.textContent = 'Great! Let\'s play again!';

      // Delay the start of the next game.
      setTimeout(function() {
            message.textContent = ''; // Clear the message to the player displayed upon losing.
            beachHangman.setUpGame();
            beachHangman.playGame();
        }, 3000);
    });

    const startOverFalse = answerNo.addEventListener('click', function() {

      // Clear game content
      beachHangman.clearGame();

      message.textContent = 'Thanks for playing! Have a nice day!';
    });
  },
  setUpGame: function() { // Function to prepare the game board.

      // Clear game content
      beachHangman.clearGame();

      // Select a random word from the array of beachWords.
      const random = Math.floor(Math.random() * beachWords.length); // Returns a random number from 0 to the value of (beachWords.length - 1).

      // Assign a random word from the beachWords array to the variable named randomWord.
      beachHangman.randomWord = beachWords[random];

      // Update the DOM with the number of wins stored in the numWins variable.
      wins.textContent = 'Wins: ' + beachHangman.numWins;

      // Set the value of the numOfGuesses variable to the number of guesses allowed for each word.
      beachHangman.numOfGuesses = beachHangman.randomWord.length + 5;
      guessesRemaining.textContent = 'Number of Guesses Remaining: ' + beachHangman.numOfGuesses;

      // Store alreadyGuessed letters in the array alreadyGuessedLetters to display on screen.
      alreadyGuessed.textContent = 'Letters Already Guessed: ';

      const letters = document.getElementById('letters');
      const spaces = document.getElementById('spaces');
      let beachWord = [];
      let letterSpaces = [];

      for (let i = 0; i < beachHangman.randomWord.length; i++) {

          // Create individual div elements for each letter and store them in an array named beachWord. Position each div with CSS.
          beachWord.push('<div class="letters">' + beachHangman.randomWord[i] + '</div> ');
          // Create individual div elements for each space and store them in an array named letterSpaces. Position div with CSS.
          letterSpaces.push('<div class="spaces"></div> ');

      }

      // Update the DOM to display each letter in the beachWord array without any commas.
      letters.innerHTML = beachWord.join('');
      // Update the DOM to display each space in the letterSpaces array without any commas.
      // Display blank lines using the border-top CSS property.
      spaces.innerHTML = letterSpaces.join('');

  }, // end setUpGame()

  playGame: function() { // Function to play the game.

      // Create a new array for the alreadyGuessedLetters each time a new game begins.
      // Store alreadyGuessed letters in the array alreadyGuessedLetters.
      let alreadyGuessedLetters = [];

      // Add an event listener to record each keyup occurrence
      document.addEventListener('keyup', function release(event) {
          const keyUp = event.key;
          const keyUpLower = keyUp.toLowerCase(); // Convert each keyup string character to a lower case string.
          const lowerLettersOnly = /^[a-z]$/; // Regular expression pattern to match only lower case letters. This pattern starts with a ^ to match the beginning of input with the following character set [a-z] (all lower case letters). It ends with a $ to match the end of input with the character set specified.
          message.textContent = "";
          // Check to make sure that the keyup event captured a lower case letter. If not, a message will display asking the player to select a letter.
          if (keyUpLower.match(lowerLettersOnly)) {

              // Check to determine if the letter the player guessed is in the randomWord and if it was already guessed.
              if (beachHangman.randomWord.indexOf(keyUpLower) === -1 && alreadyGuessedLetters.indexOf(keyUpLower) === -1) {
                  // If the user guesses incorrectly, subtract 1 from the guessesRemaining.
                  beachHangman.numOfGuesses--;
                  // Update the DOM with the current numOfGuesses left.
                  guessesRemaining.textContent = "Number of Guesses Remaining: " + beachHangman.numOfGuesses;
                  // Store incorrect guesses in the alreadyGuessedLetters array.
                  alreadyGuessedLetters.push(keyUpLower);
                  // Update the DOM with the incorrect alreadyGuessed letters by joining the array with a space between each string and convert each letter to upper case.
                  alreadyGuessed.textContent = "Letters Already Guessed: ";
                  guessedLetters.textContent = alreadyGuessedLetters.join(' ');
              } else {
                  // If the user guessed the correct letter, display that letter and hide the space below it.
                  for (let i = 0; i < lettersClass.length; i++) {
                      // Check that the keyup event value is equal to a string in the textContent of an element with a class of letters.
                      if (keyUpLower === lettersClass[i].textContent) {
                          lettersClass[i].style.visibility = "visible";
                          spacesClass[i].style.visibility = "hidden";
                      }
                  }
              }

              // Keep track of the number of lettersVisible.
              let lettersVisible = 0;
              for (let i = 0; i < lettersClass.length; i++) {
                  if (lettersClass[i].style.visibility === "visible") {
                      lettersVisible++;
                  }
              }

              // If all the letters are visible and the numOfGuesses is not 0, the player wins and the game ends.
              if (lettersVisible === beachHangman.randomWord.length && beachHangman.numOfGuesses > 0) {

                  // The game ends and the event listener is removed.
                  document.removeEventListener('keyup', release);

                  // numWins increases by 1.
                  beachHangman.numWins++;

                  // Update the DOM to reflect the number of wins.
                  wins.textContent = 'Wins: ' + beachHangman.numWins;

                  // After each game, clear the alreadyGuessed and guessesRemaining DOM output.
                  beachHangman.clearGame();

                  // Play ocean sounds when the user wins.
                  const audio = new Audio('assets/audio/seashore.mp3');
                  audio.play();

                  // The player decides to stop or restart the game.
                  message.textContent = 'You won! Would you like to play again?';

                  beachHangman.restartGame();

              }

              // If the numOfGuesses is 0 and all the letters are not visible, the player loses and the game ends.
              if (beachHangman.numOfGuesses === 0 && lettersVisible !== beachHangman.randomWord.length) {

                  // Update the DOM with the final game information.
                  alreadyGuessed.textContent = 'Letters Already Guessed: ' + alreadyGuessedLetters.join(' ');
                  guessesRemaining.textContent = 'Number of Guesses Remaining: ' + beachHangman.numOfGuesses;
                  guessedLetters.textContent = alreadyGuessedLetters.join(' ');
                  // The game ends and the event listener is removed.
                  document.removeEventListener('keyup', release);

                  // Display all letters and reveal the missed word.
                  for (let i = 0; i < lettersClass.length; i++) {
                      // Reveal all letters in the random word by changing the value of all elements with the class .letters to visible.
                      lettersClass[i].style.visibility = "visible";
                  }

                  // The player decides to stop or restart the game.
                  message.textContent = 'You didn\'t guess the word. Would you like to play again?';

                  beachHangman.restartGame();

                }

          } else {
              // If the keyup event value is not a lower case letter, alert the player to select a letter.
              message.textContent = 'Please select a letter.';
          } // end if keyUpLower

      }); // end keyup event listener

  } // end playGame()

}; // end beachHangman object


// Event listener to start the game.
document.addEventListener('keyup', function liftUp(event) {

    // Press any key to start the game.
    // Listen for one keyup event only.
    const keyUp = event.key;
    let count = 0;
    if (keyUp) {

        // Hide the instructions to press any key to get started.
        document.getElementById('start').style.display = 'none';

        count++;
        beachHangman.setUpGame();
        beachHangman.playGame();
    }
    if (count === 1) {
        // After the initial keyup to start the game, remove the event listener.
        document.removeEventListener('keyup', liftUp);
    }
});
