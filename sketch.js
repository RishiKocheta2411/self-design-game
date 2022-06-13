var player,playerImg;
var ground;
var enemy,enemyImg,enemyBulletImg; 
var enemies;
var backgroundimg,bg;
var bullet,bulletImg,bullets,buttet1;
var bulletleft = 70;
var gameState = "start"
var kills = 0
var game 

function preload(){
  backgroundimg = loadImage("assets/background.png")
  playerImg = loadAnimation("assets/character1.png","assets/character2.png","assets/character3.png","assets/character4.png"
  ,"assets/character5.png","assets/character6.png","assets/character7.png","assets/character8.png","assets/character9.png"
  ,"assets/character10.png")
  bulletImg = loadImage("assets/playerbullet.png")
  enemyImg = loadImage("assets/enemy.png")
  enemyBulletImg = loadImage("assets/enemybullet.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var bg = createSprite(displayWidth/2,displayHeight/2,20,20)
  bg.addImage(backgroundimg);
  bg.scale= 2.5;

  player = createSprite(50,displayHeight/2+120,50,50)
  player.addAnimation("running",playerImg); 
  player.visible = false

  game = new Game ()
   enemies = createGroup();

    bullets = createGroup();

   ground = createSprite(windowWidth/2,windowHeight/2 + 280,windowWidth,20);
   ground.visible = false

}

function draw() {
  background(0);
  textSize(20);
  fill ("black");
  text("KILLS : "+kills,50,50);
  game.display();
  game.handleStartButton();

  if (gameState === "play"){
   player.visible=true;
    
   if(keyDown("RIGHT_ARROW") && player.x <= windowWidth/2 + 400){
    player.x +=  3

  }

  if(keyDown("LEFT_ARROW") && player.x >= 50){
    player.x -=  3

  }

  if (keyDown("space")){
    player.velocityY= -8
  } player.velocityY = player.velocityY + 0.8


  if (mouseWentDown("leftButton")){
    shooting()
  }
  if(bulletleft === 0){
    gameState = "end"
  } 
  }
  
    player.collide(ground);
  spawnEnemy();
  drawSprites();

  if (gameState === "end"){
    textSize(90);
    fill("crimson")
    text("Game Over",windowWidth/2 - 200,windowHeight/2 - 70 );
    text("You Ran Out Of Bullets",windowWidth/2 - 420,windowHeight/2 + 50);
    player.destroy();
    bullets.destroyEach();
  }
}

function shooting(){
  //                                            shooting
        bullet = createSprite(player.x + 50,player.y + 15,10,10)
        bullet.addImage(bulletImg);
        bullet.velocityX = 20;
        bullet.scale = 0.1
        player.depth = bullet.depth;
        player.depth += 2;
        bullets.add(bullet);
        bulletleft = bulletleft - 1;
}

function spawnEnemy(){
  if(frameCount % 200 === 0){
    enemy = createSprite(windowWidth + 100,Math.round(random(200,windowHeight/2 + 200)),40,40)
    enemy.addImage(enemyImg);
    enemy.velocityX = -3
    enemy.scale = 0.2

    bullet1 = createSprite(enemy.x + 50,enemy.y + 15,10,10)
    bullet1.addImage(enemyBulletImg);
    bullet1.velocityX = -20;
    bullet1.scale = 0.1;
    enemy.depth = bullet1.depth;
    enemy.depth += 2;
  }
}




