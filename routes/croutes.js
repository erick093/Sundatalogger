module.exports = function(app) {
  var chartdata = require('../controllers/ccontrollers');


  // todoList Routes
  app.route('/find')
    .get(chartdata.list_all_data)
    .post(chartdata.create_a_data);

  // 
  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
