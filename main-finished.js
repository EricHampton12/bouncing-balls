// variable for ball count
var para = document.querySelector('p');
var count = 0;

// setup canvas
var para = document.querySelector('p');
var count = 0;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// speeding up evil circles
var speedEvils = 7;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// define Ball constructor

function Shape(x, y, velX, velY, color, size, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.exists = exists;
}

function Ball(x, y, velX, velY, color, size, exists){
    Shape.call(this, x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
}
//controlKeys indicates movement(left-right, up-down)
function EvilCircle(x, y, color, controlKeys, exists){
    Shape.call(this, x, y, speedEvils, exists);
    this.color = color;
    this.size = 10;
    this.controlKeys = controlKeys;
    this.controlKeysPressed = [];
    this.score = 0;
}

//EvilCircle movement
EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function(){
    if((this.x + this.size)>= width){
        this.x = width - this.size;
    }
    if((this.x - this.size) <= 0){
        this.x = this.size
    }
    if((this.y + this.size)>= height){
        this.y = height - this.size;
    }
    if((this.y + this.size) <= 0){
        this.y = this.size;
    }
}

EvilCircle.prototype.update = function(){
    for( var k = 0; k < this.controlKeysPressed.length; k++){
        var key= this.controlKeysPressed[k];

        if(key === this.controlKeys[0]){
            this.x -= this.velX;
        }else if(key === this.controlKeys[1]){
            this.x += this.velX;
        }else if(key === this.controlKeys[2]){
            this.y -= this.velY;
        }else {
            this.y += this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function() {
    for(var j = 0; j < balls.length; j++){
        if(balls[j].exists) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < this.size + balls[j].size) {
                balls[j].exists = false;
                this.score++;
            }
        }
    }
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
}


// evil object create

var controlKeys = EvilCircle;
var controlKeys = [];

document.addEventListener('keydown', pressed);
function pressed(e) {
    var key = e.keyCode;
    if(controlKeys.includes(key) && ! (controlKeys.includes(key))){
        controlKeysPressed.push(key);
    }
}

//removes keys when released
document.addEventListener('keyup', released);
function released(e) {
    var key = e.keyCode;

    if(controlKeysPressed.includes(key)){
        controlKeysPressed = controlKeysPressed.filter(item => item != key);
    }
}




// define array to store balls and populate it

var balls = [];

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0,0,width,height);
}

while(balls.length < 25) {
  var size = random(10,20);
  var ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  balls.push(ball);

  for(var i = 0; i < balls.length; i ++){
      if (balls[i].exists){
          balls[i].draw();
          balls[i].update();
          balls[i].collisionDetect();
      }
  }

  function EvilCircle(){
  EvilCircle.draw();
  EvilCircle.checkBounds();
  EvilCircle.collisionDetect;
  


  if(controlKeysPressed.length > 0) {
      var list1 = [];
      for (var k = 0; k < controlKeysPressed.length; k++){
            var key = controlKeysPressed[k];
            if (evilCircle1.controlKeys.includes(key)){
                list1.push(key);
            }
      }
    }

    evilCircle1.controlKeysPressed = list1;
    evilCircle1.update();
    

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  var size = 0;
  while(balls.length < 25){
      size - random(10,20);
      var ball = new Ball(
          random(0 + size,width - size),
          random(0 + size, height - size),
          random(-7,7),
          random(-7,7),
          true,
      )
  }

  for(var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

  } 
}loop();