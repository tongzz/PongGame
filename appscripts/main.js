console.log("yo, I'm alive!");

	var paper = new Raphael(document.getElementById("mySVGCanvas"));
	
// how fast the paddles are moving
	var dx = 25;
	var dy = 25;

// position of left paddle
	var x1 = 40;
	var x2 = 750;

// position of right paddle
	var y1 = 100;
	var y2 = 100;

// paddle width & height
	var paddleH = 70;
	var paddleW = 20;

// array for direction keys
	var key = [0,0,0,0];

// size & position of ball
	var ballR = 10;

// score of two players 
	var score1 = 0;
	var score2 = 0;

	var pWidth = paper.canvas.offsetWidth;
	var pHeight = paper.canvas.offsetHeight;

	var p1 = paper.rect(x1, y1, paddleW, paddleH);
	var p2 = paper.rect(x2, y2, paddleW, paddleH);
	p1.attr({fill:"black"});
	p2.attr({fill:"black"});



    var map = function (x,a,b,m,n){
        return ((x-a)/(b-a)*(n-m))+m;
    };


//	Speed of ball
	var xrate;
	var yrate;

	var ball;


// Start button & text
	var startButton = paper.rect(pWidth/2-75,pHeight/2-25,150,50);
	var startText= paper.text(pWidth/2,pHeight/2,"CLICK HERE TO START");
	startButton.attr({fill:"white"});


	var startGame = function () {
		ball.remove();
		startButton.show();
		startText.show();
	}

	startButton.node.addEventListener("click", function(){ 
	         startButton.hide();
	         startText.hide();
	         initBall();
        	}
        );


    var initBall = function() {

    	ball = paper.circle(pWidth/2, pHeight/2, ballR);
		ball.attr({fill:"black"});
		//	Starting positiong of the ball
		ball.attr("cx",pWidth/2);
		ball.attr("cy",pHeight/2);

		ballx = pWidth/2;
		bally = pHeight/2;

		xrate = map(Math.random(), 0, 1, -10, 10);
		yrate = map(Math.random(), 0, 1, 5 ,10);
	};

	function moveBall() {
		ball.translate(xrate,yrate);
		ballx += xrate;
		bally += yrate;
        if (ballx+10 > pWidth && score1 < 3) {
        	score1++;
        	document.getElementById("score1").innerHTML = score1;
        	ball.remove();
        	initBall(); 
        } else if (score1 === 3) {
        	ball.attr("cx",pWidth/2);
			ball.attr("cy",pHeight/2);
        	ball.remove();
        	score1 = 0;
        	alert("Player 1 wins!");
        	location.reload();
        }
        	// if (score1 < 3) {
        	// 	initBall();
	        // } else 
	        // if (score1 === 3) {
	        // 		ball.attr("cx",pWidth/2);
	        // 		ball.remove();
	        // 		alert("Player 1 is the winner!");
	        // 		score1 = -1;
	        // 		startGame();
	        // 	} 

        if (bally+20 > pHeight) {yrate = -yrate;}
        if (ballx-10 < 0 && score2 < 3) {
        	score2++;
        	document.getElementById("score2").innerHTML = score2;
        	ball.remove();
        	initBall(); 
        } 	else if (score2 === 3) {
	        	ball.attr("cx",pWidth/2);
				ball.attr("cy",pHeight/2);
	        	ball.remove();
	        	score1 = 0;
	        	alert("Player 2 wins!");
	        	location.reload(); 
        }
        if (bally-10 < 0) {yrate = -yrate;}

		if (Raphael.isBBoxIntersect(ball.getBBox(),p1.getBBox())) {
			xrate= -xrate*1.2;
		}

		if (Raphael.isBBoxIntersect(ball.getBBox(),p2.getBBox())) {
			xrate= -xrate*1.2;
		}


	}


// 'Update' function to move the objects smoothly
	function update() {
		
		if(y1>0)	{
			if (key[0]) {
				p1.translate(0,-dy);
				y1 -= dy;
			}
		}

		if (y1+85<pHeight)	{
				if (key[1]) {
				p1.translate(0,dy);
				y1 += dy;

			}
		}

		if(y2>0)	{
			if (key[2]) {
			p2.translate(0,-dy);
			y2 -= dy;
			}
		}

		if (y2+85< pHeight)	{
			if (key[3]) {
				p2.translate(0,dy);
				y2 += dy;
			}
		}

	}


// Switch key function to determine which key has been pressed
	function changeKey (which, to) {
		switch (which){
			case 87: key[0]=to; break; // 'W' key
			case 83: key[1]=to; break; // 'S' key
			case 38: key[2]=to; break; // Up-arrow key
			case 40: key[3]=to; break; //Down-arrow key
 			}
	}

document.onkeydown=function(e){changeKey((e||window.event).keyCode, 1);};
document.onkeyup=function(e){changeKey((e||window.event).keyCode, 0);};

window.onload=function(){
		setInterval(update, 35);
		setInterval(moveBall, 35);
	}
