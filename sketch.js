//making global variables for monkey, ground, bananas, obstacles and background
var monkey, ground, background, stone, bananas;

//making global variables for images and animations
var monkeyMoving, stoneImg, bananaImg, backgroundImg;

//making the score variable
var score;

//making groups
var ObstaclesGroup, BananasGroup;

function preload(){
  //loading the monkey animation
  monkeyMoving=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_010.png");
  
  //loading the images
  stoneImg=loadImage("stone.png");
  bananaImg=loadImage("banana.png");
  backgroundImg=loadImage("jungle.jpg");
}

function setup() {
  //making the canvas
  createCanvas(800, 400);
  
  //making the sprites
  monkey = createSprite(50,350,10,10);
  monkey.addAnimation("anim", monkeyMoving);
  
  ground = createSprite(400,365,800,10);
  ground.visible = false;
  
  background = createSprite(400,200,10,10);
  background.addImage("bg", backgroundImg);
  background.VelocityX = -5
  
  //making the groups
  ObstacleGroup = new Group();
  BananaGroup = new Group();
}

function draw() {
  background(255);
  
  //making the ground infinite
  if(ground.x < 0){
    ground.x = ground.width/2
  }
  
  //making the monkey collide and jump
  monkey.collide(ground);
  
  if(monkey.y > 355 && keyDown("space")){
    monkey.veloxityY = -10;
  }
  monkey.velocityY +=0.5
  
  //revealing monkey's y position
  console.log(monkey.y);
  
  //spawning obstacles and bananas
  spawnBananas();
  spawnObstacles();
  
  //displaying sprites
  drawSprites();
}

function spawnBananas(){
  if(frameCount % 60 === 0){
    bananas = createSprite(800,240,10,10);
    bananas.y = round(random(220,280));
    bananas.velocityY = -5;
    bananas.addImage("fruits", bananaImg);
    
    //lifetime
    bananas.lifetime = 800/5
    
    BananaGroup.add(bananas)
    
    //adjusting the depth
    bananas.depth = monkey.depth;
    monkey.depth +=1;
  }
}

function spawnObstacles(){
  if(frameCount % 100 === 0){
    stone = createSprite(800,355,10,10);
    stone.velocityY = -5;
    stone.addImage("obstacles", stoneImg);
    
    //lifetime
    stone.lifetime = 800/5
    
    ObstaclesGroup.add(stone);
    
    //adjusting the depth
    stone.depth = monkey.depth;
    monkey.depth +=1;
  }
}