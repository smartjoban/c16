
var monkey , monkey_running, ground, invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var survivalTime = 0;
var bananaTime = false;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 600);
  
  ground = createSprite(300, 540, 1000, 20);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.shapeColor = "white"
  //creating monkey
  monkey = createSprite(50, 500, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;

  
  invisibleGround = createSprite(300, 550, 600, 20);
  invisibleGround.visible = false;
  
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("blue");
  // creating gravity for monkey and making it collide with ground
  monkey.collide(invisibleGround)
  
 
  

  if (gameState == PLAY){
    spawnBananas();
    spawnObstacles();
    
    if (keyDown("m")) {
      bananaTime = true;
    }
    
    
    survivalTime = score + Math.ceil(frameCount/frameRate())
    
    if (keyDown("space") && monkey.y > 492) {
        monkey.velocityY = -16;
      }
    
    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score += 1;
    }
  }
  //reloading the ground
 
    if (keyDown("m")) {
      bananaTime = true;
      
    }
    
   if (bananaTime == true) {
     if (bananaGroup.isTouching(monkey)) {
        bananaGroup.destroyEach();
      }
   }
  
  
    if (obstacleGroup.isTouching(monkey) && bananaTime == false) {
      gameState = END;
    }
    
  
  
    if (gameState == END) {
      monkey.velocityY = 0;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
    }  
  
  
  
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  } 
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  drawSprites();
  stroke("white");
  fill("white");
  text("SCORE: ", 10, 15);
  text(score, 70, 15);
  text("SURVIVAL TIME: " + survivalTime, 10, 45);
  
}
  
function spawnBananas() {
  if (frameCount % 60 == 0) {
    banana = createSprite(600, 320, 20, 20);
    banana.velocityX = -(8 + (score/10));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    bananaGroup.add(banana)
    banana.depth = monkey.depth
    monkey.depth = monkey.depth + 1;

    banana.setCollider("rectangle", 0, 0, banana.height - 1.5, banana.widh - 1.5)
    
   
  }
}


function spawnObstacles() {
  if (frameCount % 120 == 0) {
    obstacle = createSprite(600, 510, 20, 20);
    obstacle.velocityX = -(8 + (score/10));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle)

    obstacle.setCollider("rectangle", 0, 0, monkey.height, monkey.width)
  }
}





