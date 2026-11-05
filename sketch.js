let beat;
let isStopped = true;

function setup() {
 createCanvas(windowWidth, windowHeight);

  // Create a p5.MediaElement using createAudio().
  beat = createAudio('cocktaildetormentas.mp3');
}

// Adjust playback when the user presses the mouse.
function mousePressed() {
  if (isStopped === true) {
    // If the beat is stopped, play it.
    beat.play();
    isStopped = false;
  } else {
    // If the beat is playing, stop it.
    beat.stop();
    isStopped = true;
  }
}