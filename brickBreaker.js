// brickBreaker.js


//brick dimension: H:25 W:100
//ball radius: 10
//paddle dimension: H:20 W:150
function BrickBreaker(){
	var self = this;
	this.width = 1000;
	this.height = 500;
	this.ball = {x:500, y: 250};
	this.paddle = {x:425, y: 460};
	this.bricks = 	[{x:0, y:0}, {x:100, y:0}, {x:200, y:0}, {x:300, y:0}, {x:400, y:0}, {x:500, y:0}, {x:600, y:0}, {x:700, y:0}, {x:800, y:0}, {x:900, y:0}, 
					 {x:0, y:25}, {x:100, y:25}, {x:200, y:25}, {x:300, y:25}, {x:400, y:25}, {x:500, y:25}, {x:600, y:25}, {x:700, y:25}, {x:800, y:25}, {x:900, y:25}, 
					 {x:0, y:50}, {x:100, y:50}, {x:200, y:50}, {x:300, y:50}, {x:400, y:50}, {x:500, y:50}, {x:600, y:50}, {x:700, y:50}, {x:800, y:50}, {x:900, y:50},
					 {x:0, y:75}, {x:100, y:75}, {x:200, y:75}, {x:300, y:75}, {x:400, y:75}, {x:500, y:75}, {x:600, y:75}, {x:700, y:75}, {x:800, y:75}, {x:900, y:75},					 
					 {x:0, y:100}, {x:100, y:100}, {x:200, y:100}, {x:300, y:100}, {x:400, y:100}, {x:500, y:100}, {x:600, y:100}, {x:700, y:100}, {x:800, y:100}, {x:900, y:100}];
	
	//paddle variables
	this.direction = 'still';
	this.speed = 0;
	this.slowStart = 0;
	this.MAXSPEED = 5;
	
	//ball variables
	this.vertical = 1;
	this.horizontal = 1;
	
	this.win = false;
	this.over = false;
	this.score = 0;
	var child = document.getElementById('canvas');
	if (child)
	  document.body.removeChild(document.getElementById('canvas'));
	var canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.width = this.width;
	canvas.height = this.height;
	document.body.appendChild(canvas);
	this.ctx = canvas.getContext('2d');
	
		
	this.handleKeyUp = this.handleKeyUp.bind(this);
	this.handleKeyDown = this.handleKeyDown.bind(this);
	window.addEventListener('keydown', this.handleKeyDown);
	window.addEventListener('keyup', this.handleKeyUp);

	this.interval = setInterval(()=>this.loop(), 10);
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
				this.speed = 1;
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
				this.speed = 1;
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
  window.addEventListener('keydown', (event)=>{ 
    if(event.keyCode === 32)
		new BrickBreaker();
  })
  this.over = true;
}

//render that isht
BrickBreaker.prototype.render = function() {
  if(this.over) {
    this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
    this.ctx.fillRect(0,0,
      this.width,
      this.height);
    this.ctx.fillStyle = "blue";
    this.ctx.font = '16px sans-serif';
	if(this.win)
	{
      this.ctx.fillText("You Win", 10, 20);
	}else{
      this.ctx.fillText("Game Over", 10, 20);
    }
    this.ctx.fillText("Points: "+ this.score, 10, 40);
    this.ctx.font = '10px sans-serif';
    this.ctx.fillText("Press spacebar for new game", 10, 60);
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
  // Draw bricks
  this.ctx.fillStyle = "white";
  this.ctx.strokeStyle = "black";
  this.bricks.forEach((brick) => {
    this.ctx.fillRect(
      brick.x,
      brick.y,
      100,
      25
    );
	this.ctx.strokeRect(
      brick.x,
      brick.y,
      100,
      25
    );
  });
  
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
  
  //update win condition
  if(this.bricks.length === 0){
	  this.win = true;
	  this.gameOver();
  }


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
  
  var rx;
  var ry;
  //bounce off paddle
  rx = this.ball.x; 
  if(this.ball.x > this.paddle.x + 150)
	  rx = this.paddle.x + 150;
  else if (this.ball.x < this.paddle.x)
	  rx = this.paddle.x;
  
  ry = this.ball.y; 
  if(this.ball.y > this.paddle.y+20)
	  ry = this.paddle.y + 20;
  else if (this.ball.y < this.paddle.y)
	  ry = this.paddle.y; 

  var distSquared =
    Math.pow(rx - this.ball.x, 2) +
    Math.pow(ry - this.ball.y, 2);
  if(distSquared < Math.pow(10, 2)) {
	
	
	
	if(this.ball.x>this.paddle.x+150 || this.ball.x<this.paddle.x){
		this.horizontal = 0-this.horizontal;
	}
	else{
	this.vertical = 0-this.vertical;
	if (this.horizontal >= 0 && this.direction === 'right')
		this.horizontal = Math.min(this.horizontal+1, 4);
    else if (this.horizontal >= 0 && this.direction === 'left')
		this.horizontal = Math.max(this.horizontal-1, 1);
	else if (this.horizontal < 0 && this.direction === 'left')
		this.horizontal = Math.max(this.horizontal-1, -1);
	 else if (this.horizontal < 0 && this.direction === 'right')
		this.horizontal = Math.min(this.horizontal+1, -1);
	}

	}
	
	//bounce off bricks
	if(this.ball.y-10 <= 125)
	{
		for(var i=0; i<this.bricks.length; i++){
		  var brick = this.bricks[i];
		  rx = this.ball.x; 
		  if(this.ball.x > brick.x + 100)
			  rx = brick.x + 100;
		  else if (this.ball.x < brick.x)
			  rx = brick.x;
		  
		  ry = this.ball.y; 
		  if(this.ball.y > brick.y+20)
			  ry = brick.y + 20;
		  else if (this.ball.y < brick.y)
			  ry = brick.y; 

		  var distSquared =
			Math.pow(rx - this.ball.x, 2) +
			Math.pow(ry - this.ball.y, 2);
		  if(distSquared < Math.pow(10, 2)) {
			this.score += 10; 
			this.bricks.splice(i, 1);
			if(this.ball.x>brick.x+100 || this.ball.x<brick.x){
				this.horizontal = 0-this.horizontal;
			}
			else
				this.vertical = 0-this.vertical;
			break;
		  }

		}
	}
	
}



//loop
BrickBreaker.prototype.loop = function() {
  this.update();
  this.render();
}


new BrickBreaker