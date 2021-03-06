
module.exports = function(app) {
  var chartdata = require('../controllers/ccontrollers');
  // var auth = require('../controllers/AuthController')
  // app.route('/register')
  //   .get(auth.register);

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
  app.route('/find/Rdir')
    .get(chartdata.list_all_Rdir_data);
  app.route('/find/Rdif')
    .get(chartdata.list_all_Rdif_data);
  app.route('/find/Text')
    .get(chartdata.list_all_Text_data);
  app.route('/find/Tint')
    .get(chartdata.list_all_Tint_data);
  app.route('/find/Tamb')
    .get(chartdata.list_all_Tamb_data);
  app.route('/find/TWext')
    .get(chartdata.list_all_TWext_data);
  app.route('/find/TWint')
    .get(chartdata.list_all_TWint_data);
  app.route('/find/TFext')
    .get(chartdata.list_all_TFext_data);
  app.route('/find/TFint')
    .get(chartdata.list_all_TFint_data);
  app.route('/find/Fan')
    .get(chartdata.list_all_Fan_data);
  app.route('/find/Lights')
    .get(chartdata.list_all_Lights_data);
  app.route('/find/Solarh')
    .get(chartdata.list_all_Solarh_data);
  app.route('/find/ACP')
    .get(chartdata.list_all_AC_P_data);
  app.route('/find/Qw')
    .get(chartdata.list_all_Qw_data);
  app.route('/find/Qa')
    .get(chartdata.list_all_Qa_data);
  app.route('/find/SP')
    .get(chartdata.list_all_Set_Point);

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
  app.route('/find/Tamb/from/:from/to/:to')
    .get(chartdata.find_Tamb_by_date);
  app.route('/find/TFext/from/:from/to/:to')
    .get(chartdata.find_TFext_by_date);
  app.route('/find/TFint/from/:from/to/:to')
    .get(chartdata.find_TFint_by_date);
  app.route('/find/TWext/from/:from/to/:to')
    .get(chartdata.find_TWext_by_date);
  app.route('/find/TWint/from/:from/to/:to')
    .get(chartdata.find_TWint_by_date);
  app.route('/find/Fan/from/:from/to/:to')
    .get(chartdata.find_Fan_by_date);
  app.route('/find/Lights/from/:from/to/:to')
    .get(chartdata.find_Lights_by_date);
  app.route('/find/Solarh/from/:from/to/:to')
    .get(chartdata.find_Solarh_by_date);
  app.route('/find/ACP/from/:from/to/:to')
    .get(chartdata.find_AC_P_by_date);
  app.route('/find/Qw/from/:from/to/:to')
    .get(chartdata.find_Qw_by_date);
  app.route('/find/Qa/from/:from/to/:to')
    .get(chartdata.find_Qa_by_date);
  app.route('/find/SP/from/:from/to/:to')
    .get(chartdata.find_Set_Point_by_date);


  app.route('/find/last/Lights')
    .get(chartdata.find_last_Lights);
  app.route('/find/last/SP')
    .get(chartdata.find_last_Set_Point);
  app.route('/find/last/Mode')
    .get(chartdata.find_last_Mode);


  app.route('/insert/setpoint/:val')
    .post(chartdata.save_Set_Point_data);
  app.route('/insert/tamb/')
    .post(chartdata.save_Tamb_data);
  app.route('/insert/twint/')
    .post(chartdata.save_TWint_data);
  app.route('/insert/twext/')
    .post(chartdata.save_TWext_data);
  app.route('/insert/tfint/')
    .post(chartdata.save_TFint_data);
  app.route('/insert/tfext/')
    .post(chartdata.save_TFext_data);
  app.route('/insert/qair/')
    .post(chartdata.save_Q_air_data);
  app.route('/insert/qwater/')
    .post(chartdata.save_Q_water_data);
  app.route('/insert/shstatus/')
    .post(chartdata.save_sh_status_data);
  app.route('/insert/mode/')
    .post(chartdata.save_Mode_data);
};
