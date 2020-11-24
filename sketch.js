var tower, towerImage;
var climber,climberImage;
var door,doorImage;
var ghost,ghostImage;
var tower,towerImage;
var invisibleBlock,invisibleBlockGroup;
var Gamestate="PLAY"

function preload(){
climberImage=loadImage("climber.png")
towerImage=loadImage("tower.png")
doorImage=loadImage("door.png")
ghostImage=loadImage("ghost-standing.png")
doorGroup=new Group();
climberGroup=new Group();
invisibleBlockGroup=new Group();
}

function setup(){
createCanvas(600,600)

tower=createSprite(300,300,0,0);
tower.addImage(towerImage);
tower.velocityY=2;

ghost=createSprite(200,200,0,0);
ghost.addImage(ghostImage);
ghost.scale=0.4;

}

function draw(){

if(tower.y>400){
  tower.y=200;
}
if(Gamestate==="PLAY"){
  

if(keyDown("space")){
  ghost.velocityY=-5;
}
ghost.velocityY=ghost.velocityY+0.5;
if(keyDown("right_arrow")){
  ghost.x=ghost.x+3;
}
if(keyDown("left_arrow")){
  ghost.x=ghost.x-3;
}
if(climberGroup.isTouching(ghost)){
  ghost.velocityY=0;
}
console.log(tower.y);  
spawndoor();
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy();
  
  Gamestate="END"
}
drawSprites();
}
  if(Gamestate==="END"){
    fill("yellow");
    textSize(40);
    text("GameOver",250,250);
    
  }
}
function spawndoor(){
  if(frameCount%250===0){
    var door=createSprite(Math.round(random(100,400)),10,0,0)
    door.addImage(doorImage);
    door.lifetime=400;
    doorGroup.add(door);
    door.velocityY=2;

    var climber=createSprite(door.x,60,0,0)
    climber.addImage(climberImage);
    climber.lifetime=400;
    climber.velocityY=2;
    climberGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    var invisibleBlock=createSprite(door.x,70,climber.width,climber.height);
    invisibleBlockGroup.add(invisibleBlock); 
    invisibleBlock.velocityY=2;
    invisibleBlock.lifetime=400;
    invisibleBlock.visible=false;
  }
}