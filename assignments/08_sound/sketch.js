let song;

function preload() {
  soundFormats('ogg', 'mp3');
  song = loadSound("https://lovemachinex.github.io/computional-art-spring2024/assignments/08_sound/sample");
}

function setup() {
  createCanvas(710, 200);
  song.play();
  background(0, 255, 0);
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
    background(255, 0, 0);
  } else {
    song.play(); 
    background(0, 255, 0);
  }
}