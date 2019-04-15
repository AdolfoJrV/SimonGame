var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animateSequence();
  // animateColour(randomChosenColour);
  // playSound(randomChosenColour);
  changeLevel();
}

function animateSequence() {
  gamePattern.forEach(function(currentColour, index) {
    setTimeout(function() {
      animateColour(currentColour);
      playSound(currentColour);
    }, 800 * index);
  });
}

function changeLevel() {
  level++;
  $("h1").html("Level " + level);
}

function animateColour(currentColour) {
  var element = "#" + currentColour;
  $(element).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var pressedClass = "pressed" + currentColour.slice(0, 1).toUpperCase() + currentColour.slice(1, currentColour.length);
  $(element).addClass(pressedClass);
  setTimeout(function() {
    $(element).removeClass(pressedClass);
  }, 100);
}

function playSound(inputColour) {
  var audio = new Audio("sounds/" + inputColour + ".mp3");
  audio.play();
}

function playerPick() {
  // using the call back paramenter method
  $(".btn").click(function(evt) {
    var playerPickedColour = evt.target.id;
    userClickedPattern.push(playerPickedColour);
    animateColour(playerPickedColour);
    playSound(playerPickedColour);
    if(gameStarted){
      checkPickedColour();
    }
  });
}

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  $(".container").addClass("displayHidden");
  setTimeout(function() {
    $("body").removeClass("game-over");
    $(".container").removeClass("displayHidden");
  }, 200);
  $("h1").html("Game Over, Press Any Key to Restart");
  startOver();
}

function checkPickedColour() {
  var index = userClickedPattern.length - 1;
  if (userClickedPattern[index] === gamePattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("success");
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function startOver() {
  gamePattern = [];
  gameStarted = false;
  level = 0;
}

function main() {
  $("body").keypress(function() {
    while (!gameStarted) {
      userClickedPattern = [];
      nextSequence();
      gameStarted = true;
    }
  });
  playerPick();
}
main();
