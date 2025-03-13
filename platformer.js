/*******************************************************/
// Programming project: Platformer
// Written by Kyla van Weele
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/

const PLAYERSPEED = 5;
const PLAYERJUMPHEIGHT = 8;

var score = 0;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    cnv = new Canvas(windowWidth, windowHeight);
    world.gravity.y = 10;
    player = new Sprite(windowWidth/2, windowHeight/2, 100, 'd');
    player.color = 'yellow';
    player.friction = 0;
    
    walls();
    platforms();
    coins();

    player.collides(coin, getPoint);
	function getPoint(collider1, collider2) {
		collider2.remove();
		score++;
	}
}



/*******************************************************/
// walls()
//called by setup()
//Place holders so sprite doesnt disapear into the void
/*******************************************************/
function walls() {
    wallLH = new Sprite(1, windowHeight/2, 8, height, 'k');
	   wallLH.color = 'blue';
	wallRH = new Sprite(1920, windowHeight/2, 8, height, 'k');
	   wallRH.color = 'blue';
	wallTop = new Sprite(windowWidth/2, 0, width, 8, 'k');
	   wallTop.color = 'blue';
	wallBottom = new Sprite(windowWidth/2, 910, width, 8, 'k' );
	   wallBottom.color = 'blue';
}

function coins() {
    coin = new Sprite(500, 500, 20, 'd');
}

/*******************************************************/
// platforms()
//called by setup()
/*******************************************************/
function platforms() {
    platform1 = new Sprite(300, 750, 500, 50, 'k');
    platform2 = new Sprite(100, 600, 250, 50, 'k');
    platform3 = new Sprite(680, 400, 250, 50, 'k');
    platform4 = new Sprite(1200, 400, 100, 50, 'k');
    platform5 = new Sprite(1500, 400, 50, 50, 'k');
    platform6 = new Sprite(1700, 400, 10, 10, 'k');
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background("Lightblue");

    kbMovement();
    displayScore();
}


/*******************************************************/
// kbMovement()
//Called by draw()
/*******************************************************/
function kbMovement() {
    if (kb.pressing('a')) {
		player.vel.x = -PLAYERSPEED;
    } else if (kb.pressing('d')) {
        player.vel.x = PLAYERSPEED;
    } else {
        player.vel.x = 0;
    }
    if (kb.presses('w')) {  //make sprite know if it touching other sprite
        player.vel.y = -PLAYERJUMPHEIGHT;
    }
}


//function isPlayerJumping() {
//    console.log("Player left");
//    player.collides(wallBottom, stopJumping);
//    function stopJumping(collider1, collider2) {
//		player.vel.y = 0;
//	}
//}


function displayScore() {
    text("Score: "+ score, 10, 25) 
    textSize(20);
}

/*******************************************************/
// Copied from Stack Overflow website to hide scroll bars 
/*******************************************************/
document.body.style.overflow = 'hidden';
