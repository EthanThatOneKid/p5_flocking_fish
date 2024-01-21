// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

const debug = false;

const defaults = {
  alignmentCoeff: 1,
  cohesionCoeff: 1,
  separationCoeff: 1,
};

const flock = [];

let fishModel;
let alignSlider, cohesionSlider, separationSlider;

function preload() {
  fishModel = loadModel("fish.obj");
}

function setup() {
  createCanvas(600, 400, WEBGL);
  if (debug) {
    alignSlider = createSlider(0, 2, 1.5, 0.1);
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    separationSlider = createSlider(0, 2, 2, 0.1);
  }
  for (let i = 0; i < 300; i++) {
    flock.push(new Boid());
  }
}

let angle = 0;

function draw() {
  background(0);
  orbitControl(5);
  // drawFish(0, 0);

  push();
  translate(width * -0.5, height * -0.5, 0);
  for (let boid of flock) {
    boid.edges();
    const alignmentCoeff =
      (alignSlider && allignSlider.value()) || defaults.alignmentCoeff;
    const cohesionCoeff =
      (cohesionSlider && cohesionSlider.value()) || defaults.cohesionCoeff;
    const separationCoeff =
      (separationSlider && separationSlider.value()) ||
      defaults.separationCoeff;

    boid.flock(flock, alignmentCoeff, cohesionCoeff, separationCoeff);
    boid.update();
    boid.show();
  }

  if (debug) {
    let colors = [];
    colorMode(HSB, 255);
    for (let i = 0; i < flock.length; i += 3) {
      let r = map(flock[i].velocity.mag(), 0, 5, 0, 255);
      let g = map(flock[i + 1].velocity.mag(), 0, 5, 0, 255);
      let b = map(flock[i + 2].velocity.mag(), 0, 5, 0, 255);
      colors.push(color(r, g, b));
    }

    let w = width / colors.length;
    let h = 100;
    colors.sort((a, b) => hue(a) - hue(b));
    for (let i = 0; i < colors.length; i++) {
      let c = colors[i];
      fill(c);
      noStroke();
      rect(i * w, height - h, w, h);
    }
  }
  pop();
}
