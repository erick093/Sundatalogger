const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {mongoose} = require('./db/mongoose');
var Data = require('./models/data');
var mqtt =require('mqtt');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var client = mqtt.connect('mqtt://10.0.0.30:8883');
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//app.use(app.router);
    //app.use(express.logger());


app.use(express.static(__dirname + '/public'));


app.get('/',(req,res) => {
  res.sendFile('index.html');
});
app.post('/echo/json/', function(req, res) {
  console.log(req.body);
  res.json(req.body);
});
server.listen(3500, function(err){
  if(err) throw err;
  console.log("Server is Runnnig on port 3500a" );
});


//MQTT Handling
client.on('connect', function () {
  client.subscribe('panel1/voltage');
  client.subscribe('panel1/amp');
});

client.on('message', function (topic, message) {
  var topic1_re = /^panel1\/amp.*/;
  var topic2_re = /^panel1\/voltage.*/;
//Panel1 Amp
  if (topic.match(topic1_re)){
    console.log('topic: '+ topic);
    io.emit('panel1_A',{
      'topic':String(topic),
      'message':String(message)
    });
    var newData = new Data.A1_data({
      sensorID: topic,
      sensorVAL: message
    });
    newData.save().then((doc) => {
      //console.log(JSON.stringify(doc,undefined,2));
    }, (e) => {
      console.log('Unable to save Data',e);
    });
  }
//Panel1 Volts
  else if(topic.match(topic2_re)){
    console.log('topic: '+topic);
    io.emit('panel1_V',{
      'topic':String(topic),
      'message':String(message)
    });
    var newData = new Data.V1_data({
      sensorID: topic,
      sensorVAL: message
    });
    newData.save().then((doc) => {
      //console.log(JSON.stringify(doc,undefined,2));
    }, (e) => {
      console.log('Unable to save Data',e);
    });
  }
  //Panel2 Amp




});
