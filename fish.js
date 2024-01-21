function drawFish(x, y) {
  normalMaterial();
  push();
  translate(x, y, 0);
  rotate(PI);
  scale(10);
  model(fishModel);
  pop();
}
