var mongoose = require('mongoose'),
  V_task = mongoose.model('V_data');
  A_task = mongoose.model('A_data');
  P_task = mongoose.model('P_data');
  E_task = mongoose.model('E_data');
  R_task = mongoose.model('R_data');

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





//
// exports.create_a_data = function(req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

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
