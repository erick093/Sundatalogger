var socket = io();
  socket.on('last_P', function (data) {
    var div = document.getElementById("P_text");
    div.textContent ="Power: " + data.message + " Watts";
    var text = div.textContent;
  });

  socket.on('last_A', function (data) {
    var div = document.getElementById("A_text");
    div.textContent ="Current: " +  data.message + " Amps";
    var text = div.textContent;
  });

  socket.on('last_V', function (data) {
    var div = document.getElementById("V_text");
    div.textContent ="Voltage: " +  data.message + " Volts";
    var text = div.textContent;
  });
  socket.on('last_E', function (data) {
    var div = document.getElementById("E_text");
    div.textContent ="Energy: " +  data.message + " Wh";
    var text = div.textContent;
  });

  socket.on('last_R', function (data) {
    var div = document.getElementById("R_text");
    div.textContent ="Global Radiation: " +  data.message + " W/m2";
    var text = div.textContent;
  });

  socket.on('last_Rdir', function (data) {
    var div = document.getElementById("Rdir_text");
    div.textContent ="Direct Radiation: " +  data.message + " W/m2";
    var text = div.textContent;
  });

  socket.on('last_Rdif', function (data) {
    var div = document.getElementById("Rdif_text");
    div.textContent ="Diffuse Radiation: " +  data.message + " W/m2";
    var text = div.textContent;
  });
