var socket = io();

socket.on('last_lights_status', function (data) {
  var div = document.getElementById("Lights_status");
  if (data.message == "1") {
    div.textContent = "Lights: ON";
    var text = div.textContent;
  } else {
    div.textContent = "Lights: OFF";
    var text = div.textContent;
  }
});
socket.on('last_fan_status', function (data) {
  var div = document.getElementById("Fan_status");
  if (data.message == "1") {
    div.textContent = "FAN: ON";
    var text = div.textContent;
  } else {
    div.textContent = "FAN: OFF";
    var text = div.textContent;
  }
});

socket.on('last_SP', function (data) {
  var div = document.getElementById("SP");
  div.textContent = data.message + " °C";
  var text = div.textContent;
});

socket.on('last_Mode', function (data) {
  var div = document.getElementById("Mode_S");
  if (data.message == "1") {
    div.textContent = "Manual";
    var text = div.textContent;
    Show();
  } else {
    div.textContent = "Automatic";
    var text = div.textContent;
    Hide();
  }
});

socket.on('last_solarh_status', function (data) {
  var div = document.getElementById("Solar_heater_status");
  if (data.message == "1") {
    div.textContent = "Solar Heater: ON";
    var text = div.textContent;
  } else {
    div.textContent = "Solar Heater: OFF";
    var text = div.textContent;
  }
});

function changeImage() {
  var image = document.getElementById('bulb');
  if (image.src.match("bulbon")) {
      image.src = "assets/images/pic_bulboff.gif";
      socket.emit('publish', {topic:"control/lights",payload:"0"});
      //console.log("off");
  }
  else {
      image.src = "assets/images/pic_bulbon.gif";
      socket.emit('publish', {topic:"control/lights",payload:"1"});
  }
}

function changeImageFan() {
  var F_image = document.getElementById('fan');
  if (F_image.src.match("fanon")) {
      F_image.src = "assets/images/fan.png";
      socket.emit('publish', {topic:"control/fan",payload:"0"});
      console.log("off");
  }
  else {
      F_image.src = "assets/images/fanon.gif";
      socket.emit('publish', {topic:"control/fan",payload:"1"});
      console.log("on");
  }
}

$(function() {

    $("#btsp").click(function(){
      var value = $("#spval").val();
      var urlAjax = "/insert/setpoint/" + value ;
      $.post(urlAjax);
    });

    $("#bto").click(function(){
      var vardata = $("#variable").val();
      var urlAjax1 = "/insert/mode/";
      switch (vardata) {
        case "Manual":
          var v1 = 1;
          console.log("manual");
          datas= {"sensorVAL": "1"};
          Show();
          break;
        case "Automatic":
          var v2 = 2;
          console.log("AT");
          datas= {"sensorVAL": "2"};
          Hide();
          break;
        }
          $.post(urlAjax1,datas);
    });

});

// function HideFunction() {
//     var x = document.getElementById('hide');
//     if (x.style.display === 'none') {
//         x.style.display = 'block';
//     } else {
//         x.style.display = 'none';
//     }
// }
//
// function ShowFunction() {
//     var x = document.getElementById('hide');
//     if (x.style.display === 'block') {
//         x.style.display = 'none';
//     } else {
//         x.style.display = 'block';
//     }
// }
function Hide() {
    var x = document.getElementById('hide');
    x.style.display = 'none';
}

function Show() {
    var x = document.getElementById('hide');
    x.style.display = 'block';

}
