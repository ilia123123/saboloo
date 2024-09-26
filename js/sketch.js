function setup() {
	createCanvas(624, 351);
  }
  
  function draw() {
	background(0);
	  
	playerPaddle.display();
	aiPaddle.display();
	  
	playerPaddle.update(); // add this
	aiPaddle.update();     // and this
	  
	processAI();   // andddd thiss
	  
	ball.update(); 
	ball.display(); 
	stroke(255);
	line(width/2, 0, width/2, height);
	
	  
  }
  
  function processAI() {
	let middleOfPaddle = aiPaddle.y + aiPaddle.height / 2;
	  
	if (middleOfPaddle > ball.y) {
	  aiPaddle.isUp = true;
	  aiPaddle.isDown = false;
	} else {
	  aiPaddle.isDown = true;
	  aiPaddle.isUp = false;
  
	}
  }
  class Paddle {

	constructor(x) {
		this.x = x;
		this.y = height / 2;
		this.height = 80;
		this.width = 20;
		
		this.isUp = false;
		this.isDown = false;
		
	}

	
	display() {
		fill(255);
		rect(this.x, this.y, 20, 80);
	}
	
	// add these little buggers
	up() {
		this.y -= 2;
	}
	
	down() {
		this.y += 2;
	}
	update() {
		if (this.isUp) {
		  this.up();
		} else if (this.isDown) {
		  this.down();
		}
	  }
	  
	}
let playerPaddle;
let aiPaddle;
let ball; // define the ball

function setup() {
    createCanvas(624, 351);
	playerPaddle = new Paddle(26);
	aiPaddle = new Paddle(width - 48);
	ball = new Ball(); // create the ball object
}



function keyPressed() {
	if (keyCode == UP_ARROW) {
		playerPaddle.isUp = true;
	} else if (keyCode == DOWN_ARROW) {
		playerPaddle.isDown = true;
	}
	if (playerPaddle.isUp) {
		playerPaddle.up();
	} else if (playerPaddle.isDown) {
		playerPaddle.down();
	}
}

function keyReleased() {
	if (keyCode == UP_ARROW) {
		playerPaddle.isUp = false;
	} else if (keyCode == DOWN_ARROW) {
		playerPaddle.isDown = false;
	}
	
	
	
}

class Ball{


	constructor() {
		this.r = 10;
		this.reset();
	}
	
	
	update() {
		// if it hits the top or bottom change direction
		if (this.y < this.r || this.y > height - this.r) {
			this.ySpeed = -this.ySpeed;
		} 
		// if it goes to the end of the sreen restart the game
		if (this.x < this.r || this.x > width + this.r) {
			this.reset();
		}
		
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	
	}
	
	reset() {
		this.x = width/2;
		this.y = height/2;
		
		this.xSpeed = random(3, 4);
		
		// determines if it's going left or right
		let isLeft = random(1) > .5;
		if (isLeft) {
			this.xSpeed = -this.xSpeed;
		} 
		
		this.ySpeed = random(-3, 3);
	}
	
	display() {
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
	
	
	hasHitPlayer(player) {
		if (this.x - this.r <= player.x + player.width && this.x > player.x) {
		  if (this.isSameHeight(player)) {
			this.xSpeed = -this.xSpeed;
		  }
		}
	  }
		  
	  hasHitAi(ai) {
		if (this.x + this.r >= ai.x && this.x <= ai.x + ai.width) {
		  if (this.isSameHeight(ai)) {
			this.xSpeed = -this.xSpeed;
		  }
		}
	  }
			  
	  isSameHeight(player) {
		return this.y >= player.y && this.y <= player.y + player.height
	  }

	
}




	
	
	




