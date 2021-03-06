const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3500;
var {mongoose} = require('./db/mongoose');
var Data = require('./models/data');
var User = require('./models/user');
var url = require('url');
var mqtt =require('mqtt');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var client = mqtt.connect('mqtt://localhost:1883');
var bodyParser = require("body-parser");
var path = require('path');
//new things
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
//new things

//pasport
// var User = require('./models/user');
// var cookieParser = require('cookie-parser');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// app.use(cookieParser());
// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));
//
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// app.use(passport.initialize());
// app.use(passport.session());
//passport end


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/croutes');

routes(app);


app.use(express.static(__dirname + '/public'));


app.get('/',(req,res) => {
  res.sendFile('index.html');
});

//new data
app.get('/register', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/public/register.html'));
});

app.post('/register', function (req, res, next) {

  if (req.body.email &&
    req.body.username &&
    req.body.password ) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/control');
      }
    });
  }
});

app.post('/login', function (req, res, next) {
  if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/control');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  });

app.get('/control', function (req, res, next) {
User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error('Not authorized! Go back!');
        err.status = 400;
        return res.sendFile(path.join(__dirname + '/public/login.html'));
        //return next(err);
      } else {
        //return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        return res.sendFile(path.join(__dirname + '/private/control.html'));
      }
    }
  });
});
//new data

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

  Data.Q_air_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest Q air data: " + docs[0].sensorVAL );
    io.emit('last_q_air',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>0; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('q_air',{
          'topic':String(docs[i].sensorID),
          'message':String(docs[i].sensorVAL),
          'time' : docs[i].timestamp
        });
      }
  });

  Data.Q_water_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest Q water data: " + docs[0].sensorVAL );
    io.emit('last_q_water',{
      'topic':String(docs[0].sensorID),
      'message':String(docs[0].sensorVAL),
      'time' : docs[0].timestamp
    });
      for (var i = docs.length-1; i>0; i--) {
        //console.log('volts:'+docs[i].sensorVAL);
        io.emit('q_water',{
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

  Data.Mode_data.find({timestamp: {$lt: d }}).sort({timestamp: -1}).limit(10).exec((err, docs) => {
    if (err){
      console.log("Error getting Data from DB");
      return
    }
    console.log("Lastest Mode data: " + docs[0].sensorVAL );
    io.emit('last_Mode',{
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
  client.subscribe('panels/rdif');
  client.subscribe('panels/rdir');
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
  client.subscribe('q/water');
  client.subscribe('q/air');
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
  var topic16_re = /^q\/water.*/;
  var topic17_re = /^q\/air.*/;
  var topic18_re = /^panels\/rdif.*/;
  var topic19_re = /^panels\/rdir.*/;

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

  //Q_water
  else if(topic.match(topic16_re)){
    console.log('topic: '+topic);
    var newData = new Data.Q_water_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('q_water',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_q_water',{
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

  //Q_air
  else if(topic.match(topic17_re)){
    console.log('topic: '+topic);
    var newData = new Data.Q_air_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('q_air',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_q_air',{
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
  //R_dif
  else if(topic.match(topic18_re)){
    console.log('topic: '+topic);
    var newData = new Data.Rdif_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('panels_Rdif',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_Rdif',{
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
  //R_dir
  else if(topic.match(topic19_re)){
    console.log('topic: '+topic);
    var newData = new Data.Rdir_data({
      sensorID: topic,
      sensorVAL: message
    });
    io.emit('panels_Rdir',{
      'topic':String(topic),
      'message':String(message),
      'time': newData.timestamp
    });
    io.emit('last_Rdir',{
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
module.exports.io=io;
