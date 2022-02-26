class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.speed=0.05
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.animation=[this.image]
    this.trajectory = [];
    this.isSink=false
    World.add(world, this.body);
  }
  animate(){
    this.speed=this.speed+0.05
  }

  shoot() {
     var newAngle = cannon.angle - 28;
    newAngle = newAngle *(3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
  }
  remove(index){
    this.isSink=true
    Matter.Body.setVelocity(this.body,{x:0,y:0})
    this.animation=waterAnimation
    this.speed=0.05
    //setTimeout function executes a code after a certain time interval because im cool like that ofc
    setTimeout(()=>{
    //removing the cannonballs from the world 
    World.remove(world, this.body)
  // removing the boats from the cannonballs array
  delete balls[index]
    } , 1000)
    }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index=floor(this.speed%this.animation.length)

    push();
    translate(pos.x,pos.y)
    rotate(angle)
    imageMode(CENTER);
    image(this.animaiton[index], 0,0, this.r, this.r);
    pop();

    if (this.body.velocity.x > 0 && pos.x > 10 && !this.isSink) {
      var position = [pos.x, pos.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}
