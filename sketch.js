let x;
let y;
let xspeed = 10;
let yspeed = 0;

let r;

let sound;
let amp;
let fft;
let fft16;
let bounceOrientation;
let bounceBoundLower;
let bounceBoundUpper;

let time1 = 40000;

let counter = 0;


function preload() {
  sound = loadSound("Proj4_3 (Urgent Drone).mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  amp = new p5.Amplitude();
  sound.connect(amp);

  fft = new p5.FFT(0,32);
  fft16 = new p5.FFT(0,16);
  fft.setInput(sound);
  fft16.setInput(sound);

  r = width*.16;

  bounceOrientation = random(['left', 'right']);
  
  if (bounceOrientation == 'left'){
    x = width/3;
    y = random(height*.2, height-(width*.2));
  }

  if (bounceOrientation == 'right'){
    x = random(width/3.5+2*r, width-(width*.125)-2*r);
    y = random(height*.2, height-(width*.2));
  }
  
  
  print(bounceOrientation,x,y);
  
}

function draw() {
  background(0);
  let now = millis();

  let spectrum = fft.analyze();
  let spectrum16 = fft16.analyze();

  let level = amp.getLevel();
  level = map(level, 0, 1, 0, 100);

  let highFreq = map(spectrum[20],0,255,0,7);

  let freq12 = map(spectrum16[12],0,255,0,width*.1);
  let freq13 = map(spectrum16[13],0,255,0,width*.1);
  let freq14 = map(spectrum16[14],0,255,0,width*.1);
  let freq15 = map(spectrum16[15],0,255,0,width*.1);

  let refreshSpeed = int(map(spectrum16[7],0,255,20,1));
  let refreshSpeed2 = int(map(spectrum16[4],0,255,20,1));
 

  if (bounceOrientation == 'left'){
    bounceBoundLower = 1+r;
    bounceBoundUpper = width-(width/3.5)-r;
  }
  if (bounceOrientation == 'right'){
    bounceBoundLower = width/3.5+r;
    bounceBoundUpper = width-1.5*r;
  }
  // fill(255,0,0);
  // ellipse(x, y, r*2, r*2);
  fill(255);
  x += xspeed;
  y += yspeed;
  if (x > bounceBoundUpper || x < bounceBoundLower ) {
    xspeed = -xspeed;
  }
  
 
  //AMPLITUDE SCATTER
  for (let i = 0; i < level; i = i+1) {
        let xBound1 = random(.001,.2);
        let xBound2 = random(.001,.2);
        let pointScatterX = random (-width*xBound1, width*xBound2);
        let yBound1 = random(.001,.2);
        let yBound2 = random(.001,.2);

        let pointScatterY = random (-height*yBound1, height*yBound2);
          fill(255);
          let scale = (random(.0001,.08));
          fill(255);
          strokeWeight(0);
          square(x+pointScatterX,y+pointScatterY,width*scale);
  }

  //SEQUENCER PULSE

  if (y > height/2 ){
  for (let i = 0; i < highFreq; i = i+1) {
    square(width*.0625+i*(width*.125),height*.0625,width*.0625);
  }
}  else {
  for (let i = 0; i < highFreq; i = i+1) {
    square(width*.0625+i*(width*.125),height-(height*.125),width*.0625);
  }
}

//UPPER FREQ LINE
if (y > height-(height*(1/3)) || bounceOrientation == 'left'){
  push();
  translate(width-width/12,height/16);
  scale(-1,1,1);
  noFill();

  stroke(255);
  strokeWeight(width*.0015);
  
  
  strokeCap(SQUARE);
    beginShape();
  
    vertex(0,0)
    vertex(freq12,height*.11);
    vertex(freq13,(height*.11)*2);
    vertex(freq14,(height*.11)*3);
    vertex(freq15,(height*.11)*4);
    vertex(0,(height*.11)*5);
    endShape();

  pop();
} else {
  push();
  translate(width/8,height/5);
  noFill();

  stroke(255);
  strokeWeight(width*.0015);
  
  
  strokeCap(SQUARE);
    beginShape();
  
    vertex(0,0)
    vertex(freq12,height*.12);
    vertex(freq13,(height*.12)*2);
    vertex(freq14,(height*.12)*3);
    vertex(freq15,(height*.12)*4);
    vertex(0,(height*.12)*5);
    endShape();

  pop();
}
if (y > height/2){
  drawSequencer(refreshSpeed, bounceBoundLower, y - (y/2));
}
if (y < height/2){
  drawSequencer(refreshSpeed, bounceBoundLower, y + ((height-y)/2));
}


}

function keyPressed() {
if (key == ' '){
  sound.play();
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawSequencer(refreshSpeed,sequencerX,sequencerY){
  
push();
translate(sequencerX,sequencerY)
  for(let i = 0; i < 2; i++ ){
    for(let j = 0; j < 3; j++ ){
    square(0+(width/16)*j,0+(width/16)*i, width/20);
    }
  }

  if (frameCount % refreshSpeed == 0) {
    counter++;
  }

  if (counter > 5){
    counter = 0;
  }

  if (counter == 0){
    fill(0);
    square(0,0, width/20);
  } 
  else if (counter == 1){
    fill(0);
    square(width/16,0, width/20);
  }
  else if (counter == 2){
    fill(0);
    square((width/16)*2,0, width/20);
  }
  else if (counter == 3){
    fill(0);
    square(0,width/16, width/20);
  }
  else if (counter == 4){
    fill(0);
    square(width/16, width/16, width/20);
  }
  else if (counter == 5){
    fill(0);
  

    square((width/16)*2, width/16, width/20);
  }
  print(refreshSpeed);
  pop();
}