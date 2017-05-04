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
  app.route('/find/E')
    .get(chartdata.list_all_E_data);
  //.post(chartdata.create_a_data);
  app.route('/find/R')
    .get(chartdata.list_all_R_data);
  //.post(chartdata.create_a_data);

  app.route('/find/V/from/:from/to/:to')
    .get(chartdata.find_V_by_date);
  app.route('/find/A/from/:from/to/:to')
    .get(chartdata.find_A_by_date);
  app.route('/find/P/from/:from/to/:to')
    .get(chartdata.find_P_by_date);
  app.route('/find/E/from/:from/to/:to')
    .get(chartdata.find_E_by_date);
  app.route('/find/R/from/:from/to/:to')
    .get(chartdata.find_R_by_date);
};
