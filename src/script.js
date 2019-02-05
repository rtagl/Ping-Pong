window.onload = function () {
  document.getElementById("start-button").onclick = function () {



  var canvas = document.getElementById('pong-table')
  var ctx = canvas.getContext('2d');
  canvas.width = screen.width/3;
  canvas.height = screen.height/3.5;


    class Animal{
      constructor(name){
        this.name = name
      }
      speak (){
        console.log(this)
      }

    }

    class Rabbit extends Animal {
      constructor(name){
        super(name)
      }
      hi(){
        console.log(this)
        super.speak()
      }
    }
    console.log('hi')
    let r = new Animal('white rabbit');
    let rabbit = new Rabbit('something else')
    rabbit.hi()

    class Paddle {
      constructor(px, py, pWidth, pHeight) {
        this.x = px;
        this.y = py;
        this.width = pWidth;
        this.height = pHeight;
      }
      moveUp() {
        this.y -= 30;
      }
      moveDown() {
        this.y += 30;
      }
      draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
    }

    let rightPaddle = new Paddle(canvas.width - 20, 40, 20, 75)
    let leftPaddle = new Paddle(0, canvas.height / 2.5, 20, 75)


  class Ball extends Paddle {
    constructor(x, y, vx, vy, width, height, color, px, py, pWidth, pHeight) {
      super(px, py, pWidth, pHeight);
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.width = width;
      this.height = height;
      this.color = color;
      this.px = px;
      console.log(this);
    }
    drawBall() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    moveBall() {
      this.x += this.vx;
      this.y += this.vy;
      this.drawBall();

      if (this.y + this.height > canvas.height || this.y < 0) {
        this.vy = -this.vy;
      }
      if (this.x + this.width > canvas.width || this.x < 0) {
        this.vx = -this.vx;
      }

      if (
        this.x + this.width >= rightPaddle.x &&
        this.x <= rightPaddle.x + rightPaddle.width &&
        (this.y < rightPaddle.y + rightPaddle.height &&
          this.y + this.height > rightPaddle.y)
      ) {
        this.vy = -this.vy;
      }

      if (
        this.y + this.height >= rightPaddle.y &&
        this.y <= rightPaddle.y + rightPaddle.height &&
        (this.x < rightPaddle.x + rightPaddle.width &&
          this.x + this.width > rightPaddle.x)
      ) {
        this.vx = -this.vx;
      }
    }
  }

  let ball = new Ball(300, 30, 4, 4, 15, 15, 'green');

 

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
          leftPaddle.moveUp(); console.log('up', leftPaddle); break;
        } else {
          break;
        }
      case 83:
        if (leftPaddle.y + leftPaddle.height <= canvas.height) {
          leftPaddle.moveDown(); console.log('down', leftPaddle); break;
        } else {
          break;
        }
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
