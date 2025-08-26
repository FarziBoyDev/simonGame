var highScore = localStorage.getItem("highScore") || 0;

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var keyCount = 0;
var level = 0;

// Show saved high score on load
$("#highScore").text("Highscore : " + highScore);

// Start game
$("h1").click(function () {
  userClickedPattern = [];
  if (keyCount === 0) {
    $(".body").removeClass("wrong");
    keyCount++;
    level++;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

// Cheat button
$(".cheat").click(function () {
  var cheatArray = gamePattern.join(", ");
  $(".cheat").html(cheatArray);
});

// Button handlers
$(".btn").click(function () {
  var chosenColor = $(this).attr("id");
  playSound(chosenColor);
  animatePress(chosenColor);
  userClickedPattern.push(chosenColor);
  check();
});

function nextSequence() {
  $(".body").removeClass("wrong");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  $(".cheat").html("Cheat");
}

// Check sequence
function check() {
  var currentIndex = userClickedPattern.length - 1;

  if (gamePattern[currentIndex] !== userClickedPattern[currentIndex]) {
    wrongPress();
    resetGame();
    return;
  }

  if (userClickedPattern.length === gamePattern.length) {
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];

    // Update high score
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      $("#highScore").text("Highscore : " + highScore);
    }

    setTimeout(nextSequence, 1000);
  }
}

// Play sound
function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// Animate button
function animatePress(color) {
  $("#" + color).removeClass("pressAnimate");
  setTimeout(() => {
    $("#" + color).addClass("pressAnimate");
  }, 100);
}

// Wrong press
function wrongPress() {
  playSound("wrong");
  $(".body").addClass("wrong");
  setTimeout(() => $(".body").removeClass("wrong"), 200);
  $("h1").text("Click me to try again");
}

// Reset game
function resetGame() {
  gamePattern = [];
  userClickedPattern = [];
  keyCount = 0;
  level = 0;
}
