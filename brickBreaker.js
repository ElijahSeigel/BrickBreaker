// brickBreaker.js


//brick dimension: H:25 W:100
//paddle dimension: H:20 W:150
function BrickBreaker(){
	var self = this;
	this.width = 1000;
	this.height = 500;
	this.paddle = {x:430, y: 460}
	//this.bricks = this.getBricks();
	this.direction = 'still';
	this.speed = 1;
	this.slowStart = 0;
	this.MAXSPEED = 5;
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
	window.addEventListener('keyup', this.handleKeyDown);

	this.interval = setInterval(()=>this.loop(), 100);
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
  // Draw Paddle
  this.ctx.fillStyle = "ivory";
  this.ctx.fillRect(
      this.paddle.x,
      this.paddle.y,
      this.150,
      this.20
  );
  // Draw food pellets
  this.ctx.fillStyle = 'gold';
  this.food.forEach((food) => {
    this.ctx.fillRect(
      food.x * this.cellSize,
      food.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  });
}











//update
BrickBreaker.prototype.update = function() {
  var x = this.paddle.x;
  var y = this.paddle.y;
  switch(this.direction) {
    case 'right':
      if(x > 0 && x+40+this.speed < this.width)
		x+= this.speed;
      break;
    case 'left':
      if(x - this.speed > 0 && x+40 < this.width)
		x-= this.speed;
      break;
  }
  this.paddle = {x: x, y: y};
}



//loop
BrickBreaker.prototype.loop = function() {
  this.update();
  this.render();
}


new BrickBreaker