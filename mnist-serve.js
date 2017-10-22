const express = require('express')
const bodyparser = require('body-parser')
const fs = require('fs');
const Network = require('neataptic').Network;

const app = express()
const { PORT = 3000 } = process.env

app.use(bodyparser.json())
app.use(express.static('public'))

console.log("loading dataset"); 
var net = Network.fromJSON(JSON.parse(fs.readFileSync('network.json', 'utf8')));
console.log("dataset loaded");

app.get('/', function(req, res){
  res.redirect("mnist.html");
})

app.post('/checkNumber', function(req, res) {  
  var output = net.activate(req.body.input)
  var max = output.reduce((max, activation) => Math.max(max, activation), 0)
  var guess = output.indexOf(max)  
  res.send(guess.toString())
})

console.log('listening on %s', PORT)
app.listen(PORT)