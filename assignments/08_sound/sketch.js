let birdsound;

function setup() {
  birdsound = loadSound('sample/birdsound.wav');
  createCanvas(720, 200);
  background(255, 0, 0);
}

function mousePressed() {
  if (birdsound.isPlaying()) {
    // .isPlaying() returns a boolean
    birdsound.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}