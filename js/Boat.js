class Boat {
  constructor(x, y, width, height, boatPos,boatAnimation) {
  
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;
    this.animation = boatAnimation
    this.image = loadImage("./assets/boat.png");
    this.speed=0.05
    this.boatPosition = boatPos;
    World.add(world, this.body);
  }
  animate(){
    this.speed=this.speed+0.05
  }
  remove(index){
  this.animation=brokenBoatAnimation
  this.width=300
  this.height=300
  //setTimeout function executes a code after a certain time interval because im cool like that ofc
  setTimeout(()=>{
  //removing the boat from the world 
  World.remove(world,boats[index].body)
// removing the boats from the boats array
delete boats[index]
  } ,2000)
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    //var index= Math.round(random(0,3))
    var index= floor(this.speed% this.animation.length)
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.boatPosition, this.width, this.height);
    pop();
  }
}
