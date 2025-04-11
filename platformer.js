/*******************************************************/
// Programming project: Platformer
// Written by Kyla van Weele
/*******************************************************/

/*******************************************************/
// IMPORTANT NOTES!!
// Tiles pack - Caves of Gallet - made by KaizarNike on Itch.io
// Some help from p5.play website and w3Schools
// Used some code from my previous projects last year in DTECH
// I have commented which code I got where below for more detail
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/

// Tiles image
let sheetImg;

// Movement 
const PLAYERSPEED = 1;
const PLAYERJUMPHEIGHT = 1.5;

// Score
var score = 0;
var Point = "User got a point!";

// Screen changes
gameState = "start";

// Username 
let invalidUserName = "true";
userName();



/*******************************************************/
// userName()
// Asks user for username
// Used code from my previous year projects for help
/*******************************************************/
function userName() {
    while (invalidUserName) {
        userName = prompt("Welcome User! Please state your username before starting.")
        if(userName == null) {
            return(userName);
        }
        if(userName == null || !isNaN(userName) || userName == "") {
            alert("Thats not valid!");
        } else {
            invalidUserName = false;
        }
        console.log(userName);
    }
}

//checks if user inputed a username or not
if (userName == null) {                
    console.log("No username inputed");
} 
else {
    console.log("Username inputed");
}

function test(_nameTrue) {
    if (_nameTrue == userName) {
        return "true"; 
    }
    else if (userName == null) {
        return "false";
    } 
}


/*******************************************************/
// Preload()
// Images/tiles
/*******************************************************/
function preload() {
    sheetImg = loadImage("assets/cavesofgallet_tiles.png");
    flippedSheetImg = loadImage("assets/cavesofgallet_tilesFlipped.png");
    coinImg = loadImage("assets/smallCoin.png");
    bigCoinImg = loadImage("assets/coin.png");

}

/*******************************************************/
// setup()
// Player sprite setup
// Tile setup
// Score collide setup
/*******************************************************/
function setup() {
    new Canvas(400, 200, "pixelated x4"); 
    world.gravity.y = 10;
    player = new Sprite(15, 20, 7, 'd'); 
    player.color = 'lightpink';
    player.friction = 0;;
    player.drag = 0;

   // Floor and wall tiles
    grass = new Group();
    grass.image = (sheetImg);
    grass.collider = "static";
    grass.spriteSheet = sheetImg;
    grass.addAni({ w:8, h:8, row:1, col:1 });
    grass.tile = 'g';

    stone = new Group();
    stone.image = (sheetImg);
    stone.collider = "static";
    stone.spriteSheet = sheetImg;
    stone.addAni({ w:8, h:8, row:0, col:3 });
    stone.tile = 's';

    stone2 = new Group();
    stone2.image = (sheetImg);
    stone2.collider = "none";
    stone2.spriteSheet = flippedSheetImg;
    stone2.addAni({ w:8, h:8, row:0, col:3 });
    stone2.tile = 'd';
    
    stone3 = new Group();
    stone3.image = (sheetImg);
    stone3.collider = "none";
    stone3.spriteSheet = flippedSheetImg;
    stone3.addAni({ w:8, h:8, row:0, col:5 });
    stone3.tile = 'w';

    stone4 = new Group();
    stone4.image = (sheetImg);
    stone4.collider = "none";
    stone4.spriteSheet = flippedSheetImg;
    stone4.addAni({ w:8, h:8, row:0, col:4 });
    stone4.tile = 'a';

    // Lava
    lava = new Group();
    lava.image = (sheetImg);
    lava.collider = "static";
    lava.spriteSheet = sheetImg;
    lava.addAni({ w:8, h:8, row:8, col:4 });
    lava.tile = 'l';

    lava2 = new Group();
    lava2.image = (sheetImg);
    lava2.collider = "static";
    lava2.spriteSheet = sheetImg;
    lava2.addAni({ w:8, h:8, row:10, col:4 });
    lava2.tile = 'k';

    lava3 = new Group();
    lava3.image = (sheetImg);
    lava3.collider = "none";
    lava3.spriteSheet = sheetImg;
    lava3.addAni({ w:8, h:8, row:9, col:4 });
    lava3.tile = 'j';

    lava4 = new Group();
    lava4.image = (sheetImg);
    lava4.collider = "none";
    lava4.spriteSheet = sheetImg;
    lava4.addAni({ w:8, h:8, row:7, col:4 });
    lava4.tile = 'h';

    lava5 = new Group();
    lava5.image = (sheetImg);
    lava5.collider = "none";
    lava5.spriteSheet = sheetImg;
    lava5.addAni({ w:8, h:8, row:8, col:3 });
    lava5.tile = 'r';

    lava6 = new Group();
    lava6.image = (sheetImg);
    lava6.collider = "none";
    lava6.spriteSheet = flippedSheetImg;
    lava6.addAni({ w:8, h:8, row:8, col:4 });
    lava6.tile = 'e';

    // Moss
    moss = new Group();
    moss.image = (sheetImg);
    moss.collider = "none";
    moss.spriteSheet = sheetImg;
    moss.addAni({ w:8, h:8, row:3, col:0 });
    moss.tile = 'm';

    moss2 = new Group();
    moss2.image = (sheetImg);
    moss2.collider = "none";
    moss2.spriteSheet = sheetImg;
    moss2.addAni({ w:8, h:8, row:2, col:2 });
    moss2.tile = 'n';

    moss3 = new Group();
    moss3.image = (sheetImg);
    moss3.collider = "none";
    moss3.spriteSheet = sheetImg;
    moss3.addAni({ w:8, h:8, row:3, col:2 });
    moss3.tile = 'v';

    moss4 = new Group();
    moss4.image = (sheetImg);
    moss4.collider = "none";
    moss4.spriteSheet = flippedSheetImg;
    moss4.addAni({ w:8, h:8, row:3, col:7 });
    moss4.tile = 'i';

    moss5 = new Group();
    moss5.image = (sheetImg);
    moss5.collider = "none";
    moss5.spriteSheet = flippedSheetImg;
    moss5.addAni({ w:8, h:8, row:2, col:5 });
    moss5.tile = 'u';

    // Vines
    vine = new Group();
    vine.image = (sheetImg);
    vine.collider = "none";
    vine.spriteSheet = sheetImg;
    vine.addAni({ w:8, h:8, row:10, col:5 });
    vine.tile = 'y';

    vine2 = new Group();
    vine2.image = (sheetImg);
    vine2.collider = "none";
    vine2.spriteSheet = flippedSheetImg;
    vine2.addAni({ w:8, h:8, row:10, col:2 });
    vine2.tile = 't';

    //Collectable tiles
    coin = new Group();
    coin.image = (coinImg);
    coin.collider = "static";
    coin.tile = 'c';

    bigCoin = new Group();
    bigCoin.image = (bigCoinImg);
    bigCoin.collider = "static";
    bigCoin.tile = 'b';

    // Game screen layout
    new Tiles(
        [
            '                               usn      v',
            'v              v               ussn    usv       v',
            'sn            ust              ussmcv isssnv    us',
            'sm  v         isn              yggggggggggggggn is',
            'ggggggg   vv issn              u              v gg', 
            'sn  v   ugggggggn              u          v   ggus',
            'sm  gggggg   v                           ugggm   s',
            'gggn   v    ysn    v     b               u   ggnvs',
            ' sggggggn   ssn   ust                        v  gg',
            ' sn     ggggggn   usn   ugn v               ugggus',
            'ysn        v   v cisn       g  v         yggnv  us',       
            'ust       usm  gggggn          gn           ggg is',
            'usn  vv  uggggggn               nug             gg',
            'usm  ggggg                           gn  vv  gggn',
            'ugggnv                                vugggg    n',
            'u  gggn                           vv  g ehr',
            '      gn v                 v    ugggg   elr',
            '       n g                usn ug        elr',
            '             c      vv  ugggggn         elr',
            '         ggn       uggggu ehr           elr',
            '     v g    ug   vgn      elr           elr      d',
            '     gehr        g        elr           elr     ws',
            'c ug  elr                 elr           elr    daa',
            'gg    ejr                 ejr           ejr    daa',
            'llllllkkklllllllllllllllllkkklllllllllllkkklllssss'
        ],
        5, 5, //x, y
        8, 8   //w, h
    )

    


 /*******************************************************/
 // Help from p5.play tiles page
 /*******************************************************/
    player.collides(coin, (player, coin) => {
        console.log(Point);
		coin.remove();
        score++;
	});

    player.collides(bigCoin, (player, bigCoin) => {
        console.log(Point);
        bigCoin.remove();
        score = score + 2;
    });

    //playerDeath(); // This isnt usefull anymore but keeping it in for incase 
    exitBlock();
}


/*******************************************************/
// draw()
// Screen changing code
/*******************************************************/
function draw() {
    if (gameState == "start") {  
		runGame();
	} 
    else if (gameState == "lose") {
		loseScreen();
	}
    else if (gameState == "win") {
        endScreen();
    }

    // Putting the sprite infront of certain tiles (Help from google ai)
    moss.draw();
    moss2.draw();
    moss3.draw();
    moss4.draw();
    moss5.draw();
    vine.draw();
    vine2.draw();
    lava.draw();
    lava2.draw();
    lava3.draw();
    lava4.draw();
    lava5.draw();
    lava6.draw();
    stone2.draw();
    stone3.draw();
    stone4.draw();
    player.draw();
}

// Game screen major code
function runGame() {
    background("#21263f");    //#21263f background color to match tiles
    kbMovement();
    displayScore();
    playerCollisions();
}


/*******************************************************/
// playerCollisions()                                          
// Called by runGame()
// When the user does something major like die or win
/*******************************************************/
function playerCollisions() {
    if (player.collide(lava || lava2)) {
        gameState = "lose";
    }
    if(player.collide(exitDoor)) {
        gameState = "win";
    }
}




/*******************************************************/
// loseScreen()                                          
// Called by draw()
// When user user touches killBlock
/*******************************************************/
function loseScreen() {
    console.log("Player died");
    background("darkRed");
    text("You died!", 150, 80);
    text("Score: " + score, 155, 100);
    text("Reload page to try again", 110, 120);
    textSize(15); 
    player.remove();          // Remove existing items
    grass.remove();
    stone.remove();
    coin.remove();
    bigCoin.remove();
    exitDoor.remove();
    moss.remove();
    moss2.remove();
    moss3.remove();
    moss4.remove();
    moss5.remove();
    vine.remove();
    vine2.remove();
    lava.remove();
    lava2.remove();
    lava3.remove();
    lava4.remove();
    lava5.remove();
    lava6.remove();
    stone2.remove();
    stone3.remove();
    stone4.remove();
}
  
// killBlock setup  
//function playerDeath() {                                     // This isnt usefull anymore but keeping it in for incase 
//    killBlock = new Sprite(200, 200, 400, 10, 'k'); 
//    killBlock.color = 'rgb(139, 0, 0)';
//    stroke = 'red';
//    if (player.collides(killBlock)) {
//        gameState = "lose"
//        
//    }
//}

/*******************************************************/
// endScreen()                                          
// Called by draw()
// When user user touches exitDoor
/*******************************************************/
function endScreen() {
    console.log("Player won");
    background("black");
    text("You escaped!", 150, 80);
    text("Score: " + score, 155, 100);
    text("Reload page to restart", 120, 120);
    textSize(15);
    player.remove();       // Remove existing items
    grass.remove();
    stone.remove();
    coin.remove();
    bigCoin.remove();
    exitDoor.remove();
    moss.remove();
    moss2.remove();
    moss3.remove();
    moss4.remove();
    moss5.remove();
    vine.remove();
    vine2.remove();
    lava.remove();
    lava2.remove();
    lava3.remove();
    lava4.remove();
    lava5.remove();
    lava6.remove();
    stone2.remove();
    stone3.remove();
    stone4.remove();
}

// exitDoor setup
function exitBlock() {
    exitDoor = new Sprite(400, 185, 5, 15, 'k');
    exitDoor.color = "white";  
    if (player.collides(exitDoor)) {
        gameState = "win"
    }
}





/*******************************************************/
// kbMovement()                                            
// Called by runGame()  
/*******************************************************/
function kbMovement() {
   
    if (kb.pressing('a')) {
		player.vel.x = -PLAYERSPEED;
    } else if (kb.pressing('d')) {
        player.vel.x = PLAYERSPEED;
    } else {
        player.vel.x = 0;
    }
                               //So player only jumps when touching the tiles 
    if (kb.presses('w') && player.colliding(grass) || kb.presses('w') && player.colliding(stone)) { 
        player.vel.y = -(PLAYERJUMPHEIGHT);
     
    } 
}

// Score display
function displayScore() {
    text("Username: "+ userName, 1, 8) 
    text("Score: "+ score, 350, 8)  
    textSize(10);
    fill('#8FBC8B');
}

/*******************************************************/
// Copied from Stack Overflow website to hide scroll bars 
/*******************************************************/
document.body.style.overflow = 'hidden';