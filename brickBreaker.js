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
	this.broken = [];
	//paddle variables
	this.direction = 'still';
	this.speed = 0;
	this.slowStart = 0;
	this.MAXSPEED = 5;
	this.wait = 0;
	
	//ball variables
	this.vertical = 1;
	this.horizontal = 1;
	this.tail1 = {x:500, y: 250};
	this.tail2 = {x:500, y: 250};
	this.tail3 = {x:500, y: 250};
	this.tail4 = {x:500, y: 250};
	this.tail5 = {x:500, y: 250};
	this.tail6 = {x:500, y: 250};
	this.tail7 = {x:500, y: 250};
	this.tail8 = {x:500, y: 250};
	this.tail9 = {x:500, y: 250};
	this.tail10 = {x:500, y: 250};
	this.tail11 = {x:500, y: 250};
	this.tail12 = {x:500, y: 250};
	this.tail13 = {x:500, y: 250};
	this.tail14 = {x:500, y: 250};
	this.tail15 = {x:500, y: 250};
	this.tail16 = {x:500, y: 250};
	this.tail17 = {x:500, y: 250};
	this.tail18 = {x:500, y: 250};
	this.tail19 = {x:500, y: 250};
	this.tail20 = {x:500, y: 250};
	this.tail21 = {x:500, y: 250};
	this.tail22 = {x:500, y: 250};
	this.tail23 = {x:500, y: 250};
	this.tail24 = {x:500, y: 250};
	this.tail25 = {x:500, y: 250};
	this.tail26 = {x:500, y: 250};
	this.tail27 = {x:500, y: 250};
	this.tail28 = {x:500, y: 250};
	this.tail29 = {x:500, y: 250};
	this.tail30 = {x:500, y: 250};
	
	
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
    this.ctx.fillStyle = 'rgba(255,255,255,.2)';
    this.ctx.fillRect(0,0,
      this.width,
      this.height);
    this.ctx.fillStyle = "white";
    this.ctx.font = '30px sans-serif';
	if(this.win)
	{
      this.ctx.fillText("You Win", 20, 200);
	}else{
      this.ctx.fillText("Game Over", 20, 200);
    }
    this.ctx.fillText("Points: "+ this.score, 20, 250);
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText("Press spacebar for new game", 20, 290);
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
  
  //draw broken bricks
  this.ctx.strokeStyle = "black";
  this.broken.forEach((brick) => {
	 this.ctx.fillStyle = "rgba(255,255,255,"+brick.opacity+")";
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
	if(brick.opacity>0)
	  brick.opacity -= .01;
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
 

 //draw tail
  this.ctx.strokeStyle = "white";
  this.ctx.fillStyle = "rgba(255,255,255,.9)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail1.x,this.tail1.y, 9, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
  
  this.ctx.fillStyle = "rgba(255,255,255,.8)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail3.x,this.tail3.y, 8, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
  
  this.ctx.fillStyle = "rgba(255,255,255,.7)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail6.x,this.tail6.y, 7, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
  
  this.ctx.fillStyle = "rgba(255,255,255,.6)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail9.x,this.tail9.y, 6, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
  
  this.ctx.fillStyle = "rgba(255,255,255,.5)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail12.x,this.tail12.y, 5, 0, 6 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
  
  this.ctx.fillStyle = "rgba(255,255,255,.4)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail15.x,this.tail15.y, 4, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
  
  this.ctx.fillStyle = "rgba(255,255,255,.3)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail18.x,this.tail18.y, 3, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
  
  this.ctx.fillStyle = "rgba(255,255,255,.2)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail21.x,this.tail21.y, 2, 0, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fill();
  
  this.ctx.fillStyle = "rgba(255,255,255,.1)";
  this.ctx.beginPath();
  this.ctx.arc(this.tail24.x,this.tail24.y, 1, 0, 2 * Math.PI);
  this.ctx.stroke();
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
  if (this.wait > 0)
    this.wait--;
  else{
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
	  }
  
  //move ball

  this.tail24.x= this.tail23.x;
  this.tail24.y= this.tail23.y;
  
  this.tail23.x= this.tail22.x;
  this.tail23.y= this.tail22.y;
  
  this.tail22.x= this.tail21.x;
  this.tail22.y= this.tail21.y;

  this.tail21.x= this.tail20.x;
  this.tail21.y= this.tail20.y;
  
  this.tail20.x= this.tail19.x;
  this.tail20.y= this.tail19.y;
  
  this.tail19.x= this.tail18.x;
  this.tail19.y= this.tail18.y;
  
  this.tail18.x= this.tail17.x;
  this.tail18.y= this.tail17.y;
  
  this.tail17.x= this.tail16.x;
  this.tail17.y= this.tail16.y;
  
  this.tail16.x= this.tail15.x;
  this.tail16.y= this.tail15.y;

  this.tail15.x= this.tail14.x;
  this.tail15.y= this.tail14.y;
  
  this.tail14.x= this.tail13.x;
  this.tail14.y= this.tail13.y;
  
  this.tail13.x= this.tail12.x;
  this.tail13.y= this.tail12.y;
  
  this.tail12.x= this.tail10.x;
  this.tail12.y= this.tail10.y;

  this.tail11.x= this.ball.x;
  this.tail11.y= this.ball.y;
    
  this.tail10.x= this.tail9.x;
  this.tail10.y= this.tail9.y;
  
  this.tail9.x= this.tail8.x;
  this.tail9.y= this.tail8.y;
  
  this.tail8.x= this.tail7.x;
  this.tail8.y= this.tail7.y;
  
  this.tail7.x= this.tail6.x;
  this.tail7.y= this.tail6.y;
  
  this.tail6.x= this.tail5.x;
  this.tail6.y= this.tail5.y;

  this.tail5.x= this.tail4.x;
  this.tail5.y= this.tail4.y;
  
  this.tail4.x= this.tail3.x;
  this.tail4.y= this.tail3.y;
  
  this.tail3.x= this.tail2.x;
  this.tail3.y= this.tail2.y;
  
  this.tail2.x= this.tail1.x;
  this.tail2.y= this.tail1.y;

  this.tail1.x= this.ball.x;
  this.tail1.y= this.ball.y;

  this.ball.x+=this.horizontal;
  this.ball.y+=this.vertical;
  
  //loss
  if(this.ball.y+10>=500)
  {
	  this.gameOver();
	  return;
  }
  
  //check bounces
  var bounce = document.getElementById("bounce");
  var breakNoise = document.getElementById("break");
  //wall bounces
  if(this.ball.x -10<=0 || this.ball.x + 10 >=1000)
  {
	bounce.play();  
	this.horizontal = 0-this.horizontal;
  }
  //ceiling bounce
  if(this.ball.y-10 <= 0)
  {
	bounce.play();    
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
  	bounce.play();
	this.wait = 5;
	if(this.ball.x > this.paddle.x+150 || this.ball.x < this.paddle.x){
		this.horizontal = 0-this.horizontal;
	}
	else{
	this.vertical = 0-this.vertical;
	if (this.horizontal >= 0 && this.direction === 'right')
		this.horizontal = Math.min(this.horizontal+1, 4);
    else if (this.horizontal >= 0 && this.direction === 'left')
		this.horizontal = Math.max(this.horizontal-1, 1);
	else if (this.horizontal < 0 && this.direction === 'left')
		this.horizontal = Math.max(this.horizontal-1, -4);
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
			this.broken.push({x: brick.x, y: brick.y, opacity: 1})  
			breakNoise.play();    
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