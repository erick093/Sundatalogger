const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3500;
var {mongoose} = require('./db/mongoose');
var Data = require('./models/data');
var mqtt =require('mqtt');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var client = mqtt.connect('mqtt://10.0.0.50:1883');
var bodyParser = require("body-parser");
// app.use(bodyParser.json());
// //app.use(app.router);
//     //app.use(express.logger());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./routes/croutes');
routes(app);

app.use(express.static(__dirname + '/public'));


app.get('/',(req,res) => {
  res.sendFile('index.html');
});
// app.post('/echo/json/', function(req, res) {
//   console.log(req.body);
//   res.json(req.body);
// });

//Query lastest Data on Connection
io.on('connection', (socket) => {
  socket.on('publish', function (data) {
      console.log('Publishing to '+data.topic + ': ' +data.payload);
      client.publish(data.topic,data.payload);
  });
  console.log('New user connected,sending lastest data');
  var d = new Date().getTime();
  Data.V_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest V: " + docs[0].sensorVAL );
    //console.log(docs.length);

    io.emit('last_V',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('panels_V',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.A_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest A: "  + docs[0].sensorVAL);
    io.emit('last_A',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
      io.emit('panels_A',{
        'topic':String(docs[i].sensorID),
        'message':String(docs[i].sensorVAL),
        'time' : docs[i].timestamp
      });
    }
  });

  Data.P_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest P: " +  docs[0].sensorVAL );
    io.emit('last_P',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
    for (var i = docs.length-1; i>-1; i--){
      io.emit('panels_P',{
        'topic':String(docs[i].sensorID),
        'message':String(docs[i].sensorVAL),
        'time' : docs[i].timestamp
      });
    }
  });
  Data.E_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest E: " + docs[0].sensorVAL );
    io.emit('last_E',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('panels_E',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.R_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest R: " + docs[0].sensorVAL );
    io.emit('last_R',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('panels_R',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.T_ext_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest T_ext: " + docs[0].sensorVAL );
    io.emit('last_temp_ext',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('temp_ext',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.T_int_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest T_int: " + docs[0].sensorVAL );
    io.emit('last_temp_int',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('temp_int',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.T_F_ext_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest TF_ext: " + docs[0].sensorVAL );
    io.emit('last_tfext',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('tfext',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.T_F_int_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest TF_int: " + docs[0].sensorVAL );
    io.emit('last_tfint',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('tfint',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.T_W_ext_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest TW_ext: " + docs[0].sensorVAL );
    io.emit('last_twext',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('twext',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.T_W_int_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest TW_int: " + docs[0].sensorVAL );
    io.emit('last_twint',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('twint',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.Fan_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest Fan status: " + docs[0].sensorVAL );
    io.emit('last_fan_status',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('fan_status',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.Solar_H_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest Solar Heater status: " + docs[0].sensorVAL );
    io.emit('last_solarh_status',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('solarh_status',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.Lights_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest Lights status: " + docs[0].sensorVAL );
    io.emit('last_lights_status',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>-1; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('lights_status',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.AC_P_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest AC Power: " + docs[0].sensorVAL );
    io.emit('last_acp',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>0; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('acp',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.Set_Point_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest Set Point: " + docs[0].sensorVAL );
    io.emit('last_SP',{
      'message':String(docs[0].sensorVAL)
    });
  });

});


server.listen(port, function(err){
  if(err) throw err;
  console.log("Server is Runnnig on port 3500" );
});



//MQTT Handling
client.on('connect', function () {
  client.subscribe('panels/voltage');
  client.subscribe('panels/amp');
  client.subscribe('panels/power');
  client.subscribe('panels/energy');
  client.subscribe('panels/radiation');
  client.subscribe('ac/power');
  client.subscribe('temp/exterior');
  client.subscribe('temp/interior');
  client.subscribe('temp/vinside');
  client.subscribe('temp/voutside');
  client.subscribe('temp/inwater');
  client.subscribe('temp/outwater');
  client.subscribe('control/fan');
  client.subscribe('control/lights');
  client.subscribe('control/solarheater');
});

//Testing stuff
// var d = new Date().getTime();
// Data.P_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
//   for (i = 0; i < docs.length; i++) {
//     //text += cars[i] + "<br>";
//     console.log(docs[i].sensorVAL);
// }
// });

client.on('message', function (topic, message) {
  var topic1_re = /^panels\/amp.*/;
  var topic2_re = /^panels\/voltage.*/;
  var topic3_re = /^panels\/power.*/;
  var topic4_re = /^panels\/energy.*/;
  var topic5_re = /^panels\/radiation.*/;
  var topic6_re = /^temp\/exterior.*/;
  var topic7_re = /^temp\/interior.*/;
  var topic8_re = /^control\/fan.*/;
  var topic9_re = /^control\/lights.*/;
  var topic10_re = /^ac\/power.*/;
  var topic11_re = /^temp\/vinside.*/;
  var topic12_re = /^temp\/voutside.*/;
  var topic13_re = /^temp\/inwater.*/;
  var topic14_re = /^temp\/outwater.*/;
  var topic15_re = /^control\/solarheater.*/;
  // console.log("topic voltage: "+  topic2_re);
  // console.log("topic energy: "+  topic4_re);
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
    io.emit('last_A',{
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
    io.emit('last_V',{
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
    io.emit('last_P',{
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
//Panels Energy
  else if(topic.match(topic4_re)){
    console.log('topic: '+topic);
    var newData = new Data.E_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('panels_E',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_E',{
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
  //Panels Radiation
  else if(topic.match(topic5_re)){
    console.log('topic: '+topic);
    var newData = new Data.R_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('panels_R',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_R',{
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
  //Outside Temp
  else if(topic.match(topic6_re)){
    console.log('topic: '+topic);
    var newData = new Data.T_ext_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('temp_ext',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_temp_ext',{
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

  //Inside Temp
  else if(topic.match(topic7_re)){
    console.log('topic: '+topic);
    var newData = new Data.T_int_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('temp_int',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_temp_int',{
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

  //Fan Status
  else if(topic.match(topic8_re)){
    console.log('topic: '+topic);
    var newData = new Data.Fan_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('fan_status',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_fan_status',{
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

  //Lights Status
  else if(topic.match(topic9_re)){
    console.log('topic: '+topic);
    var newData = new Data.Lights_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('lights_status',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_lights_status',{
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

  //AC Power
  else if(topic.match(topic10_re)){
    console.log('topic: '+topic);
    var newData = new Data.AC_P_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('acp',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_acp',{
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

  //T Fan #2 inside
  else if(topic.match(topic11_re)){
    console.log('topic: '+topic);
    var newData = new Data.T_F_int_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('tfint',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_tfint',{
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

  //T Fan #2 outside
  else if(topic.match(topic12_re)){
    console.log('topic: '+topic);
    var newData = new Data.T_F_ext_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('tfext',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_tfext',{
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

  //T Water inside
  else if(topic.match(topic13_re)){
    console.log('topic: '+topic);
    var newData = new Data.T_W_int_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('twint',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_twint',{
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

  //T Water inside
  else if(topic.match(topic14_re)){
    console.log('topic: '+topic);
    var newData = new Data.T_W_ext_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('twext',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_twext',{
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

  //Solar Heater
  else if(topic.match(topic15_re)){
    console.log('topic: '+topic);
    var newData = new Data.Solar_H_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('solarh_status',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_solarh_status',{
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
