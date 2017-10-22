const fs = require('fs');
const Network = require('neataptic').Network;
const Architect = require('neataptic').architect;
const mnist = require('mnist');

var net;

async function trainNet () {
  var set = mnist.set(1000).training;
  net = new Architect.Perceptron(28 * 28, 20, 10);
  
  console.log("starting training :)");  
  
  var results = await net.train(set, {
    log: 1,
    rate: 0.1,
    iterations: 1000
  });
    
  console.log("training ended :(");
  console.log(results);
  console.log(net.toJSON());
  fs.writeFileSync('network.json', JSON.stringify(net.toJSON()), 'utf8');
}

async function loadNet() {
  console.log("loading dataset"); 
  net = Network.fromJSON(JSON.parse(fs.readFileSync('network.json', 'utf8')));
  console.log("dataset loaded");
}

async function test() {
  var number = Math.random() * 10 | 0
  var input = mnist[number].get()
  var output = net.activate(input)
  var max = output.reduce((max, activation) => Math.max(max, activation), 0)
  var guess = output.indexOf(max)

  console.log('input:');
  console.log(input);
  console.log('number: '+ number + ' guess: ' + guess);
  
  setTimeout(test, 1000);
}

async function main() {
  await trainNet();
  //await loadNet();
  await test();
}

main();