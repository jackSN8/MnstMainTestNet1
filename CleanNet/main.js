
let brain;

function setup()
{
  createCanvas(500,500);
  brain  = new neuralNet(2,2,1);
  brain.feedForward([0,1]);
}

function draw()
{
  background(12);
}
