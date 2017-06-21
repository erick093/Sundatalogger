var mongoose = require('mongoose'),
  V_task = mongoose.model('V_data');
  A_task = mongoose.model('A_data');
  P_task = mongoose.model('P_data');
  E_task = mongoose.model('E_data');
  R_task = mongoose.model('R_data');
  T_ext_task = mongoose.model('T_ext_data');
  T_int_task = mongoose.model('T_int_data');
  T_W_ext_task = mongoose.model('T_W_ext_data');
  T_W_int_task = mongoose.model('T_W_int_data');
  T_F_ext_task = mongoose.model('T_F_ext_data');
  T_F_int_task = mongoose.model('T_F_int_data');
  Fan_task = mongoose.model('Fan_data');
  Lights_task = mongoose.model('Lights_data');
  Solar_H_task = mongoose.model('Solar_H_data');
  AC_P_task = mongoose.model('AC_P_data');
  Set_Point_task = mongoose.model('Set_Point_data');
  Q_air_task = mongoose.model('Q_air_data');
  Q_water_task = mongoose.model('Q_water_data');
// V - API
exports.list_all_V_data = function(req, res) {
  V_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_V_by_date = function(req, res) {
  V_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// A - API
exports.list_all_A_data = function(req, res) {
  A_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_A_by_date = function(req, res) {
  A_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// P - API
exports.list_all_P_data = function(req, res) {
  P_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_P_by_date = function(req, res) {
  P_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// E - API
exports.list_all_E_data = function(req, res) {
  E_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_E_by_date = function(req, res) {
  E_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// R - API
exports.list_all_R_data = function(req, res) {
  R_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_R_by_date = function(req, res) {
  R_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// T_ext - API
exports.list_all_Text_data = function(req, res) {
  T_ext_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_Text_by_date = function(req, res) {
  T_ext_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};
// T_int - API
exports.list_all_Tint_data = function(req, res) {
  T_int_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_Tint_by_date = function(req, res) {
  T_int_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// T_W_int - API
exports.list_all_TWint_data = function(req, res) {
  T_W_int_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_TWint_by_date = function(req, res) {
  T_W_int_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// T_W_ext - API
exports.list_all_TWext_data = function(req, res) {
  T_W_ext_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_TWext_by_date = function(req, res) {
  T_W_ext_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// T_F_int - API
exports.list_all_TFint_data = function(req, res) {
  T_F_int_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_TFint_by_date = function(req, res) {
  T_F_int_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// T_F_ext - API
exports.list_all_TFext_data = function(req, res) {
  T_F_ext_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_TFext_by_date = function(req, res) {
  T_F_ext_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};
// Q_water - API
exports.list_all_Qw_data = function(req, res) {
  Q_water_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_Qw_by_date = function(req, res) {
  Q_water_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};
// Q_air - API
exports.list_all_Qa_data = function(req, res) {
  Q_air_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_Qa_by_date = function(req, res) {
  Q_air_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// Fan - API
exports.list_all_Fan_data = function(req, res) {
  Fan_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_Fan_by_date = function(req, res) {
  Fan_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};
// Set Point - API
exports.find_last_Set_Point = function(req, res) {
  Set_Point_task.findOne().sort({timestamp:-1}).exec(function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// Solar Heater - API
exports.list_all_Solarh_data = function(req, res) {
  Solar_H_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_Solarh_by_date = function(req, res) {
  Solar_H_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};
exports.find_last_Solarh = function(req, res) {
  Solar_H_task.findOne().sort({timestamp:-1}).exec(function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

// Lights - API
exports.list_all_Lights_data = function(req, res) {
  Lights_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_Lights_by_date = function(req, res) {
  Lights_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};
exports.find_last_Lights = function(req, res) {
  Lights_task.findOne().sort({timestamp:-1}).exec(function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};


// AC Power - API
exports.list_all_AC_P_data = function(req, res) {
  AC_P_task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.find_AC_P_by_date = function(req, res) {
  AC_P_task.find({timestamp: {"$gte": req.params.from, "$lt": req.params.to}}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};





//save Set Point
exports.save_Set_Point_data = function(req, res) {
  var new_data = new Set_Point_task({
    sensorVAL: req.params.val
  });
  new_data.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
//save TWint TEST TEST TEST TEST TEST!!!!!!!!!!!!!!!
exports.save_TWint_data = function(req, res) {
  var new_data = new T_W_int_task({
    sensorVAL: req.body.sensorVAL
  });
  new_data.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
// END TEST TEST TEST TEST TEST!!!!!
//save TWext
exports.save_TWext_data = function(req, res) {
  var new_data = new T_W_ext_task({
    sensorVAL: req.body.sensorVAL
  });
  new_data.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
//save TFint
exports.save_TFint_data = function(req, res) {
  var new_data = new T_F_int_task({
    sensorVAL: req.body.sensorVAL
  });
  new_data.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
//save TFext
exports.save_TFext_data = function(req, res) {
  var new_data = new T_F_ext_task({
    sensorVAL: req.body.sensorVAL
  });
  new_data.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
//save Qair
exports.save_Q_air_data = function(req, res) {
  var new_data = new Q_air_task({
    sensorVAL: req.body.sensorVAL
  });
  new_data.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
//save Qwater
exports.save_Q_water_data = function(req, res) {
  var new_data = new Q_water_task({
    sensorVAL: req.body.sensorVAL
  });
  new_data.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
//save shstatus
exports.save_sh_status_data = function(req, res) {
  var new_data = new Solar_H_task({
    sensorVAL: req.body.sensorVAL
  });
  new_data.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
//
// exports.read_a_data = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

//
// exports.update_a_data = function(req, res) {
//   Task.findOneAndUpdate(req.params.taskId, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

//
// exports.delete_a_data = function(req, res) {
//
//
//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };
