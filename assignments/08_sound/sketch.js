let birdsound;

function setup() {
  birdsound = loadSound('https://lovemachinex.github.io/computional-art-spring2024/assignments/08_sound/sample');
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