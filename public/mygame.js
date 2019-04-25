//create canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var sunflower = new Image();
sunflower.src = "images/sunflower.png";

var background = new Image();
background.src = "images/background.png";

var endbackground = new Image();
endbackground.src = "images/firework.png";

var girlImage = new Image();
girlImage.src = "images/girl.png";
var gx = Math.floor((Math.random() * 1000) + 1);
var gy = Math.floor((Math.random() * 800) + 1);


var flowerImage = new Image();
flowerImage.src = "images/flower.png";
var fx = Math.floor((Math.random() * 900) + 1);
var fy = Math.floor((Math.random() * 700) + 1);


//set player speed
var playerspeed = 6;

const playtime = 10;

//set player score and operation
var score = 0;
var up = false;
var down = false;
var left = false;
var right = false;

//Timer
var timer = playtime;
var timercheck = null;

//Keydown listen
canvas.addEventListener('keydown', function(listen) {
  listen.preventDefault();
  console.log(listen.key, listen.keyCode);
  if (listen.keyCode == 38) {
    up = true;
  }
  if (listen.keyCode == 40) {
    down = true;
  }
  if (listen.keyCode == 37) {
    left = true;
  }
  if (listen.keyCode == 39) {
    right = true;
  }
});

//Keyup listen
canvas.addEventListener('keyup', function(listen) {
  listen.preventDefault();
  console.log(listen.key, listen.keyCode);
  if (listen.keyCode == 38) {
    up = false;
  }
  if (listen.keyCode == 40) {
    down = false;
  }
  if (listen.keyCode == 37) {
    left = false;
  }
  if (listen.keyCode == 39) {
    right = false;
  }
});

//clean the game
function clean() {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0,0,1000,800);
}

//respawn the eaten target
function respawn() {
  fx = 	Math.floor((Math.random() * 900) + 1);
  fy = Math.floor((Math.random() * 700) + 1);
}

//function when click startgame
function start() {
  timercheck = setInterval(function() {
    timer--;
  }, 1000)
  canvas.removeEventListener('click', start);
  respawn();
  draw();
}

//show menu
function menu() {
  clean();
  ctx.drawImage(sunflower, 0, 0);
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = "#000000";
  ctx.font = "normal 36px Verdana";
  ctx.textAlign = 'center';
  ctx.strokeText('Pick the flower !', canvas.width / 2, canvas.height / 4);
  ctx.font = "normal 20px Verdana";
  ctx.fillText('Click to Start', canvas.width / 2, (canvas.height / 4) * 3);
  ctx.font = '18px Arial'
  ctx.fillText('Move: Your arrow keys :)', canvas.width / 2, (canvas.height / 4) * 3.5);
  canvas.addEventListener('click', start);
}

// draw the game 
function draw() {
  clean();
  if (up) {
    gy -= playerspeed;
  }
  if (down) {
    gy += playerspeed;
  }
  if (left) {
    gx -= playerspeed;
  }
  if (right) {
    gx += playerspeed;
  }

  if (gy + 32 > canvas.height) {
    gy = canvas.height - 32;
  }
  if (gy < 0) {
    gy = 0;
  }
  if (gx < 0) {
    gx = 0;
  }
  if (gx + 32 > canvas.width) {
    gx = canvas.width - 32;
  }
  // if eat
  if (gx <= (fx+32) && gy <= (fy+32) && fx <= (gx+32) && fy <= (gy+32)) {
    
      respawn();
      score++;
    
  }
  ctx.drawImage(background,0,0);
  ctx.drawImage(girlImage,gx,gy);
  ctx.drawImage(flowerImage,fx,fy);

  ctx.fillStyle = '#000000';
  ctx.font = '24px Arial';
  ctx.fillStyle = "red";
  ctx.textAlign = 'left';
  ctx.fillText('Score: ' + score, 10, 24);
  ctx.fillText('Time Remaining: ' + timer, 10, 50);
  
  if (timer <= 0) {
    end();
    timer = playtime;
    canvas.addEventListener('click', question); 
  } else {
    window.requestAnimationFrame(draw);
  }
}

// when time is out
function end() {
  clearInterval(timercheck);
  clean();
  ctx.drawImage(endbackground,0,0);
  ctx.fillStyle = '#ffffff';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Your Score: ' + score, canvas.width / 2, canvas.height / 2 + 300);
  ctx.textAlign = 'center';
  ctx.fillText('Want to restart? Click! :) ', canvas.width / 2, canvas.height / 2 + 360);
  updateScore(score);
}

// Update the User's score
function updateScore(userscore) {
  const db = firebase.firestore();
  firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
          console.log(user);
          db.collection("users").doc(user.uid).update({
              score: userscore
          }).then(function(){
              console.log("Document successfully updated");
          }).catch(function(error) {
              console.error("Error updating score: ", error);
          });
      } else {
          console.log('not logged in');
      }
  });
} 

function question() {
  window.location.href="question.html";
}


menu();
canvas.focus();
