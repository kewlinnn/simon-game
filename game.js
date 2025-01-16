const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let started = false;
let level = 1;

// game starts when the first key is pressed
$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
    userClickedPattern.length = 0;
    console.log("started");
  }
});

// selecting random color to add to the sequence
function nextSequence() {
  $("#level-title").text("Level " + level);

  userClickedPattern.length = 0;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
}


//detecting  buttons clicked by the player and adding them to the userClickedPattern array
$(".btn").click(function (event) {
  let userChosenColor = event.target.id;

  $("." + userChosenColor).addClass("pressed");
  setTimeout(function () {
    $("." + userChosenColor).removeClass("pressed");
  }, 100);

  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);

  if (userClickedPattern.length !== gamePattern.length) {
    console.log("keep playing");
  } else {
    checkAnswer(level);
  }
});

function playSound(color) {
  // playing selected button sound
  let audio = new Audio("sounds/" + color + ".mp3");

  audio.play();
}

function checkAnswer(currentLevel) {
  let isCorrect = false;

  for (let i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] === userClickedPattern[i]) {
      isCorrect = true;
    } else {
      isCorrect = false;
    }
  }

  if (isCorrect) {
    setTimeout(function () {
      nextSequence();
      level++;
    }, 1000);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver () {
  level = 1;
  gamePattern.length = 0;
  started = false;
}