// Default variable declaration
let timeLeft = 30; // Default timer for game play - 30 seconds
let popupTimeLeft = 3; // When the game starts, the pop up timer countdown with 3 seconds
let gameLevel; // Game level variable to store the game level -> Easy or Hard
let counter = false; // To check that the timer countdown started or not, default will be 'false'
let randomBox; // To store the Random Box ID to display mouse image inside the box
let randomInterval; // To store the random interval time
let totalClicked = 0; // Count total clicked of the mouse/key
let correctClicked = 0; // Count correct box clicked OR correct mouse key pressed
let displayMoleImage; // Time interval to display Mole image
let accuracy; // Calculate the accuracy of the player
let allBoxes = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"]; // Array of all 9 boxes
let gameStart = false; // To identify if the game started

//! FUNCTION No. 1 -> startGame()
function startGame() {
  $("#playerNameScreen").show(); // Display the player's name field
  // Click event on PLAY! button
  $("#playGame").click(function () {
    let playername = $("#playerName").val(); // Grab the value of the player's name entered
    console.log("Player Name : " + playername); // Console the player's name
    if (playername == "") $("#error").text("Enter Player Name");
    // Check if player's name input is empty // If empty - Display an error message -> "Enter Player Name"
    else {
      // If player's name is filled
      $("#error").text(""); // Clear an error message
      $(".heading").hide(); // Hide the heading (Title - Whack A Mole, Mouse logo)
      $("#playerNameScreen").hide(); // Hide the player name label, textbox, button
      $("#gameLevels").hide(); // Hide the level buttons (Easy,Hard,?)
      $("#gameScreen").show(); // Show the main game window screen
      $("#popupTimer").show(); // Show the pop up countdown timer
      $("#pname").text(playername); // Set the player name at top

      // ! To set 3 sec countdown interval before game starts
      let countdownPopup = setInterval(function () {
        // set 3 seconds countdown interval for pop up timer
        if (popupTimeLeft > 1) {
          // Check if pop up time greater than 1 second
          popupTimeLeft--; // Decrement time by 1 second
          console.log("Pop up Time Left : " + popupTimeLeft); // Console the pop up time remaining
          $("#popupTimer").text(popupTimeLeft); // Display the reduced time
        } else if (popupTimeLeft == 1) {
          // Check if pop up time is 1 second
          clearInterval(countdownPopup); // Clear the interval for pop up countdown timer
          $("#popupTimer").text("Go!"); // Display the final word -> Go!

          setInterval(function () {
            // After 1 second of interval, start the game
            gameStart = true; // Start the game
            $("#popupTimer").text(""); // Clear the pop up timer empty
            $("#popupTimer").hide(); // Hide the pop up timer
            if (counter == false) {
              // Check the timer of 30 seconds not started
              // set the counter to 'true', to identify the 30 seconds timer started
              counter = true;

              // ! To set 30 sec countdown interval when game starts
              playGame(); // Call the playGame function (FUNCTION No. 1)
              let countdown = setInterval(function () {
                // 1 second of interval for the timer
                if (timeLeft > 0) {
                  // If the remaining time is greater than 0 second
                  timeLeft--; /// Decrement time by 1 second from the remaining time
                  console.log("Time Left : " + timeLeft); // Console remaining time
                  $("#remainTime").text(timeLeft); // Display the new remaining time
                } else if (timeLeft == 0) {
                  // If the remaining time is 0 second
                  clearInterval(countdown); // Clear the 30 seconds time interval
                  clearInterval(displayMoleImage); // Clear the Mole image display time interval

                  // !Adding Player's ACCURACY cualculations
                  if (correctClicked == 0 && totalClicked == 0)
                    accuracy = 0; // Set accuracy to 0
                  // If total clicks is more than 0 or correct clicks more than 0
                  else {
                    // Calculate the accuracy of the player
                    accuracy = ((correctClicked * 100) / totalClicked).toFixed(
                      2
                    );
                  }
                  console.log("Accuracy : " + accuracy); // Console the accuracy
                  $("#heading").hide(); // Hide the heading (player name, score, timer)
                  $("#gameOver").show(); // Display the game over window screen
                  $("#pname1").text(playername); // Display the player name on game over screen
                  $("#currentScore1").text(correctClicked); // Display the total score
                  $("#accuracy").text(accuracy); // Display player's accuracy
                  //! Play Again button click event
                  $("#playAgain").click(function () {
                    location.reload(); // Reload the current page
                  });
                }
              }, 1000); // delay 1 sec (for 30sec time interval)
            }
          }, 1000); // delay 1 sec to hide "Go!" message
        }
      }, 1000); // delay 1 sec for (3 sec time interval)
    }
  });
}

//! FUNCTION No. 2 -> playGame()
function playGame() {
  // Loop through all 9 boxes
  for (let i = 0; i < allBoxes.length; i++) {
    // Set onclick event attribute on each boxes to call the function - checkMole() with the box id as argument -> FUNCTION NO. 4
    $("#" + allBoxes[i]).attr("onclick", "checkMole(this.id)");
  }
  if (gameLevel == "Easy") {
    // if game level is Easy, set interval of 1700 milliseconds to display the Mole image
    displayMoleImage = setInterval(function () {
      displayMole(); // Call the displayMole() -> FUNCTION NO. 3
    }, 1700);
  } else if (gameLevel == "Hard") {
    // if game level is Hard,  set interval of 1200 milliseconds to display the Mole image
    displayMoleImage = setInterval(function () {
      displayMole(); // Call the displayMole() -> FUNCTION NO. 3
    }, 900);
  }
}

//! FUNCTION No. 3 -> displayMole()
function displayMole() {
  // Generate one random box from the array of 9 boxes
  randomBox = allBoxes[Math.floor(Math.random() * allBoxes.length)];
  console.log(randomBox); // Console the random generated box id

  //! Display the mole image in to that randomly generated box
  $("#" + randomBox).html("<img class='moleimg' src='mole.png' />");
  if (gameLevel == "Easy") {
    // if game level Easy, generate any random interval between the range of 1000 milliseconds to 1400 milliseconds
    randomInterval = Math.floor(Math.random() * (1400 - 1000 + 1)) + 1000;
    console.log("Random Interval : " + randomInterval); // Console the random interval between the range of 1000 to 1400
    // after the random interval is generated, hide the mole image
    setTimeout(function () {
      $("#" + randomBox).html(""); // Hide the mole image
    }, randomInterval); // randomInterval -> generated any random interval
  } else if (gameLevel == "Hard") {
    // if game level Hard, generate any random interval between the range of 400 milliseconds to 700 milliseconds
    randomInterval = Math.floor(Math.random() * (700 - 400 + 1)) + 400;
    // after the random generated interval, hide the mole image
    setTimeout(function () {
      $("#" + randomBox).html(""); // Hide the Mole image
    }, randomInterval); // -> generate random interval
  }
}

//! FUNCTION No. 4 -> checkMole()
function checkMole(b) {
  console.log(b); // Console the key pressed or clicked box id
  // Check if player pressed the keyboard key according to the randomly generated box id
  if (
    (b === "q" && randomBox === "m1") ||
    (b === "w" && randomBox === "m2") ||
    (b === "e" && randomBox === "m3") ||
    (b === "a" && randomBox === "m4") ||
    (b === "s" && randomBox === "m5") ||
    (b === "d" && randomBox === "m6") ||
    (b === "z" && randomBox === "m7") ||
    (b === "x" && randomBox === "m8") ||
    (b === "c" && randomBox === "m9")
  ) {
    totalClicked++; // Increment total clicks
    console.log("Total Clicks : " + totalClicked); // Console total clicks
    correctClicked = correctClicked + counter; // Increment correct clicks
    console.log("Correct Clicks : " + correctClicked); // Console correct clicks
    $("#currentScore").text(correctClicked); // Display score at top heading
    $("#" + randomBox).html(""); // Hide the mole image once correct KEY is pressed
  }
  // Check if player pressed the keyboard key is //! NOT clicked according to the random generated box id
  else if (
    (b === "q" && randomBox !== "m1") ||
    (b === "w" && randomBox !== "m2") ||
    (b === "e" && randomBox !== "m3") ||
    (b === "a" && randomBox !== "m4") ||
    (b === "s" && randomBox !== "m5") ||
    (b === "d" && randomBox !== "m6") ||
    (b === "z" && randomBox !== "m7") ||
    (b === "x" && randomBox !== "m8") ||
    (b === "c" && randomBox !== "m9")
  ) {
    totalClicked++; // Increment the total clicks
    console.log("Total Clicks : " + totalClicked); // Console total clicks
  }
  // Check if player clicked on the box through the MOUSE (NOT PRESSED ANY KEY) and that box contains mole image (NOT EMPTY BOX)
  if (
    b !== "q" &&
    b !== "w" &&
    b !== "e" &&
    b !== "a" &&
    b !== "s" &&
    b !== "d" &&
    b !== "z" &&
    b !== "x" &&
    b !== "c" &&
    $("#" + b).html() != ""
  ) {
    totalClicked++; // Increment the total clicks
    console.log("Total Clicks : " + totalClicked); // Console total clicks
    correctClicked++; // Increment the correct clicks
    console.log("Correct Clicks : " + correctClicked); // Console total clicks
    $("#currentScore").text(correctClicked); // Display the increased score at top heading
    $("#" + randomBox).html(""); // Hide the Mole image once you click on correct BOX
  } else {
    totalClicked++; // Increment the total clicks
    console.log("Total Clicks : " + totalClicked); // Console total clicks
  }
}

//! Check if any keyboard key up event occur
$(document).keyup(function (event) {
  // Check if the keboard keys pressed
  if (
    event.which == 81 ||
    event.which == 87 ||
    event.which == 69 ||
    event.which == 65 ||
    event.which == 83 ||
    event.which == 68 ||
    event.which == 90 ||
    event.which == 88 ||
    event.which == 67
  ) {
    console.log("Key Pressed : " + event.key); // Console pressed key
    if (gameStart == true)
      // Check if the game started or not
      checkMole(event.key); // Call the checkMole() with the key pressed as argument - FUNCTION NO. 4
  }
});

// !Easy Level button click event
$("#easyLevel").click(function () {
  // Set the game level Easy
  gameLevel = "Easy";

  $("#easyLevel").addClass("selectedBtn"); // Highlight Easy button
  $("#easyLevel").attr("disabled", "disabled"); // Disable the Easy button to click again
  $("#hardLevel").addClass("notselectedBtn"); // Disable the click on Hard button
  $("#hardLevel").attr("disabled", "disabled"); // Disable the Hard button to click on it

  startGame(); // startGame function call (FUNCTION No. 1)
});

//! Hard Level button click event
$("#hardLevel").click(function () {
  // Set the game level Hard
  gameLevel = "Hard";

  $("#hardLevel").addClass("selectedBtn"); // Highlight Easy button
  $("#hardLevel").attr("disabled", "disabled"); // Disable the Hard button to click again
  $("#easyLevel").addClass("notselectedBtn"); // Disable the mouse click on Easy button
  $("#easyLevel").attr("disabled", "disabled"); // Disable the Easy button to click on it

  startGame(); // startGame function call (FUNCTION No. 1)
});

//! Instruction icon click event
$("#instructionsBtn").click(function () {
  $("#instructions").show(); // Show the instruction window screen
});

//! Close icon click event inside the instruction window screen
$("#hideHelp").click(function () {
  $("#instructions").hide(); // Hide/Close the instruction window
});
