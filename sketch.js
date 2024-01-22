// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

const defaults = {
  alignmentCoeff: 2,
  cohesionCoeff: 1,
  separationCoeff: 1,
};

// flockSize must be a multiple of 3.
const flockSize = 102;
const flock = [];

let fishModel;
let alignSlider, cohesionSlider, separationSlider;

function setupCamera() {
  camera(
    0,
    width * -0.33,
    height / 2 / tan(PI / 6),
    0,
    0,
    width * 0.5,
    0,
    1,
    0
  );
}

function preload() {
  fishModel = loadModel("fish.obj");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  setupCamera();
  noDebugMode();

  for (let i = 0; i < flockSize; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background("#000055");
  orbitControl(5);

  for (let boid of flock) {
    boid.edges();
    const alignmentCoeff = defaults.alignmentCoeff;
    const cohesionCoeff = defaults.cohesionCoeff;
    const separationCoeff = defaults.separationCoeff;

    boid.flock(flock, alignmentCoeff, cohesionCoeff, separationCoeff);
    boid.update();
    boid.show();
  }
}

// Resize the canvas when the
// browser's size changes.
function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  resizeCanvas(600, 600);
  setupCamera();
}
