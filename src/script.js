window.onload = function () {
  document.getElementById("start-button").onclick = function () {



  var canvas = document.getElementById('pong-table')
  var ctx = canvas.getContext('2d');
  canvas.width = screen.width/1.5;
  canvas.height = screen.height/2;



  class Paddle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    moveUp() {
      this.y -= 25;
    }
    moveDown() {
      this.y += 25;
    }
    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  let rightPaddle = new Paddle(canvas.width - 20, 40, 20, 75)
  let leftPaddle = new Paddle(0, canvas.height / 2.5, 20, 75)

  let rallyScore = 0;

  class Ball {
    constructor(x, y, vx, vy, width, height, color) {
      this.x = x;
      this.y = y;
      this.vx = vx * (Math.random() > .5 ? 1 : -1);
      this.vy = vy * (Math.random() * 2 - 1);
      this.width = width;
      this.height = height;
      this.color = color;
    }
    drawBall() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    moveBall() {
      let randomAngle = Math.random() * (1.5 - 0.5) + 0.5;
      this.x += this.vx*randomAngle;
      this.y += this.vy*randomAngle;
      this.drawBall();

      if (this.y + this.height > canvas.height || this.y < 0) {
        this.vy = -this.vy
      }
      if (this.x + this.width > canvas.width || this.x < 0) {


      }

      if (
        this.x + this.width >= rightPaddle.x &&
        this.x <= rightPaddle.x + rightPaddle.width &&
        (this.y < rightPaddle.y + rightPaddle.height &&
          this.y + this.height > rightPaddle.y)
      ) {
        rallyScore += 1
        this.vx = -this.vx 
        if (rallyScore >= 10) {
          console.log(rallyScore);
        }
      }

      if (
        this.y + this.height >= rightPaddle.y &&
        this.y <= rightPaddle.y + rightPaddle.height &&
        (this.x < rightPaddle.x + rightPaddle.width &&
          this.x + this.width > rightPaddle.x)
      ) {
        this.vy = -this.vy;
      }
      if (
        this.x + this.width >= leftPaddle.x &&
        this.x <= leftPaddle.x + leftPaddle.width &&
        (this.y < leftPaddle.y + leftPaddle.height &&
          this.y + this.height > leftPaddle.y)
      ) {
        rallyScore += 1
        this.vx = -this.vx;
        if (rallyScore >= 10) {
          console.log(rallyScore);
        }
      }

      if (
        this.y + this.height >= leftPaddle.y &&
        this.y <= leftPaddle.y + leftPaddle.height &&
        (this.x < leftPaddle.x + leftPaddle.width &&
          this.x + this.width > leftPaddle.x)
      ) {
        this.vy = -this.vy;
      }
    }
  }


  let ball = new Ball(300, 30, 6, 4, 15, 15, 'black');

 

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 38:
        if (rightPaddle.y >= 0) {
          rightPaddle.moveUp(); break;
        } else {
          break;
        }
      case 40:
        if (rightPaddle.y + rightPaddle.height <= canvas.height) {
          rightPaddle.moveDown(); break;
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

  function animate(){
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.moveBall()
    rightPaddle.draw();
    leftPaddle.draw();
    rightPaddle.moveUp();
    rightPaddle.moveDown();
    leftPaddle.moveUp();
    leftPaddle.moveDown();

  }
  animate()
  }
}


  // function moveBall() {
  //   ball.x += ball.vx;
  //   ball.y += ball.vy;
  //   ball.drawBall();

  //   if (ball.y + ball.height > canvas.height || ball.y < 0) {
  //     ball.vy = -ball.vy;
  //   }
  //   if (ball.x + ball.width > canvas.width || ball.x < 0) {
  //     ball.vx = -ball.vx;
  //   }

  //   if ((ball.x + ball.width >= rightPaddle.x && ball.x <= rightPaddle.x + rightPaddle.width)
  //     && (ball.y < rightPaddle.y + rightPaddle.height && ball.y + ball.height > rightPaddle.y)) {
  //     ball.vy = -ball.vy 
  //   }

  //   //right side
  //   if ((ball.y + ball.height >= rightPaddle.y && ball.y <= rightPaddle.y + rightPaddle.height)
  //     && (ball.x < rightPaddle.x + rightPaddle.width && ball.x + ball.width > rightPaddle.x)) {
  //     ball.vx = -ball.vx 
  //   }
  // }
