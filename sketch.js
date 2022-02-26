const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = []
// variables for boat animation
var boatAnimation=[]
var boatSpriteData
var boatSpriteSheet
// variables for broken boat animation because im cool like that !!
var brokenBoatAnimation=[]
var brokenBoatSpriteData
var brokenBoatSpriteSheet
// vairables for the water splash animation because i am cool ajajajja
var waterAnimation=[]
var waterSpriteData
var waterSpriteSheet

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpriteData=loadJSON("assets/boat/boat.json")
  boatSpriteSheet=loadImage("assets/boat/boat.png")
  brokenBoatSpriteData=loadJSON("assets/boat/brokenBoat.json")
  brokenBoatSpriteSheet=loadImage("assets/boat/brokenBoat.png")
  waterSpriteData=loadJSON("assets/waterSplash/waterSplash.json")
  waterSpriteSheet=loadImage("assets/waterSplash/waterSplash.png")

}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  // loading the boat animation images in the boatAnimation array one by one because im cool
  var boatFrames=boatSpriteData.frames 
  for (i=0;i<boatFrames.length;i++){
  var POS=boatFrames[i].position
  var img=boatSpriteSheet.get(POS.x,POS.y,POS.w,POS.h)
  boatAnimation.push(img)
  }
  // loading all the images of brokenboatin the brokenBoatAnimation one by one ebcause im not cool anymore idk what happened to me inni i ate a ham and cheese sandwich and got alot of fat because i  am fat teletubbie kid innit broski u get man once i like to enjoy a slushie but sometimes i dont because its too cold for my tonuge like bro its so addicted like coke thank you very much for ur time and patients bye now !! 
  var BrokenBoatFrames=brokenBoatSpriteData.frames 
  for (i=0;i<BrokenBoatFrames.length;i++){
  var POS=BrokenBoatFrames[i].position
  var img=brokenBoatSpriteSheet.get(POS.x,POS.y,POS.w,POS.h)
  brokenBoatAnimation.push(img)
  }
  // making the waster splash animation
  var waterSplashFrames=waterSpriteData.frames 
  for (i=0;i<waterSplashFrames.length;i++){
  var POS=boatFrames[i].position
  var img=waterSpriteSheet.get(POS.x,POS.y,POS.w,POS.h)
  waterAnimation.push(img)
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

 
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();



  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionBoat(i)
  }

  cannon.display();
}
function collisionBoat(index){
for (var i = 0; i < boats.length; i++){
if (balls[index]!== undefined && boats[i]!== undefined){
var collision=Matter.SAT.collides(balls[index].body, boats[i].body)
if (collision.collided){
boats[i].remove(i)
// removing only that ball which hit the boat because im cool ukuk ofc
World.remove(world,balls[index].body)
delete balls[index]

}
}
}
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate()
  // removing all the extra balls from the screen at every one second because im cool because i can and because i like to type fst 
  if (ball.body.position.y>height-50){
  ball.remove(index)
  }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position,boatAnimation);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
        boats[i].animate()
      } 
      else {
        boats[i]
      }
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60,boatAnimation);
    boats.push(boat);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
