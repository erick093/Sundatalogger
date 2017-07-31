var socket = io();
  socket.on('last_P', function (data) {
    var div = document.getElementById("Power");
    div.textContent = data.message + " Watts";
    var text = div.textContent;
  });

  socket.on('last_A', function (data) {
    var div = document.getElementById("Current");
    div.textContent = data.message + " Amps";
    var text = div.textContent;
  });

  socket.on('last_V', function (data) {
    var div = document.getElementById("Voltage");
    div.textContent = data.message + " Volts";
    var text = div.textContent;
  });
  socket.on('last_E', function (data) {
    var div = document.getElementById("Energy");
    div.textContent = data.message + " Wh";
    var text = div.textContent;
  });
  socket.on('last_R', function (data) {
    var div = document.getElementById("Radiation");
    div.textContent = data.message + " W/m2";
    var text = div.textContent;
  });
  socket.on('last_Rdir', function (data) {
    var div = document.getElementById("DirRad");
    div.textContent = data.message + " W/m2";
    var text = div.textContent;
  });
  socket.on('last_Rdif', function (data) {
    var div = document.getElementById("DifRad");
    div.textContent = data.message + " W/m2";
    var text = div.textContent;
  });
  socket.on('last_temp_ext', function (data) {
    var div = document.getElementById("O_temp");
    div.textContent = data.message + " °C";
    var text = div.textContent;
  });
  socket.on('last_temp_int', function (data) {
    var div = document.getElementById("I_temp");
    div.textContent = data.message + " °C";
    var text = div.textContent;
  });
  socket.on('last_twext', function (data) {
    var div = document.getElementById("Wext_temp");
    div.textContent = data.message + " °C";
    var text = div.textContent;
  });
  socket.on('last_twint', function (data) {
    var div = document.getElementById("Wint_temp");
    div.textContent = data.message + " °C";
    var text = div.textContent;
  });
  socket.on('last_tfext', function (data) {
    var div = document.getElementById("Fext_temp");
    div.textContent = data.message + " °C";
    var text = div.textContent;
  });
  socket.on('last_tfint', function (data) {
    var div = document.getElementById("Fint_temp");
    div.textContent = data.message + " °C";
    var text = div.textContent;
  });
  socket.on('last_lights_status', function (data) {
    var div = document.getElementById("L_status");
    if (data.message == "1") {
      div.textContent = "Lights: ON";
      var text = div.textContent;
    } else {
      div.textContent = "Lights: OFF";
      var text = div.textContent;
    }
  });
  socket.on('last_fan_status', function (data) {
    var div = document.getElementById("F_status");
    if (data.message == "1") {
      div.textContent = "FAN: ON";
      var text = div.textContent;
    } else {
      div.textContent = "FAN: OFF";
      var text = div.textContent;
    }
  });
  socket.on('last_solarh_status', function (data) {
    var div = document.getElementById("Sh_status");
    if (data.message == "1") {
      div.textContent = "Solar Heater: ON";
      var text = div.textContent;
    } else {
      div.textContent = "Solar Heater: OFF";
      var text = div.textContent;
    }
  });
  socket.on('last_acp', function (data) {
    var div = document.getElementById("AC_power");
    div.textContent = data.message + " Watts";
    var text = div.textContent;
  });
  socket.on('last_SP', function (data) {
    var div = document.getElementById("Set_point_text");
    div.textContent = data.message + " °C";
    var text = div.textContent;
  });
  socket.on('last_q_air', function (data) {
    var div = document.getElementById("SQair");
    div.textContent = data.message + " Watts";
    var text = div.textContent;
  });
  socket.on('last_q_water', function (data) {
    var div = document.getElementById("SQwater");
    div.textContent = data.message + " Watts";
    var text = div.textContent;
  });

//alert(url);
