//window.onload = function () {
  let canvas = document.getElementById('pong-table')
  let ctx = canvas.getContext('2d')
  let gameOn = false; 
  canvas.width = 700;
  canvas.height = 500;

  function drawTable() {
    ctx.fillStyle = 'rgb(187, 135, 37)';
    ctx.fillRect(0, 0, 700, 500);

    ctx.beginPath();
    ctx.moveTo(350, 0);
    ctx.lineTo(350, 500);
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
    x: 690,
    y: 220,
    width: 10,
    height: 100,
    moveUp: function () { this.y -= 25 },
    moveDown: function () { this.y += 25 },
  }

  function drawRightPaddle(rightPaddle) {
    ctx.fillStyle = 'red';
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  }

  drawRightPaddle(rightPaddle);

  // let roundOver = false; 
  // let playerOneScore = 0;
  // let playerTwoScore = 0;   

  document.getElementById("start-button").onclick = function () {
    startGame();

  }
    function startGame() {
      animate();
    }

      let ball = {
        x: canvas.width/2,
        y: canvas.height/2,
        radius: 10,
        dx: 5 * (Math.random() > 0.5 ? 1 : -1),
        dy: 4 * (Math.random() * 2 - 1)
      };
      gameOn = true;



      function drawBall() {

        ctx.beginPath();
        ctx.fillStyle = "rgb(192, 247, 170)";
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        // if (ball.x < 0 || ball.x > 700) ball.dx =- ball.dx;
        if (ball.y < 0 || ball.y > canvas.height) ball.dy =- ball.dy;

        ball.x += ball.dx;
        ball.y += ball.dy;
        
      }

      document.onkeydown = function(e) {
        switch (e.keyCode) {
          case 38: 
            if(rightPaddle.y >= 0) {
              rightPaddle.moveUp(); break;
            } else {
              break;
            }
          case 40: 
            if(rightPaddle.y + rightPaddle.height <= canvas.height) {
              rightPaddle.moveDown(); break;
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



      let rallyCount = 0;
      function bounceBack(leftPaddle, rightPaddle) {

        if ((ball.x - ball.radius/2 <= leftPaddle.x + leftPaddle.width)
          && (ball.y < leftPaddle.y + leftPaddle.height && ball.y > leftPaddle.y)) {
          ball.dx = - ball.dx;
          ball.dy = (Math.random() * (5 - 0.75) + 2.75)
          rallyCount++
          console.log(rallyCount);


        }
        if (ball.x + ball.radius/2 >= canvas.width - rightPaddle.width 
          && (ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height)) {
            ball.dx = - ball.dx;
            ball.dy = (Math.random() * (5 - 2.75) + 2.75)
            rallyCount++
            console.log(rallyCount);
        }

        if (ball.x > canvas.width || ball.x < 0 && gameOn === true) {
          rallyCount = 0;
          ball.x = canvas.width/2 ;
          ball.y = canvas.height/2;
          console.log('restart')
          //debugger;
          gameOn = false; 
          //startGame();
        }
        $(".rally-score").text(rallyCount);
      }
      function animate() {


        window.requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTable();
        drawBall();
        drawRightPaddle(rightPaddle);
        drawLeftPaddle(leftPaddle);
        bounceBack(leftPaddle, rightPaddle);

      }
    
  //}

        // function startGame() {
      //   if (roundOver === true) {
      //     ball = {
      //       x: canvas.width / 2,
      //       y: canvas.height / 2,
      //       dx: 5 * (Math.random() > 0.5 ? 1 : -1),
      //       dy: 4 * (Math.random() * 2 - 1)
      //   }; 
      // }
      //   document.getElementById("start-button").click();
      //   let roundOver = false; 

      // }

      // function gameOver(ball) {    
      //   if (ball.x > canvas.width) {
      //     ball.dx = 0
      //     ball.dy = 0

      //     startGame()
      //   }

      //   if (ball.x < 0) {
      //     ball.dx = 0
      //     ball.dy = 0

      //     startGame()
      //   }

      // }