
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
