
var canvas = 0;
var context;
var ballRadius = 10;
var xBall=0;
var yBall=0;
var xSpeed = 2;
var ySpeed = 2;
var xPaddle;
var yPaddle;
var hPaddle = 10;
var wPaddle = 90;
var lives = 3;
var lock = 1;
var paddle={
	x:0,
	y:0,
	h:10,
	w:90,
	final:0,
	pos:0
}
var brick= {
	x:0,
	y:0,
	rows:5,
	padding:5,
    length:50,
	width:10,
	status:true,
	col:0
}
var bricks = new Array(brick.rows);
//------------------------------------------------- Variable Declaration-------------------------------------------//

window.onload = main

function main()
{

	
	
	canvas = document.getElementById("game");
	height = canvas.height;
	width = canvas.width;
	context = canvas.getContext("2d");

	paddle.y = height-20;
	paddle.x = width/2;
	xBall = (paddle.x+paddle.w/2);
	yBall = (paddle.y-ballRadius);

	brick.col = Math.floor((width/(2*brick.padding + brick.length)));
	brickArea = (2*brick.padding + brick.width)*brick.rows;

	document.getElementById("lives").innerHTML = lives;
	for(i=0;i<brick.rows;i++)
	{
		bricks[i] = new Array(brick.col);
	}
	for(i=0;i<brick.rows;i++)
		{
		
			for(j=0;j<brick.col;j++)
			{
				temp = brick;
			}
		}
	for(i=0;i<brick.rows;i++)
		{
		
			for(j=0;j<=brick.col;j++)
			{
				x = brick.padding + j*(brick.length+brick.padding);
				y = brick.padding + i*(brick.width+brick.padding);
				temp = new newBrick(x,y,brick.rows,brick.padding,brick.length,brick.width,brick.status,brick.col)
				bricks[i][j] = temp;
				

			}
		}

	//setInterval(draw,1000/60);
	setInterval(function(f){
		requestAnimationFrame(draw)}
		,1000/60)
	
	
}
function newBrick(x,y,rows,padding,length,width,status,col)
{
	this.x = x;
	this.y = y;
	this.rows = rows;
	this.padding = padding;
	this.length = length;
	this.width= width;
	this.status = status;
	this.col = col;
}
/*
function mouse(event)
{
	xPaddle = event.clientX - wPaddle/2;
}
*/
function start()
{
	
	
	
}
function draw()
{
	if(lives >0)
	{
	 drawRect(0,0,height,width,"black");
	 drawCircle(xBall,yBall,ballRadius,"blue");
	 drawBricks();
	 document.addEventListener("keypress", checkKey);
	 //document.onmousemove = mouse;
	 drawRect(paddle.x,paddle.y,paddle.h,paddle.w,"white");
	 speed();
	}
	else{
		 drawRect(0,0,height,width,"black");
		 context.fillStyle = "white"
		 context.font = "30px Comic Sans MS";
		 context.fillText("Game Over",width/2-70,height/2)

	}

}


// Game mechanics - balls speed and collision detection

function speed()
{
	if(lock==1) return
	xBall += xSpeed;
	yBall += ySpeed;


	if(yBall>height)
	{
			xBall = (paddle.x+paddle.w/2);
			yBall = (paddle.y-ballRadius);
			lives -= 1;
			lock =1

			score = document.getElementById("lives");
		if(lives ==1)
		{ 
			score.classList.remove('badge-primary');
			score.classList.add('badge-danger');
			console.log(document.getElementById("h1").innerHTML)
			document.getElementById("h1").classList.remove('badge-primary');

			document.getElementById("h1").classList.add('badge-danger');
			document.getElementById("lives").innerHTML = lives;
		}
		else
		{	
		document.getElementById("lives").innerHTML = lives;
		}
		if(lives==0)
		{
			
		}

	}
	if(yBall < 0)
	{
		ySpeed = -ySpeed;		
	}
	if(xBall<0)
	{
		xSpeed = -xSpeed;
	}

	if(xBall>width)
	{
		xSpeed = -xSpeed
	}
	if((xBall>=paddle.x && xBall<=(paddle.x+paddle.w)) && yBall >= paddle.y)
	{
	
		ySpeed = -ySpeed;

	}

		
	if(yBall<=brickArea)
	{	
		for(i=0;i<brick.rows;i++)
		{
			for(j=0;j<=brick.col;j++)
			{
				var ball = {
					x:xBall,
					y:yBall,
					r : ballRadius
				};
				temp = collision(ball,bricks[i][j]);
				if(temp==true){
					

					if(bricks[i][j].status == true)
						{
						bricks[i][j].status = false;
						//xSpeed = -xSpeed;
						ySpeed = -ySpeed;
						break;	
						}	
				}
				
			}
		}
	}

}



function drawRect(x,y,h,w,color)
{
	context.beginPath();
	context.style = color;
	context.fillStyle = color;
	context.rect(x,y,w,h);
	context.fill();
	context.closePath();
}


function drawCircle(x,y,radius,color)
{
	context.beginPath();
	context.fillStyle = color;
	context.arc(x,y,radius,0,2*Math.PI);
	context.fill();
	context.closePath();
}

// brick drawing logic
function drawBricks()
{
	var colors = ["white","red","blue","yello","azure","pink"]
	for(i=0;i<brick.rows;i++)
		{
			for(j=0;j<=brick.col;j++)
			{
				if(bricks[i][j].status == true)
				{

					drawRect(bricks[i][j].x,bricks[i][j].y,bricks[i][j].width,bricks[i][j].length,"azure");
				}
			}
		}
	
}
function collision(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.length/2);
    var distY = Math.abs(circle.y - rect.y-rect.width/2);

    if (distX > (rect.length/2 + circle.r)) { return false; }
    if (distY > (rect.width/2 + circle.r)) { return false; }

    if (distX <= (rect.length/2)) { return true; } 
    if (distY <= (rect.width/2)) { return true; }

    var dx=distX-rect.length/2;
    var dy=distY-rect.width/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

function checkKey(e)
{
	e = e || window.event;
	switch(e.keyCode){
		case 112:
				lock = -lock
				break;
		case 32:
				lock = -1;
				break
		case 97:
				if(lock==1)return
				if(paddle.x<20)
				break;
				paddle.x -= 40;
				break;
		case 100:
				if(lock==1)return
				if((paddle.x+paddle.w)>=width)
				break;
				paddle.final = paddle.x + 40
				movePaddle();
				break;

	}
}

function movePaddle()
{
	while(paddle.x != paddle.final)
	{
		paddle.x +=2;
	}	
}
