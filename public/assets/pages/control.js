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

function changeImage() {
  var image = document.getElementById('bulb');
  if (image.src.match("bulbon")) {
      image.src = "assets/images/pic_bulboff.gif";
      socket.emit('publish', {topic:"control/lights",payload:"0"});
  }
  else {
      image.src = "assets/images/pic_bulbon.gif";
      socket.emit('publish', {topic:"control/lights",payload:"1"});
  }
}

$(function() {

    $("#btsp").click(function(){
      var value = $("#spval").val();
      var urlAjax = "/insert/setpoint/" + value ;
      $.post(urlAjax);

    });
});
