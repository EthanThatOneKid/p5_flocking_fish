// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

const defaults = {
  alignmentCoeff: 2,
  cohesionCoeff: 1,
  separationCoeff: 1,
};
const topDown = false;

// flockSize must be a multiple of 3.
const flockSize = 90;
const flock = [];

let fishModel;
let alignSlider, cohesionSlider, separationSlider;

function preload() {
  fishModel = loadModel("fish.obj");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noDebugMode();

  for (let i = 0; i < flockSize; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(0);
  camera(
    0,
    width * -0.5,
    topDown ? 0.001 : height / 2 / tan(PI / 6),
    0,
    0,
    0,
    0,
    1,
    0
  );

  // orbitControl(5);

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
