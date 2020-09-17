var monkey,monkey_running;
var bananaGroup,bananaImg
var obstacleGroup,obstacleImg;
var back,backImg;
var score;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
   backImg = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg = loadImage("banana.png");
  
  obstacleImg = loadImage("stone.png");

}

function setup() {
  createCanvas(400, 400);
  
  back = createSprite(200,200,400,400);
  back.addImage("jungle",backImg);
  back.velocityX = -4;
  back.x = back.x/2;
  
  monkey = createSprite(50,380,20,30);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,383,400,10)
  ground.visible = false;
  
  score = 0;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);
  
  monkey.collide(ground);
  
  if (gameState === PLAY){
    
    if (back.x < 0){
      back.x = back.width/2;
    }
    
    if (keyDown("space") && monkey.y >= 314){
      monkey.velocityY = -17;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnBanana();
    
    spawnObstacles();
    
    if (bananaGroup.isTouching(monkey)){
    
      bananaGroup.destroyEach();
      score = score + 2;
    }
    
    if (obstacleGroup.isTouching(monkey) && monkey.scale === 0.1){
      gameState = END;
    }
    
    else if (obstacleGroup.isTouching(monkey) && monkey.scale >= 0.1){
      obstacleGroup.destroyEach();
      monkey.scale = 0.1;
      score = score - 10;
    }
  }
  
  else if (gameState === END){
  
    back.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

  }
  
  switch(score) {
      case 10: monkey.scale = 0.12;
              break;
      case 20: monkey.scale = 0.14;
              break;
      case 30: monkey.scale = 0.16;
              break;
      case 40: monkey.scale = 0.18;
              break;
              
      default: break;
    }
  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,300,50);
  
}

function spawnBanana(){
  if(frameCount % 120 === 0){
    var banana = createSprite(400,120,20,20);
    banana.addImage(bananaImg);
    banana.y = random(120,200);
    banana.scale = 0.06;
    banana.velocityX = -4;
    banana.lifetime = 100;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    var stone = createSprite(400,355,50,50);
    stone.addImage(obstacleImg);
    stone.scale = 0.1;
    stone.velocityX = -4;
    stone.lifetime = 134;
    
    obstacleGroup.add(stone);
  }
}