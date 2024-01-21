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
const flockSize = 90;
const flock = [];

let fishModel;
let alignSlider, cohesionSlider, separationSlider;

function preload() {
  fishModel = loadModel("fish.obj");
}

function setup() {
  createCanvas(600, 400, WEBGL);
  perspective(PI / 3.0, width / height, 0.1, 500);

  debugMode();

  for (let i = 0; i < flockSize; i++) {
    flock.push(new Boid());
  }
}

let angle = 0;

function draw() {
  background(0);
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
