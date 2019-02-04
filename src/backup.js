// would like to have the table appear on load...

// window.onload = function () {

// var startcanvas = document.getElementById('pong-table');
// var startctx = startcanvas.getContext('2d');

// 

//   startcanvas.width = 700;
//   startcanvas.height = 500;

//   startctx.fillStyle = 'rgb(187, 135, 37)';
//   startctx.fillRect(0, 0, 700, 500);


//   startctx.beginPath();
//   startctx.moveTo(350, 0);
//   startctx.lineTo(350, 500);
//   startctx.strokeStyle = 'white';
//   startctx.stroke();
// }

window.onload = function () {
  //document.getElementById("start-button").onclick = function () {

    let canvas = document.getElementById('pong-table')
    let ctx = canvas.getContext('2d')

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

    // ball properties

    let ball = {
      x: 100,
      y: 100,
      dx: 6.5,
      dy: 6.5
    }

    let rightPaddle = {
      x: 680,
      y: 220,
      moveUp: function () { this.y -= 25 },
      moveDown: function () { this.y += 25 },
    }

    function drawRightPaddle(rightPaddle) {
      ctx.fillStyle = 'red';
      ctx.fillRect(rightPaddle.x, rightPaddle.y, 20, 100);
    }

    let leftPaddle = {
      x: 0,
      y: 220,
      moveUp: function () { this.y -= 25 },
      moveDown: function () { this.y += 25 }
    }

    function drawLeftPaddle(leftPaddle) {
      ctx.fillStyle = 'green';
      ctx.fillRect(leftPaddle.x, leftPaddle.y, 20, 100);
    }

    let rallyCount = 0;


    function drawBall(ball) {
      ctx.beginPath();
      ctx.fillStyle = "rgb(192, 247, 170)";
      ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      // if (ball.x < 0 || ball.x > 700) ball.dx =- ball.dx;
      if (ball.y < 0 || ball.y > 500) ball.dy =- ball.dy;

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
          if(rightPaddle.y + 100 <= 500) {
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
          if(leftPaddle.y + 100 <= 500) {
            leftPaddle.moveDown(); console.log('down', leftPaddle); break;
          } else {
            break;
          }  
      }
    }

    function bounceBack(ball, leftPaddle, rightPaddle) {
      if (ball.x >= 670 && (ball.y <= rightPaddle.y + 95 && ball.y + 5 >= rightPaddle.y)) {
        ball.dx = - ball.dx;
        rallyCount++
        console.log(rallyCount);
      }
      if (ball.x <= 30 && (ball.y <= leftPaddle.y + 95 && ball.y + 5 >= leftPaddle.y)) {
        ball.dx = - ball.dx;
        rallyCount++
        console.log(rallyCount);
      }
    }


    function animate() {
      window.requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTable();
      drawBall(ball);
      drawRightPaddle(rightPaddle);
      drawLeftPaddle(leftPaddle);
      bounceBack(ball, leftPaddle, rightPaddle);
      
    }
    animate();
  }
//}
