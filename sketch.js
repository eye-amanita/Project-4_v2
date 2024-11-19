let x;
let y;
let xspeed = 10;
let yspeed = 0;

let r;

let sound;
let amp;
let fft;
let fft16;

let time1 = 40000;

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

  x = random(width*.125, width-(width*.125));
  y = random(height*.125, height-(width*.125));
  
}

function draw() {
  background(0);
  let now = millis();

  let spectrum = fft.analyze();
  let spectrum16 = fft16.analyze();

  let level = amp.getLevel();
  level = map(level, 0, 1, 0, 100);

  let highFreq = map(spectrum[20],0,255,0,7);

  let freq12 = map(spectrum16[12],0,255,0,-width*.1);
  let freq13 = map(spectrum16[13],0,255,0,-width*.1);
  let freq14 = map(spectrum16[14],0,255,0,-width*.1);
  let freq15 = map(spectrum16[15],0,255,0,-width*.1);

  // ellipse(x, y, r*2, r*2);
  x += xspeed;
  y += yspeed;
  if (x > width - r || x < r) {
    xspeed = -xspeed;
  }
  if (y > height - r || y < r) {
    yspeed = -yspeed;
  }
 

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
  if (y > width/2){
  for (let i = 0; i < highFreq; i = i+1) {
    square(width*.0625+i*(width*.125),width*.0625,width*.0625);
  }
}  
// if (y < width/2){
//   for (let i = 0; i < highFreq; i = i+1) {
//     square(width*.0625+i*(width*.125),width-width*.0625,width*.0625);
//   }
// }

  push();
  translate(width/3,height/3);
  rotate(PI/2);
  noFill();

  stroke(255);
  strokeWeight(width*.004);
  
  
  strokeCap(SQUARE);
    beginShape();
  
    vertex(0,0)
    vertex(100,freq12);
    vertex(200,freq13);
    vertex(300,freq14);
    vertex(400,freq15);
    vertex(500,0);
    endShape();

  pop();
 
}

function mousePressed() {

  sound.play();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}