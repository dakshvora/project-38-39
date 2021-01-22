var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var obstacleGroup;

var trexCollided;

var play = 1;
var end = 0;
var gameStage = play;

var Score = 0;

var resrartImg,restart;
var gm,gameOver;

var jumpSound;
var cpSound;
var dieSound;

var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  trexCollided = loadImage("trex_collided.png");
  
  jumpSound = loadSound("jump.mp3");
  cpSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  
  restartImg = loadImage("restart.png");
  gm = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.x=width/2;
  trex.velocityX=4;
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
    
  cloudGroup = new Group();
  obstacleGroup = new Group();
  trex. setCollider("circle",0,15,10);
  trex.debug = false;
  
  trex.addAnimation("labelT",trexCollided);
  
  restart = createSprite(300,100,5,5);
  restart.addImage("labelre",restartImg)
  restart.scale = 0.3;
  
  gameOver = createSprite(300,75,5,5);
  gameOver.addImage("labelg",gm)
  gameOver.scale = 0.3;
  
}

function draw() {
  background(180);
  
  if(gameStage === play){
    camera.position.x= trex.x;
    //ground.x= camera.position.x;
    invisibleGround.x=camera.position.x;
    if (camera.position.x > ground.x+300){
    ground.x = camera.position.x;
   }
  
    Score = Score + Math.round(getFrameRate()/60);
    
    if(Score%100 === 0){
       cpSound.play();
       
       }
    
    text("Score =" + Score,camera.position.x+100,50);
    
    if(keyDown("space")&& trex.y > 170) {
    trex.velocityY = -13;
    jumpSound.play();
  }
  //console.log(trex.y);
    
  trex.velocityY = trex.velocityY + 0.75;
  
  
  //  ground.velocityX = -(5 + Score/100);
    
  spawnClouds();
  cacti();
   
    
    if(trex.isTouching(obstacleGroup)){
      gameStage = end;
      dieSound.play();
      }
  
    
  restart.visible = false;
  gameOver.visible = false; 
    
    
  } else if (gameStage === end){
    trex.changeAnimation("labelT",trexCollided);
    //ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.y = 160;
    obstacleGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
   
    restart.visible = true;
    gameOver.visible = true; 
    
    if(mousePressedOver(restart)){
        reset();
       }
  }
  
  
    
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}


function reset(){
 gameStage = play; 
 cloudGroup.destroyEach(); 
 obstacleGroup.destroyEach(); 
 Score = 0;
 trex.changeAnimation("running", trex_running);
}



function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(camera.position.x+300,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.8;
    cloud.velocityX = -(5 + Score/100);
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 220
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
   
  cloudGroup.add(cloud);
  }
}


function cacti(){

if (frameCount % 100 === 0) {
    var cactus = createSprite(camera.position.x+400,165,10,40);
    cactus.velocityX = -(5 + Score/100);
//choose1out6 cactus images  
  var rand = Math.round(random(1,6));
  
  switch(rand) {
    
case 1: cactus.addImage("label1",obstacle1);break;
case 2: cactus.addImage("label2",obstacle2);break;
case 3: cactus.addImage("label3",obstacle3);break;
case 4: cactus.addImage("label4",obstacle4);break;
case 5: cactus.addImage("label5",obstacle5);break;
case 6: cactus.addImage("label6",obstacle6);break;

default:break;
}
//assigning lifetime to the variable
cactus.lifetime = 220;
cactus.scale = 0.5;
obstacleGroup.add(cactus);

}
}
