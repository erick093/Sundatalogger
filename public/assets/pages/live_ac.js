var socket = io();

  socket.on('last_lights_status', function (data) {
    var div = document.getElementById("Ltext");
    if (data.message == "1") {
      div.textContent = "Lights: ON";
      var text = div.textContent;
    } else {
      div.textContent = "Lights: OFF";
      var text = div.textContent;
    }
  });
  socket.on('last_fan_status', function (data) {
    var div = document.getElementById("Ftext");
    if (data.message == "1") {
      div.textContent = "Fan: ON";
      var text = div.textContent;
    } else {
      div.textContent = "Fan: OFF";
      var text = div.textContent;
    }
  });
  socket.on('last_solarh_status', function (data) {
    var div = document.getElementById("Shtext");
    if (data.message == "1") {
      div.textContent = "Solar Heater: ON";
      var text = div.textContent;
    } else {
      div.textContent = "Solar Heater: OFF";
      var text = div.textContent;
    }
  });
  socket.on('last_temp_int', function (data) {
    var div = document.getElementById("Ta_text");
    div.textContent ="Inside T.: " + data.message + "°C";
    var text = div.textContent;
  });
  socket.on('last_temp_ext', function (data) {
    var div = document.getElementById("Te_text");
    div.textContent ="Outside T.: " + data.message + "°C";
    var text = div.textContent;
  });
  // socket.on('last_V', function (data) {
  //   var div = document.getElementById("V_text");
  //   div.textContent ="Voltage: " +  data.message + " Volts";
  //   var text = div.textContent;
  // });
  // socket.on('last_E', function (data) {
  //   var div = document.getElementById("E_text");
  //   div.textContent ="Energy: " +  data.message + " Wh";
  //   var text = div.textContent;
  // });
