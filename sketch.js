
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

const Constraint = Matter.Constraint; 
const Composites = Matter.Composites; 
const Composite = Matter.Composite;

let engine; 
let world;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var star;
var star2;
var star_img;
var star_empty;
var star_half;
var star_full;
var rope;
var fruit;
var ground;
var rope3;
var omnom, omnomImg;
var ground;
var higherground;
var food,foodImg;
var con;
var con2;
var rope;
var bubble,bubble_img;

function preload(){
  
  bk_song = loadSound('Cut The Rope 2.mp3');
  sad_sound = loadSound("Sad Trombone.mp3")
  cut_sound = loadSound('rope_cut.mp3');
  
  food = loadImage('candy.png');
  hungry = loadAnimation('omnom_hungry.gif');
  eat = loadAnimation("omnom_eating.gif");
  sad = loadAnimation("omnom_sad.png");
  star_img = loadImage('star.gif');
  empty_star =loadAnimation("star_empty.png");
  half_star =loadAnimation("star_half-full.png");
  full_stars =loadAnimation("star_full.png");

  
}

function setup() {
  createCanvas(600,800);

  bk_song.play();

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
  button2 = createImg('cut_btn.png');
  button2.position(450,90);
  button2.size(50,50);
  button2.mouseClicked(drop2);
  
  mute_btn = createImg('mute button.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);

  omnom = createSprite(200,height-80,100,100);
  omnom.scale = 0.2;
  omnom.addAnimation('hungry',hungry);
  omnom.addAnimation('eating',eat);
  omnom.addAnimation('sad',sad);
  
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,food);
  
  fruit = Bodies.circle(300,300,20);
  rope=new Rope(7,{x:245,y:30});
  Matter.Composite.add(rope.body,food);

  fruit_con = new Link(rope,food);
  fruit_con_2 = new Link(rope2,food);

  blower = createImg('baloon2.png');
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airBlow);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() 
{
  background(200);
  Engine.update(engine);

  push()
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop()

  rope.show()
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,omnom)==true){
    World.remove(engine.world,fruit);
    fruit = null
    omnom.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650){
    omnom.changeAnimation('sad');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
  }

  if(collide((fruit,star,20))==true){
    star.visible = false;
  }

  if(collide((fruit,star2,20))==true){
    star2.visible = false;
  }
}

function drop(){
  cut_sound.play()
  rope.break();
  fruit_con.dettach();
  fruit_con = null;
}

function drop2(){
  cut_sound.play()
  rope.break();
  fruit_con2.dettach();
  fruit_con2 = null;
}

function collide(body,sprite){
  if(body!=null){
    var d = dist(body,position.x,body.position.y,sprite.position.x,sprite.position.y);
     if(d<=80){
       return true;
     }
     else{
       return false;
     }
  }
}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else{
    bk_song.play();
  }
}

function airBlow(){
  matter.body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03}); 
}