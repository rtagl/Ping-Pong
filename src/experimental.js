//window.onload = function () {
let canvas = document.getElementById('pong-table')
let ctx = canvas.getContext('2d')
let gameOn = false;
let hitSound = new Audio('sounds/paddlehit.mp3');
let pointSound = new Audio('sounds/point.mp3');

canvas.width = screen.width / 2;
canvas.height = screen.height / 2;
let ANIME;
let ball = {}
let rallyCount = 0
let playerOneScore = 0;
let playerTwoScore = 0;
$(".player-one-score").text("Player 1: " + playerOneScore);
$(".player-two-score").text("Player 2: " + playerTwoScore);



function drawTable() {
  // ctx.fillStyle = "rgb(187, 135, 37)";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = 'white';
  ctx.stroke();

}
drawTable();

let leftPaddle = {
  x: 0,
  y: canvas.height/2.5,
  width: 10,
  height: 100,
  moveUp: function () {
    this.y -= 30

  },
  moveDown: function () {
    this.y += 30 
  }
}


function drawLeftPaddle() {
  ctx.fillStyle = "rgb(5, 235, 250)";
  ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
}

drawLeftPaddle();

let rightPaddle = {
  x: canvas.width - 10,
  y: canvas.height/2.5,
  width: 10,
  height: 100,
  moveUp: function () {
      this.y -= 30
  },
  moveDown: function () {
      this.y += 30
  }
}

function drawRightPaddle() {
  ctx.fillStyle = "rgb(250, 5, 111)";
  ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
}

drawRightPaddle();


document.getElementById("start-button").onclick = function () {
  playerOneScore = 0;
  playerTwoScore = 0;
  $(".player-one-score").text("Player 1: " + playerOneScore);
  $(".player-two-score").text("Player 2: " + playerTwoScore);
  startGame();
}
  function startGame() {
    cancelAnimationFrame(ANIME);


    ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      color: "rgb(192, 247, 170)",
      dx: 6 * (Math.random() > 0.5 ? 1 : -1),
      dy: 5 * (Math.random() * 2 - 1)
    };
    animate();
    gameOn = true;
    rallyCount = 0;
  }


  function drawBall() {

    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) { //if it hit the top or bottom 
      ball.dy = - ball.dy;
    }

    if (ball.x > canvas.width - 5) {
      if (gameOn === true) {
        rallyCount = 0;
        gameOn = false;
        playerOneScore++
        $(".player-one-score").text("Player 1: " + playerOneScore);
        pointSound.play();
        setTimeout(function () {
          startGame()
        }, 500)
      }
    }

    if (ball.x < 0) {
      if (gameOn === true) {
        rallyCount = 0;
        gameOn = false;
        playerTwoScore++
        $(".player-two-score").text("Player 2: " + playerTwoScore);
        pointSound.play();
        setTimeout(function () {
          startGame()
        }, 500)
      }
    }

    bounceBack(leftPaddle, rightPaddle)
    ball.x += ball.dx;
    ball.y += ball.dy;

  }

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 38:
        if (rightPaddle.y >= 0) {
          rightPaddle.moveUp(); e.preventDefault(); break;
        } else {
          break;
        }
      case 40:
        if (rightPaddle.y + rightPaddle.height <= canvas.height) {
          rightPaddle.moveDown(); e.preventDefault(); break;
        } else {
          break;
        }
      case 87:
        if (leftPaddle.y >= 0) {
          leftPaddle.moveUp(); break;
        } else {
          break;
        }
      case 83:
        if (leftPaddle.y + leftPaddle.height <= canvas.height) {
          leftPaddle.moveDown(); break;
        } else {
          break;
        }
    }
  }


  function bounceBack(leftPaddle, rightPaddle) {

    if ((ball.x - ball.radius <= leftPaddle.x + leftPaddle.width)
      && (ball.y - ball.radius < leftPaddle.y + leftPaddle.height && ball.y > leftPaddle.y)) {
      hitSound.play();
      ball.dx = -ball.dx
      ball.dy = 4 * (Math.random() * 2 - 1);
      rallyCount++

    }
    else if (ball.x + ball.radius >= canvas.width - rightPaddle.width
      && (ball.y + ball.radius > rightPaddle.y && ball.y - ball.radius < rightPaddle.y + rightPaddle.height)) {
      hitSound.play();
      ball.dx = -ball.dx;
      ball.dy = 4 * (Math.random() * 2 - 1)
      rallyCount++
    }
    if (rallyCount >= 10) {
      $(".rally-score").text("Rally!! " + rallyCount);
    } else {
      $(".rally-score").text('');
    }
  }

  function animate() {

    ANIME = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTable();
    drawBall();

    drawRightPaddle();
    drawLeftPaddle();

  }


// document.onkeydown = function (e) {
//   if (e.keyCode == 38 && rightPaddle.y >= 0) {
//     UP2 = true
//     e.preventDefault();
//     rightPaddle.moveUp();
//   }
//   if (e.keyCode == 40 && rightPaddle.y + rightPaddle.height <= canvas.height) {
//     DOWN2 = true;
//     e.preventDefault();
//     rightPaddle.moveDown();
//   }
//   if (e.keyCode == 87 && leftPaddle.y >= 0) {
//     UP1 = true;
//     leftPaddle.moveUp();
//   }
//   if (e.keyCode == 83 && leftPaddle.y + leftPaddle.height <= canvas.height) {
//     DOWN1 = true;
//     leftPaddle.moveDown();
//   }
// }
