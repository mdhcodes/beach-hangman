// Beach Hangman Game

// Global Variables
var beachWords = ['beach', 'waves', 'ocean', 'bay', 'beachball', 'boardwalk', 'sea', 'boat', 'lifeguard', 'sand', 'seashells',
    'seashore', 'starfish', 'sun', 'sunglasses', 'tide', 'surfboard', 'swim', 'towel', 'seagulls'
];

var wins = document.getElementById('wins');
var guessesRemaining = document.getElementById('guesses-remaining');
var alreadyGuessed = document.getElementById('already-guessed');
var message = document.getElementById('message');
var lettersClass = document.getElementsByClassName('letters');
var spacesClass = document.getElementsByClassName('spaces');

var beachHangman = {
  randomWord: "",
  numOfGuesses: 0,
  numWins: 0,
  startOver: false,
  setUpGame: function() { // Function to prepare the game board.

      // Select a random word from the array of beachWords.
      var random = Math.floor(Math.random() * beachWords.length); // Returns a random number from 0 to the value of (beachWords.length - 1).

      // Assign a random word from the beachWords array to the variable named randomWord.
      beachHangman.randomWord = beachWords[random];

      // Update the DOM with the number of wins stored in the numWins variable.
      wins.innerHTML = 'Wins: ' + beachHangman.numWins;

      // Set the value of the numOfGuesses variable to the number of guesses allowed for each word.
      beachHangman.numOfGuesses = beachHangman.randomWord.length + 5;
      guessesRemaining.innerHTML = 'Number of Guesses Remaining: ' + beachHangman.numOfGuesses;

      // Store alreadyGuessed letters in the array alreadyGuessedLetters to display on screen.
      alreadyGuessed.innerHTML = 'Letters Already Guessed: ';

      var letters = document.getElementById('letters');
      var spaces = document.getElementById('spaces');
      var beachWord = [];
      var letterSpaces = [];

      for (var i = 0; i < beachHangman.randomWord.length; i++) {

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
      var alreadyGuessedLetters = [];

      // Add an event listener to record each keyup occurrence
      document.addEventListener('keyup', function release(event) {
          var keyUp = event.key;
          var keyUpLower = keyUp.toLowerCase(); // Convert each keyup string character to a lower case string.
          var lowerLettersOnly = /^[a-z]$/; // Regular expression pattern to match only lower case letters. This pattern starts with a ^ to match the beginning of input with the following character set [a-z] (all lower case letters). It ends with a $ to match the end of input with the character set specified.

          // Check to make sure that the keyup event captured a lower case letter. If not, an alert will display a message asking the player to select a letter.
          if (keyUpLower.match(lowerLettersOnly)) {

              // Check to determine if the letter the player guessed is in the randomWord and if it was already guessed.
              if (beachHangman.randomWord.indexOf(keyUpLower) === -1 && alreadyGuessedLetters.indexOf(keyUpLower) === -1) {
                  // If the user guesses incorrectly, subtract 1 from the guessesRemaining.
                  beachHangman.numOfGuesses--;
                  // Update the DOM with the current numOfGuesses left.
                  guessesRemaining.innerHTML = "Number of Guesses Remaining: " + beachHangman.numOfGuesses;
                  // Store incorrect guesses in the alreadyGuessedLetters array.
                  alreadyGuessedLetters.push(keyUpLower);
                  // Update the DOM with the incorrect alreadyGuessed letters by joining the array with a space between each string and convert each letter to upper case.
                  alreadyGuessed.innerHTML = "Letters Already Guessed: " + alreadyGuessedLetters.join(" ").toUpperCase();
              } else {
                  // If the user guessed the correct letter, display that letter and hide the space below it.
                  for (var i = 0; i < lettersClass.length; i++) {
                      // Check that the keyup event value is equal to a string in the innerHTML of an element with a class of letters.
                      if (keyUpLower === lettersClass[i].innerHTML) {
                          lettersClass[i].style.visibility = "visible";
                          spacesClass[i].style.visibility = "hidden";
                      }
                  }
              }

              // Keep track of the number of lettersVisible.
              var lettersVisible = 0;
              for (var i = 0; i < lettersClass.length; i++) {
                  if (lettersClass[i].style.visibility === "visible") {
                      lettersVisible++;
                  }
              }

              // If all the letters are visible and the numOfGuesses is not 0, the player wins and the game ends.
              if (lettersVisible === beachHangman.randomWord.length && beachHangman.numOfGuesses > 0) {

                  // The game ends and the event listener is removed.
                  document.removeEventListener('keyup', release);
                  // Display a message to the player on screen.
                  message.innerHTML = 'You won! Let\'s play again.';
                  // numWins increases by 1.
                  beachHangman.numWins++;
                  // Update the DOM to reflect the number of wins.
                  wins.innerHTML = 'Wins: ' + beachHangman.numWins;

                  // After each game, clear the alreadyGuessed and guessesRemaining DOM output.
                  alreadyGuessed.innerHTML = 'Letters Already Guessed: ';
                  guessesRemaining.innerHTML = "Number of Guesses Remaining: ";

                  //Play ocean sounds when the user wins.
                  var audio = new Audio('assets/audio/seashore.mp3');
                  audio.play();

                  // Start the game over.
                  beachHangman.startOver = true;
                  // Delay the start of the next game.
                  setTimeout(function() {
                      if (beachHangman.startOver) {
                          message.innerHTML = ''; // Clear the message to the user displayed upon winning.
                          beachHangman.setUpGame();
                          beachHangman.playGame();
                      }
                      beachHangman.startOver = false;
                  }, 5000);

              }

              // If the numOfGuesses is 0 and all the letters are not visible, the player loses and the game ends.
              if (beachHangman.numOfGuesses === 0 && lettersVisible !== beachHangman.randomWord.length) {
                  beachHangman.startOver = true;

                  // Update the DOM with the final game information.
                  alreadyGuessed.innerHTML = 'Letters Already Guessed: ' + alreadyGuessedLetters.join(' ').toUpperCase();
                  guessesRemaining.innerHTML = "Number of Guesses Remaining: " + beachHangman.numOfGuesses;
                  // Display a message to the player on screen.
                  message.innerHTML = 'You didn\'t guess the word! Let\'s play again.';
                  // The game ends and the event listener is removed.
                  document.removeEventListener('keyup', release);

                  // Display all letters and reveal the missed word.
                  for (var i = 0; i < lettersClass.length; i++) {
                      // Reveal all letters in the random word by changing the value of all elements with the class .letters to visible.
                      lettersClass[i].style.visibility = "visible";
                  }

                  // Start the game over.
                  // Delay the start of the next game.
                  setTimeout(function() {
                      if (beachHangman.startOver) {
                          message.innerHTML = ''; // Clear the message to the player displayed upon losing.
                          beachHangman.setUpGame();
                          beachHangman.playGame();
                      }
                      beachHangman.startOver = false;
                  }, 5000);

              }

          } else {
              // If the keyup event value is not a lower case letter, alert the player to select a letter.
              alert('Please select a letter.');
          } // end if keyUpLower

      }); // end keyup event listener

  } // end playGame()

}; // end beachHangman object


// Event listener to start the game.
document.addEventListener('keyup', function liftUp(event) {

    // Press any key to start the game.
    // Listen for one keyup event only.
    var keyUp = event.key;
    var count = 0;
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
