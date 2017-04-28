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

//Query lastest Data on Connection
io.on('connection', (socket) => {
  console.log('New user connected,sending lastest data');
  var d = new Date().getTime();
  Data.V_data.findOne({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(1).exec((err, docs) => {
    //console.log(docs);
    console.log("Lastest V: " + docs.sensorVAL );
    io.emit('panels_V',{
      'topic':String(docs.sensorID),
      'message':String(docs.sensorVAL),
      'time' : docs.timestamp
    });
  });
  Data.A_data.findOne({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(1).exec((err, docs) => {
    console.log("Lastest A: "  + docs.sensorVAL);
    io.emit('panels_A',{
      'topic':String(docs.sensorID),
      'message':String(docs.sensorVAL),
      'time' : docs.timestamp
    });
  });
  Data.P_data.findOne({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(1).exec((err, docs) => {
    console.log("Lastest P: " +  docs.sensorVAL );
    io.emit('panels_P',{
      'topic':String(docs.sensorID),
      'message':String(docs.sensorVAL),
      'time' : docs.timestamp
    });
  });
});

server.listen(3500, function(err){
  if(err) throw err;
  console.log("Server is Runnnig on port 3500" );
});



//MQTT Handling
client.on('connect', function () {
  client.subscribe('panels/voltage');
  client.subscribe('panels/amp');
  client.subscribe('panels/power');
});

//Testing stuff
var d = new Date().getTime();
Data.P_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
  for (i = 0; i < docs.length; i++) {
    //text += cars[i] + "<br>";
    console.log(docs[i].sensorVAL);
}

});

client.on('message', function (topic, message) {
  var topic1_re = /^panels\/amp.*/;
  var topic2_re = /^panels\/voltage.*/;
  var topic3_re = /^panels\/power.*/;
  //Panels Amp
  if (topic.match(topic1_re)){
    console.log('topic: '+ topic);
    var newData = new Data.A_data({
      sensorID: topic,
      sensorVAL: message
    });
    //console.log("TESTEOO: "+ newData.timestamp);
    io.emit('panels_A',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    newData.save().then((doc) => {
      //console.log(JSON.stringify(doc,undefined,2));
    }, (e) => {
      console.log('Unable to save Data',e);
    });
  }
  //Panels Volts
  else if(topic.match(topic2_re)){
    console.log('topic: '+topic);
    var newData = new Data.V_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('panels_V',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });

    newData.save().then((doc) => {
      //console.log(JSON.stringify(doc,undefined,2));
    }, (e) => {
      console.log('Unable to save Data',e);
    });
  }
  //Panels Power
  else if(topic.match(topic3_re)){
    console.log('topic: '+topic);
    var newData = new Data.P_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('panels_P',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });

    newData.save().then((doc) => {
      //console.log(JSON.stringify(doc,undefined,2));
    }, (e) => {
      console.log('Unable to save Data',e);
    });
  }



});
