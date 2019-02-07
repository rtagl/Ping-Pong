//window.onload = function () {
  let canvas = document.getElementById('pong-table')
  let ctx = canvas.getContext('2d')
  let gameOn = false; 
  canvas.width = screen.width/2;
  canvas.height = screen.height/2;
  let ANIME; 
  let ball = {}
  let rallyCount = 0

  function drawTable() {
    ctx.fillStyle = 'rgb(187, 135, 37)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.stroke();

  }
  drawTable();

  let leftPaddle = {
    x: 0,
    y: 220,
    width: 10,
    height: 100,
    moveUp: function () { this.y -= 30 },
    moveDown: function () { this.y += 30 }
  }

  function drawLeftPaddle(leftPaddle) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  }
  drawLeftPaddle(leftPaddle);

  let rightPaddle = {
    x: canvas.width - 10,
    y: 220,
    width: 10,
    height: 100,
    moveUp: function () { 
      this.y -= 25 

      //$('body').css({"background-position-y":this.y+'px'}) 
      //background - position - y: 400px;

    },
    moveDown: function () { this.y += 25 },
  }

  function drawRightPaddle(rightPaddle) {
    ctx.fillStyle = 'red';
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  }

  drawRightPaddle(rightPaddle);
 

  document.getElementById("start-button").onclick = function () {
    startGame();

  }
    function startGame() {
      cancelAnimationFrame(ANIME);

       ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        dx: 5 * (Math.random() > 0.5 ? 1 : -1),
        dy: 4 * (Math.random() * 2 - 1)
      };
      animate();
      gameOn = true;
      rallyCount = 0
    }

      //gameOn = true;
      //console.log('hi')

    let playerOneScore = 0
    let playerTwoScore = 0

      function drawBall() {

        ctx.beginPath();
        ctx.fillStyle = "rgb(192, 247, 170)";
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        // if (ball.x < 0 || ball.x > 700) ball.dx =- ball.dx;
        if (ball.y - ball.radius < 0 || ball.y + ball.radius  > canvas.height){ //if it hit the top or bottom 
           ball.dy =- ball.dy;
        }
        if (ball.x > canvas.width - 5 || ball.x < 0) {
          if (gameOn === true){
            rallyCount = 0;
            gameOn = false;
            setTimeout(function() {
              startGame()
          }, 500)
        }
      }

      bounceBack(leftPaddle, rightPaddle)
        ball.x += ball.dx;
        ball.y += ball.dy;
        
      }

      document.onkeydown = function(e) {
        switch (e.keyCode) {
          case 38: 
            if(rightPaddle.y >= 0) {
              rightPaddle.moveUp(); e.preventDefault(); break;
            } else {
              break;
            }
          case 40: 
            if(rightPaddle.y + rightPaddle.height <= canvas.height) {
              rightPaddle.moveDown(); e.preventDefault(); break;
            } else {
              break;
            }
          case 87: 
            if(leftPaddle.y >= 0) {
              leftPaddle.moveUp(); console.log('up', leftPaddle); break;
            } else {
              break;
            }
          case 83: 
            if(leftPaddle.y + leftPaddle.height <= canvas.height) {
              leftPaddle.moveDown(); console.log('down', leftPaddle); break;
            } else {
              break;
            }  
        }
      }


      function bounceBack(leftPaddle, rightPaddle) {

        if ((ball.x - ball.radius <= leftPaddle.x + leftPaddle.width)
          && (ball.y - ball.radius < leftPaddle.y + leftPaddle.height && ball.y > leftPaddle.y)) {
          ball.dx = -ball.dx
          ball.dy = 4 * (Math.random() * 2 - 1);
          rallyCount++



        }
        else if (ball.x + ball.radius >= canvas.width - rightPaddle.width 
          && (ball.y + ball.radius > rightPaddle.y && ball.y - ball.radius < rightPaddle.y + rightPaddle.height)) {
            ball.dx = -ball.dx;
            ball.dy = 4 * (Math.random() * 2 - 1)
            rallyCount++
        }
        if (rallyCount >= 1) {
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

        drawRightPaddle(rightPaddle);
        drawLeftPaddle(leftPaddle);
        //bounceBack(leftPaddle, rightPaddle);

      }
    
 