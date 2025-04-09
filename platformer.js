/*******************************************************/
// Programming project: Platformer
// Written by Kyla van Weele
/*******************************************************/

/*******************************************************/
// IMPORTANT NOTES!!
// Tiles pack - Caves of Gallet - made by KaizarNike on Itch.io
// Some help from p5.play website and w3Schools
// I have commented which code I got where below for more detail
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/

let sheetImg;
let grass, water, dirt;

const PLAYERSPEED = 1;
const PLAYERJUMPHEIGHT = 1.5;

var score = 0;

gameState = "start";

let invalidUserName = "true";
userName();



/*******************************************************/
// userName()
// Asks user for username
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

if (userName == null) {                     //checks if user inputed a username
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
/*******************************************************/
function preload() {
    sheetImg = loadImage("assets/cavesofgallet_tiles.png");
    coinImg = loadImage("assets/smallCoin.png");
    bigCoinImg = loadImage("assets/coin.png");

}

/*******************************************************/
// setup()
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

    // Lava
    lava = new Group();
    lava.image = (sheetImg);
    lava.collider = "static";
    lava.spriteSheet = sheetImg;
    lava.addAni({ w:8, h:8, row:10, col:4 });
    lava.tile = 'l';

    //Collectable tiles
    coin = new Group();
    coin.image = (coinImg);
    coin.collider = "static";
    coin.tile = 'c';

    bigCoin = new Group();
    bigCoin.image = (bigCoinImg);
    bigCoin.collider = "static";
    bigCoin.tile = 'b';

    new Tiles(
        [
            '                                s',
            '                                ss      s',
            's              s                ssc    sss       s',
            's              s                gggggggggggggg   s',
            'ggggggg       ss                                gg', 
            's        ggggggg                              gg s',
            's   gggggg                                ggg    s',
            'ggg          s           b                   gg  s',
            ' sgggggg    ss     s                            gg',
            ' s      gggggg     s     g                   ggg s',
            ' s                cs        g             gg     s',       
            ' s         s   ggggg           g            ggg  s',
            ' s        gggggg                  g             gg',
            ' s   ggggg                           g       ggg',
            ' ggg                                    gggg',
            '   ggg                                g',
            '      g                          gggg',
            '         g                 s   g',
            '             c           ggggg',
            '         gg         gggg',
            '       g     g    g',
            '     g           g',
            'c  g',
            'gg',
            '                                              g  g'
        ],
        5, 5, //x, y
        8, 8   //w, h
    )

    


/*******************************************************/
// Help from p5.play tiles page 
/*******************************************************/
    player.collides(coin, (player, coin) => {
        console.log("Coins");
		coin.remove();
        score++;
	});

    player.collides(bigCoin, (player, bigCoin) => {
        console.log("Big coins");
        bigCoin.remove();
        score = score + 2;
    });

    playerDeath();
    exitBlock();
}


/*******************************************************/
// draw()
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
}

function runGame() {
    background("#21263f");    //#21263f background color to match tiles
    kbMovement();
    displayScore();
    playerCollisions();
}


/*******************************************************/
// playerCollisions()                                          
// Called by runGame()
// When the user does something major
/*******************************************************/
function playerCollisions() {
    if (player.collide(killBlock)) {
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
    player.remove();
    grass.remove();
    stone.remove();
    coin.remove();
    bigCoin.remove();
    killBlock.remove();
    exitDoor.remove();
}


function playerDeath() {
    killBlock = new Sprite(200, 200, 400, 10, 'k');
    killBlock.color = 'rgb(139, 0, 0)';
    stroke = 'red';
    if (player.collides(killBlock)) {
        gameState = "lose"
        
    }
}

/*******************************************************/
// endScreen()                                          
// Called by playerCollisions()
// When user user touches exitDoor
/*******************************************************/
function endScreen() {
    console.log("Player won");
    background("black");
    text("You escaped!", 150, 80);
    text("Score: " + score, 155, 100);
    text("Reload page to restart", 120, 120);
    textSize(15);
    player.remove();
    grass.remove();
    stone.remove();
    coin.remove();
    bigCoin.remove();
    exitDoor.remove();
    killBlock.remove();
}

function exitBlock() {
    exitDoor = new Sprite(400, 185, 5, 15, 'k');
    exitDoor.color = "white";  
    if (player.collides(exitDoor)) {
        gameState = "win"
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
    
    if (kb.presses('w') && player.colliding(grass) || kb.presses('w') && player.colliding(stone)) { //So player only jumps when touching the tiles         && player.colliding(grass) || kb.presses('w') && player.colliding(stone)
        player.vel.y = -(PLAYERJUMPHEIGHT);
     
    } 
}


function displayScore() {
    text("Username: "+ userName, 1, 8) 
    text("Score: "+ score, 350, 8)  
    textSize(10);
    fill('#8FBC8B');
}


//function displayScore() {
//    document.getElementById("myH2").style.color = "black";
//}


/*******************************************************/
// Copied from Stack Overflow website to hide scroll bars 
/*******************************************************/
document.body.style.overflow = 'hidden';