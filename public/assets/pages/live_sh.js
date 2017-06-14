var socket = io();
socket.on('last_temp_int', function (data) {
  var div = document.getElementById("Tamb_text");
  div.textContent ="Inside T.: " + data.message + "°C";
  var text = div.textContent;
});
socket.on('last_temp_ext', function (data) {
  var div = document.getElementById("Text_text");
  div.textContent ="Outside T.: " + data.message + "°C";
  var text = div.textContent;
});
socket.on('last_twext', function (data) {
  var div = document.getElementById("Text_text_w");
  div.textContent ="Out water T.: " + data.message + "°C";
  var text = div.textContent;
});
socket.on('last_twint', function (data) {
  var div = document.getElementById("Text_tint_w");
  div.textContent ="In water T.: " + data.message + "°C";
  var text = div.textContent;
});
socket.on('last_tfext', function (data) {
  var div = document.getElementById("Text_text_f");
  div.textContent ="Out air T.: " + data.message + "°C";
  var text = div.textContent;
});
socket.on('last_tfint', function (data) {
  var div = document.getElementById("Text_tint_f");
  div.textContent ="In air T.: " + data.message + "°C";
  var text = div.textContent;
});
socket.on('last_q_air', function (data) {
  var div = document.getElementById("Text_q_air");
  div.textContent ="Q air.: " + data.message + "Watts";
  var text = div.textContent;
});
socket.on('last_q_water', function (data) {
  var div = document.getElementById("Text_q_water");
  div.textContent ="Q water.: " + data.message + "Watts";
  var text = div.textContent;
});
