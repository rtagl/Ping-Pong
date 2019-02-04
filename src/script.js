
var canvas = document.getElementById('pong-table')
var ctx = canvas.getContext('2d');
canvas.width = screen.width/1.5;
canvas.height = screen.height/2;



var ball = {
  x: 200,
  y: 30,
  vx: 6,
  vy: 3,
  radius: 6,
  color: 'red',
  drawBall: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width; 
    this.height = height;
  }
  moveUp(){
    this.y--;
  }
  moveDown(){
    this.y++;
  }
  draw(){
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

let rightPaddle = new Paddle(canvas.width - 20, canvas.height/2, 20, 100)
let leftPaddle = new Paddle(0, canvas.height/2, 20, 100)

function moveBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.drawBall();
  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }
}

setTimeout(function(){

  ball.vx = -ball.vx;
},2000)


function animate(){
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveBall()
  rightPaddle.draw();
  leftPaddle.draw();
}
animate()

