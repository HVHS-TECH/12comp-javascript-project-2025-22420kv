/*******************************************************/
// Programming project: Platformer
// Written by Kyla van Weele
/*******************************************************/

/*******************************************************/
// IMPORTANT NOTES!!
// Create for-loop for when you die the game shows how many coins you've collected
// Create different types of coins so loop can show different items//
// Create popup
// Color picking for loop with array
// Make it so endScreen shows 
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/

let sheetImg;
let grass, water, dirt;

const PLAYERSPEED = 1;
const PLAYERJUMPHEIGHT = 1.5;

var score = 0;

gameState = "play";

let invalidUserName = "true";
askUserName();

function askUserName() {
    while (invalidUserName) {
        askUserName = prompt("Welcome User! Please state your username before starting.")
        if(askUserName == null) {
            return(askUserName);
        }
        if(askUserName == null || !isNaN(askUserName) || askUserName == "") {
            alert("Invalid input: No numbers allowed!");
        } else {
            invalidUserName = false;
        }
        console.log(askUserName);
    }
}



function preload() {
    sheetImg = loadImage("assets/cavesofgallet_tiles.png");
    coinImg = loadImage("assets/smallCoin.png");
}

//const openBtn = document.getElementById("openModal");
//const closeBtn = document.getElementById("closeModal");
//const modal = document.getElementById("modal");

//openBtn.addEventListener("click", () => {
//    modal.classList.add("open");
//});

//closeBtn.addEventListener("click", () => {
//    modal.classList.remove("open");
//})



//const spriteColors = ["lightblue", "lightgreen", "lightgrey"];

//console.log(spriteColors);
//const list = [1, 2, 3, 4];
//for (var i = 0; i <= 2; i++) {
//    console.log[i];
//}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    new Canvas(400, 200, "pixelated x4"); 
    world.gravity.y = 10;
    player = new Sprite(10, 10, 7, 'd'); 
    player.color = 'lightpink';
    player.friction = 0;;
    player.drag = 0;

    colors = new Sprite(200, 10, 7, 7, 's');

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


    coin = new Group();
    coin.image = (coinImg);
    coin.collider = "static";
    coin.tile = 'c';

    new Tiles(
        [
            's',
            's              s',
            'ggggggg        s',
            '         ggggggg',
            '    gggggg',
            'ggg',
            '  gggggg           s',
            '        gggggg     s',
            '                  cs        g',       
            '               ggggg           g',
            '          gggggg                  g',
            '     ggggg                           g',
            ' ggg                                    gggg',
            '   ggg                                g',
            '      g                          gggg',
            '         g                     g',
            '             c            gggg',
            '         g          gggg',
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
        console.log("Touches");
		coin.remove();
        score++;
	});


    playerDeath();
    exitBlock();
    //loop();
}


/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    if (gameState == "play") {
		runGame();
	} 
    else if (gameState == "lose") {
		loseScreen();
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
        endScreen();
    }
}



/*******************************************************/
// loseScreen()                                          
// Called by draw()
// When user user touches killBlock
/*******************************************************/
function loseScreen() {
    console.log("Player died");
    background("red");
    text("You died!", 100, 100);
    player.remove();
    tiles.remove();
}


function playerDeath() {
    killBlock = new Sprite(200, 200, 400, 10, 'k');
    killBlock.color = 'red';
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
    background("purple");
    text("You escaped!", 100, 100);
}

function exitBlock() {
    exitDoor = new Sprite(400, 169, 5, 15, 'k');
    exitDoor.color = "white";  
    if (player.collides(exitDoor)) {
        endScreen();
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
        //if (player.collides(grass)) {
        //    player.vel.y = 0;
        //}
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
    text("Score: "+ score, 350, 10)     ///figure out how to change the text color
    textSize(10);
}


//function displayScore() {
//    document.getElementById("myH2").style.color = "black";
//}


/*******************************************************/
// Copied from Stack Overflow website to hide scroll bars 
/*******************************************************/
document.body.style.overflow = 'hidden';
