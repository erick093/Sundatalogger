module.exports = function(app) {
  var chartdata = require('../controllers/ccontrollers');


  // todoList Routes
  app.route('/find/V')
    .get(chartdata.list_all_V_data);
    //.post(chartdata.create_a_data);
  app.route('/find/A')
    .get(chartdata.list_all_A_data);
//.post(chartdata.create_a_data);
  app.route('/find/P')
    .get(chartdata.list_all_P_data);
  //.post(chartdata.create_a_data);


  app.route('/find/V/from/:from/to/:to')
    .get(chartdata.find_V_by_date);
  //
  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
  app.route('/find/A/from/:from/to/:to')
    .get(chartdata.find_A_by_date);

  app.route('/find/P/from/:from/to/:to')
    .get(chartdata.find_P_by_date);

};
