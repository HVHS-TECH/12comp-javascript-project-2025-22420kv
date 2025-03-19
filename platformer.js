/*******************************************************/
// Programming project: Platformer
// Written by Kyla van Weele
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/

let sheetImg;
let grass, water, dirt;

const PLAYERSPEED = 1;
const PLAYERJUMPHEIGHT = 1.5;

//var score = 0;

function preload() {
    //imgPlatform  = loadImage('../images/betterPlatforms.png');
    sheetImg = loadImage("../assets/cavesofgallet_tiles.png");
  }

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    new Canvas(400, 200, "pixelated x4"); 
    world.gravity.y = 10;
    player = new Sprite(60, 10, 7, 'd'); 
    player.color = 'lightpink';
    player.friction = 0;;
    player.drag = 0;

    grass = new Group();
    grass.image = (sheetImg);
    grass.collider = "static";
    grass.spriteSheet = sheetImg;
    grass.addAni({ w:8, h:8, row:1, col:1 });
    grass.tile = 'g';

    new Tiles(
        [
            'ggggggg',
            '         ggggggg',
            '    gggggg',
            'ggg',
            '  gggggg',
            '        gggggg',
            '               gggg',
            '          gggggg',
            '     ggggg',
            ' ggg',
            '   ggg',
            '      g',
            '         g',
            '           g',
            '               g',
            '                  g'
        ],
        50, 20, //x, y
        8, 8   //w, h
    )

    playerDeath();
    //walls();
    //platforms();
    //coins();

    //player.collides(coin, getPoint);
	//function getPoint(collider1, collider2) {
	//	collider2.remove();
	//	score++;
	///}
}

function playerDeath() {
    killBlock = new Sprite(200, 200, 400, 10, 'k');
    killBlock.color = 'red';
    
}

/******************************************************/
// walls()
//called by setup()
//Place holders so sprite doesnt disapear into the void
/*******************************************************/
//function walls() {
//    wallLH = new Sprite(1, windowHeight/2, 8, height, 'k');
//	   wallLH.color = 'blue';
//	wallRH = new Sprite(1920, windowHeight/2, 8, height, 'k');
//	   wallRH.color = 'blue';
//	wallTop = new Sprite(windowWidth/2, 0, width, 8, 'k');
//	   wallTop.color = 'blue';
//	wallBottom = new Sprite(windowWidth/2, 910, width, 8, 'k' );
//	   wallBottom.color = 'blue';
//}

//function coins() {
//    coin = new Sprite(500, 500, 20, 'k');
//}

/*******************************************************/
// platforms()
//called by setup()
/*******************************************************/
//function platforms() {
//    platform1 = new Sprite(300, 750, 500, 50, 'k');
//    platform2 = new Sprite(100, 600, 250, 50, 'k');
//    platform3 = new Sprite(680, 400, 250, 50, 'k');
//    platform4 = new Sprite(1200, 400, 100, 50, 'k');   //Continue making sprites collide with images//
//}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background("#21263f");      //#21263f background color to match tiles
    kbMovement();
    //displayScore();
    if (player.collide(killBlock)) {
        player.pos.y = '10';
        player.pos.x = '60';
    }
}


/*******************************************************/
// kbMovement()                                            //Note: Make sprite unable to double jump when its in the air///
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
    if (kb.presses('w')) {  
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


//function displayScore() {
//    text("Score: "+ score, 10, 25) 
//    textSize(20);
//}

/*******************************************************/
// Copied from Stack Overflow website to hide scroll bars 
/*******************************************************/
document.body.style.overflow = 'hidden';
