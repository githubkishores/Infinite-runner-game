var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var boy, boyRunning;
var dog, dogRunning;
var backGround;
var ground, invisibleGroundImg;
var obstaclesGroup, obstacle1, obstacle2;
var gameOverImg, restartImg;

function preload(){
  boyRunning=loadAnimation("assets/boy0.png","assets/boy1.png","assets/boy2.png","assets/boy3.png",
  "assets/boy4.png","assets/boy5.png","assets/boy6.png","assets/boy7.png");
  dogRunning=loadAnimation("assets/dog0.png","assets/dog1.png","assets/dog2.png","assets/dog3.png",
  "assets/dog4.png","assets/dog5.png","assets/dog6.png");
  backGroundImg=loadImage("assets/backGround.webp");
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  //groundImg = loadImage("assets/ground.jpg");
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    ground = createSprite(900,328, 2000,100);
    ground.addImage(backGroundImg);
    ground.scale=4.4

    invisibleGround = createSprite(700,500,1500,1);
    invisibleGround.visible = false;

    boy=createSprite(550,height-200);
    boy.addAnimation("boy_running", boyRunning);
    boy.scale=0.9;

    dog=createSprite(200,height-160);
    dog.addAnimation("dog_running", dogRunning);
    dog.scale=0.3;

    
    //backGround = createSprite(700, 530,1500,1);
    //backGround.addImage(groundImg);

    
    gameOver = createSprite(700,290);
    gameOver.addImage(gameOverImg);

    restart = createSprite(700,590);
    restart.addImage(restartImg);

    obstaclesGroup = createGroup();

    boy.setCollider("circle",0,0,40);
    boy.debug = false
    
    dog.setCollider("rectangle",0,0,700,dog.height);
    dog.debug = false;

    score=0;
}

function draw() {
    background("backGroundImg");
    textSize(32);
    stroke("red");
    text("score:"+ score, 1150,50);
    console.log("this is", gameState);

    if(gameState === PLAY){
      gameOver.visible = false;
      restart.visible = false;
      score = score + Math.round(frameCount/60);
      if(keyDown("space")&& boy.y >= 400) {
        boy.velocityY = -19;
      }
      ground.velocityX=-15
      if(ground.x<0){
        ground.x=width/6;
      }
      boy.velocityY = boy.velocityY + 0.8;
      if(keyDown("space")&& dog.y >= 100) {
      }
      dog.velocityY = dog.velocityY + 0.8
      if(obstaclesGroup.isTouching(boy)){
        gameState = END;
      }
      if(obstaclesGroup.isTouching(dog)){
        dog.velocityY = -12;
    }
      
    }
    

    if (gameState === END) {
      console.log("hey")
       gameOver.visible = true;
       restart.visible = true;
       boy.velocityY = 0;
       ground.velocityX=0;
       obstaclesGroup.setLifetimeEach(-1);
       obstaclesGroup.setVelocityXEach(0);
    }
    
    //ground.visible=true;
    if(boy.overlap(invisibleGround)){
      boy.collide(invisibleGround);
    }
    if(dog.overlap(invisibleGround)){
      dog.collide(invisibleGround);
    }
    spawnObstacles();
    drawSprites();
}

function spawnObstacles(){
  if (frameCount %120 === 0){
    var obstacle = createSprite(width+50,height-150,200,400);
    obstacle.velocityX = -15;
     var rand = Math.round(random(1,2));

     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       default: break;
     }           

     obstacle.scale = 0.3;
     obstacle.lifetime = 300;
     obstaclesGroup.add(obstacle);
  }
}