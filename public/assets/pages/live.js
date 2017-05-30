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

// function changeImage() {
//       var image = document.getElementById('myImage');
//       if (image.src.match("bulbon")) {
//           image.src = "assets/images/pic_bulboff.gif";
//           socket.emit('publish', {topic:"led",payload:"off"});
//       }
//       else {
//           image.src = "assets/images/pic_bulbon.gif";
//           socket.emit('publish', {topic:"led",payload:"on"});
//       }
// }
// $(document).ready(function() {
//   $( "#valvOn" ).submit(function( event ) {
//    		$("#imgon").show();
//    		$("#imgoff").hide();
//    	  //socket.emit('valvOn');
//
//    	  return false;
//    });
//
//    $( "#valvOff" ).submit(function( event ) {
//    	  //socket.emit('valvOff');
//    	  $("#imgon").hide();
//    	  $("#imgoff").show();
//    	  return false;
//    });
// });
