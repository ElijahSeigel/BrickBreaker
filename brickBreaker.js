// brickBreaker.js


//brick dimension: H:25 W:100
//ball radius: 10
//paddle dimension: H:20 W:150
function BrickBreaker(){
	var self = this;
	this.width = 1000;
	this.height = 500;
	this.ball = {x:500, y: 250}
	this.paddle = {x:425, y: 460}
	//this.bricks = this.getBricks();
	
	//paddle variables
	this.direction = 'still';
	this.speed = 1;
	this.slowStart = 0;
	this.MAXSPEED = 5;
	
	//ball variables
	this.vertical = -2;
	this.horizontal = 0;
	
	this.win = false;
	this.over = false;
	this.score = 0;
	
	var canvas = document.createElement('canvas');
	canvas.width = this.width;
	canvas.height = this.height;
	document.body.appendChild(canvas);
	this.ctx = canvas.getContext('2d');
	
		
	this.handleKeyUp = this.handleKeyUp.bind(this);
	this.handleKeyDown = this.handleKeyDown.bind(this);
	window.addEventListener('keydown', this.handleKeyDown);
	window.addEventListener('keyup', this.handleKeyUp);

	this.interval = setInterval(()=>this.loop(), 20);
}



//user input
BrickBreaker.prototype.handleKeyDown = function(event) {
	switch(event.key){
		case 'a':
		case 'ArrowLeft':
			if(this.direction === 'left'){
				if(this.slowStart === this.MAXSPEED - this.speed){
					if(this.speed < this.MAXSPEED){
						this.speed ++;
						this.slowStart = 0;
					}
				}
				else{
					this.slowStart ++;
				}
			}
			else{
				this.slowStart = 0;
			}
			this.direction = 'left';
			break;
		case 'd':
		case 'ArrowRight':
			if(this.direction === 'right'){
				if(this.slowStart === this.MAXSPEED - this.speed){
					if(this.speed < this.MAXSPEED){
						this.speed ++;
						this.slowStart = 0;
					}
				}
				else{
					this.slowStart ++;
				}
			}
			else{
				this.slowStart = 0;
			}
			this.direction = 'right';
			break;
	}
}

BrickBreaker.prototype.handleKeyUp = function(event) {
	this.speed = 1;
	this.direction = 'still';
}

//easy restart functionality
BrickBreaker.prototype.gameOver = function() {
  clearInterval(this.interval);
  window.removeEventListener('keydown', this.handleKeyDown);
  window.addEventListener('keydown', ()=>{
    new BrickBreaker();
  }, {once: true})
  this.over = true;
}

//render that isht
BrickBreaker.prototype.render = function() {
  if(this.over) {
    this.ctx.fillStyle = 'rgba(255,0,0,0.25)';
    this.ctx.fillRect(0,0,
      this.width,
      this.height);
    this.ctx.fillStyle = "white";
    this.ctx.font = '16px sans-serif';
    this.ctx.fillText("Game Over", 10, 20);
    this.ctx.fillText("Points: "+ this.score, 10, 40);
    this.ctx.font = '10px sans-serif';
    this.ctx.fillText("Press any key for new game", 10, 60);
    return;
  }
  //draw play area
  this.ctx.fillStyle = "#000";
  this.ctx.fillRect(0, 0,
      this.width,
      this.height);
  this.ctx.fillStyle = "white";
  this.ctx.font = '16px sans-serif';
  this.ctx.fillText("Points: "+ this.score, 10, 495);
  // Draw Paddle
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(
      this.paddle.x,
      this.paddle.y,
      150,
      20
  );
  //draw ball
  var ballFill = this.ctx.createRadialGradient(this.ball.x,this.ball.y,0,this.ball.x,this.ball.y,15);
  ballFill.addColorStop(0, "black");
  ballFill.addColorStop(1, "white");
  this.ctx.beginPath();
  this.ctx.arc(this.ball.x,this.ball.y, 10, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fillStyle = ballFill;
  this.ctx.fill();
}











//update
BrickBreaker.prototype.update = function() {
  
  //move paddle
  var x = this.paddle.x;
  var y = this.paddle.y;
  switch(this.direction) {
    case 'right':
      if(x+150+this.speed < this.width)
		x+= this.speed;
      break;
    case 'left':
      if(x - this.speed > 0)
		x-= this.speed;
      break;
  }
  this.paddle = {x: x, y: y};
  
  
  //move ball
  this.ball.x+=this.horizontal;
  this.ball.y+=this.vertical;
  
  //loss
  if(this.ball.y+10>=500)
  {
	  this.gameOver();
	  return;
  }
  
  //wall bounces
  if(this.ball.x -10<=0 || this.ball.x + 10 >=1000)
  {
	this.horizontal = 0-this.horizontal;
  }
  //ceiling bounce
  if(this.ball.y-10 <= 0)
  {
	this.vertical = 0-this.vertical;
  }
}



//loop
BrickBreaker.prototype.loop = function() {
  this.update();
  this.render();
}


new BrickBreaker