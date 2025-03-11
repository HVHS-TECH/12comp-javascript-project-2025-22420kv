/*******************************************************/
// Programming project: Platformer
// Written by Kyla van Weele
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/

const PLAYERSPEED = 5;
const PLAYERJUMPHEIGHT = 8;

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


/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background("Lightblue");

    ///Keyboard movement keys///
    if (kb.pressing('a')) {
		player.vel.x = -PLAYERSPEED;
    } else if (kb.pressing('d')) {
        player.vel.x = PLAYERSPEED;
    } else {
        player.vel.x = 0;
    }
    if (kb.presses('w')) {
        player.vel.y = -PLAYERJUMPHEIGHT;
    } 
}

/*******************************************************/
// Copied from Stack Overflow website to hide scroll bars 
/*******************************************************/
document.body.style.overflow = 'hidden';
