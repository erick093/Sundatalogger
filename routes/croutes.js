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
  app.route('/find/Text')
    .get(chartdata.list_all_Text_data);
  //.post(chartdata.create_a_data);
  app.route('/find/Tint')
    .get(chartdata.list_all_Tint_data);
  app.route('/find/Fan')
    .get(chartdata.list_all_Fan_data);
  app.route('/find/Lights')
    .get(chartdata.list_all_Lights_data);
  app.route('/find/ACP')
    .get(chartdata.list_all_AC_P_data);


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
  app.route('/find/Text/from/:from/to/:to')
    .get(chartdata.find_Text_by_date);
  app.route('/find/Tint/from/:from/to/:to')
    .get(chartdata.find_Tint_by_date);
  app.route('/find/Fan/from/:from/to/:to')
    .get(chartdata.find_Fan_by_date);
  app.route('/find/Lights/from/:from/to/:to')
    .get(chartdata.find_Lights_by_date);
  app.route('/find/ACP/from/:from/to/:to')
    .get(chartdata.find_AC_P_by_date);


  app.route('/find/last/Lights')
    .get(chartdata.find_last_Lights);
  app.route('/find/last/SP')
    .get(chartdata.find_last_Set_Point);


  app.route('/insert/setpoint/:val')
    .post(chartdata.save_Set_Point_data);
};
