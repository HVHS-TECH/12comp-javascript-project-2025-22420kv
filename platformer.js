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

var score = 0;

function preload() {
    sheetImg = loadImage("../assets/cavesofgallet_tiles.png");
    coinImg = loadImage("../assets/smallCoin.png");
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

    coin = new Group();
    coin.image = (coinImg);
    coin.collider = "static";
    coin.tile = 'c';

    new Tiles(
        [
            'ggggggg',
            '         ggggggg',
            '    gggggg',
            'ggg',
            '  gggggg',
            '        gggggg',
            '                  c',
            '               gggg',
            '          gggggg',
            '     ggggg',
            ' ggg',
            '   ggg',
            '      g',
            '         g',
            '             c',
            '           g',
            '               g',
            '                  g'
        ],
        50, 20, //x, y
        8, 8   //w, h
    )

    playerDeath();

    //point = new Sprite(100, 10, 7, 'k')           //func removeTile(position):
                                                    //    $Tilemap.set_cell(position.x,positon.y,-1)

    //funcrion removeCoin(position) {
    //    coin.remove(position.x, position.y, -1)
    //}

    player.collides(coin, getPoint);        
	function getPoint(collider1, collider2) {
		coin.remove();
		score++;
	}
}

function playerDeath() {
    killBlock = new Sprite(200, 200, 400, 10, 'k');
    killBlock.color = 'red';
    
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background("#21263f");      //#21263f background color to match tiles
    kbMovement();
    displayScore();
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


function displayScore() {
    text("Score: "+ score, 350, 10) 
    textSize(10);
}

/*******************************************************/
// Copied from Stack Overflow website to hide scroll bars 
/*******************************************************/
document.body.style.overflow = 'hidden';
