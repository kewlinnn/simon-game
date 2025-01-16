const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let started = false;
let level = 1;

// game starts when the first key is pressed
$(document).keydown(function (event) {
  console.log(event.key);
  const enter = "Enter";

  if (!started && event.key === enter) {
    setTimeout(function () {
      nextSequence();
    }, 800);
    started = true;
    userClickedPattern.length = 0;
  }
});

// selecting random color to add to the sequence
function nextSequence() {
  $("#level-title").text("Level " + level);
  $("#state-title").text("Watch").removeClass("repeat").addClass("watch");

  userClickedPattern.length = 0;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  //$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  //playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  playSequence();
}

function playSequence () {


  $("#state-title").text("Watch").addClass("watch");
  
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
    }, i * 400);
  }
  setTimeout(function () {
    $("#state-title").text("Repeat").addClass("repeat");
  }, gamePattern.length * 500);
}


//detecting  buttons clicked by the player and adding them to the userClickedPattern array
$(".btn").click(function (event) {
  let userChosenColor = event.target.id;
  let moveCount = userClickedPattern.length + 1;

  $("." + userChosenColor).addClass("pressed");
  setTimeout(function () {
  $("." + userChosenColor).removeClass("pressed");
  }, 100);

  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);

  $("#moves-count").text("Moves: " + moveCount + "/" + gamePattern.length);

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

function checkAnswer() {
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
      level++;
      $("#moves-count").text("Moves: 0");
      nextSequence();
    }, 1500);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#state-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver () {
  level = 1;
  gamePattern.length = 0;
  started = false;
}