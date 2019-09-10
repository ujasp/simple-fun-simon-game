
var gameStarted = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
  if(!gameStarted){
    gameStarted = true;
    $('#level-title').text("Level "+ level);
    nextSequence();
  }
});

$("div[type='button']").click(function(e){
  userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animataePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else{
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function(){$('body').removeClass("game-over")}, 200);
    $('#level-title').text("Game Over. Press any Key to Restart");
    startOver();

  }
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}

function nextSequence(){
  userClickedPattern = [];

  level++;
  $('#level-title').text("Level "+ level);

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor)

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)
}

function playSound(name){
  var audio = new Audio("sounds/"+ name+ ".mp3");
  audio.play();
}


function animataePress(currentColor){
  button = $("#"+currentColor);
  button.addClass("pressed");
  setTimeout(function(){button.removeClass("pressed")}, 100);
}
