var eatS,obsS,bS;   
var monkey , monkey_running
var banana ,bananaImage, obs, obsImage;
var foodGrp, obsGrp;
var score = 0;
var dcore = 0;
var gameState = "play";
var ground,groundIMG;

function preload(){
  bS = loadSound("ba.m4a");
  eatS = loadSound("bananaS.m4a");
  obsS = loadSound("s2 f.mp3");
  obsImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  groundIMG = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup(){
  createCanvas(windowWidth,windowHeight);
   bS.loop();
    ground = createSprite(windowWidth/2,windowHeight/2,windowWidth+600,windowHeight);
    ground.addImage(groundIMG);
  ground.scale = 1;
  groundIMG.depth = 0;
  monkey = createSprite(50,windowHeight - 200,20,20);
  monkey.addAnimation("xc",monkey_running);
  monkey.scale = 0.13;
  monkey.depth = 1;
  fGround = createSprite(windowWidth/2,windowHeight-150,windowWidth,20);
  foodGrp = new Group();
  obsGrp = new Group();

}


function draw() {
  background("white");
  
  fGround.visible = false;
  monkey.collide(fGround);
  
  if(gameState === "play"){

   
    ground.velocityX = -4;
    if(ground.x<0){
      ground.x = windowWidth/2+600;
    }
    
  if(mousePressedOver(monkey)&&monkey.y>windowHeight/2||keyDown("space")&&monkey.y>windowHeight/2){
  monkey.velocityY = -20
  }
  monkey.velocityY = monkey.velocityY+0.99
    
  if(frameCount%100 === 0){
    spawnFood();
  }
  if(frameCount%300 === 0){
    spawnObs();
  }
    if(monkey.isTouching(foodGrp)){
      foodGrp.destroyEach();
      eatS.play();
      score = score+1;
      monkey.scale = monkey.scale+0.05;
    }
    if(monkey.isTouching(obsGrp)){
      obsGrp.destroyEach();
      obsS.play();
      dcore = dcore+1;
      monkey.scale = monkey.scale-0.07;
    }
  if(dcore === 2){
    gameState = "end";
  }
   
  }

  
 drawSprites();
 if(gameState === "end"){
      monkey.visible = false;
      ground.velocityX = 0;
      foodGrp.destroyEach();
      obsGrp.destroyEach();
      fill("white");
      textSize(60);
      text("GAME OVER",windowWidth/2 -150,windowHeight/2);
    }
  fill("white");
  textSize(20);
  text("bananas ate = "+score,windowWidth/4-50,60);
  text("stones hit = "+dcore,windowWidth - (windowWidth/4+50),60);
}



function spawnFood(){
  banana = createSprite(windowWidth+20,20,20,20);
  banana.velocityX = -8;
  banana.scale = 0.2;
  banana.y = random(0,windowHeight/2);
  banana.addImage(bananaImage);
  foodGrp.add(banana);
}
function spawnObs(){
  obs = createSprite(windowWidth+20,windowHeight - 175,20,20);
  obs.scale = 0.1;
  obs.velocityX = -7;
  obs.addImage(obsImage);
  obsGrp.add(obs);
}


