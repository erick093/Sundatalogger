var socket = io();
var chartData = [];
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

  $(function() {
      $("#from").datepicker();
      $("#to").datepicker();

      $("#bt").click(function(){
        var from = $("#from").val();
        var fromv = new Date(from).getTime();
        var to = fromv + 86400000;
        var urlAjax = "/find/P/from/" + new Date(from).getTime() + "/to/" + to ;
        $.ajax({
          type: "GET",
          url:urlAjax,
          dataType: 'json',
          success: function(data) {
            c_data = data ;
            alert('Searching '+ data.length +' points...');
            //delete data.sensorID;
            //console.log(data);
            // console.log(data.length);
            // console.log('valor en 0: '+data[0].sensorVAL);
            // console.log('tiempo en 0: '+data[0].timestamp);
            DrawGraph(data);

          }
        });
        //alert(urlAjax);

      });
      //console.log("hola " + c_data.length);


  });

  function DrawGraph(data) {
    //console.log("Recibo: "+ data.length);
    var chart =AmCharts.makeChart("s_pot", {
      "type": "serial",
      "theme": "light",
      "fontFamily": "sans-serif",
      "fontSize" : "8",
      "dataDateFormat": "YYYY-MM-DD HH:NN",
      "valueAxes": [{
        "id": "v1",
        "position": "left"
      }],
      "mouseWheelZoomEnabled": true,
      "graphs": [{
        "id": "g1",
        "bullet": "round",
        "bulletSize": 2,
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "useLineColorForBulletBorder": true,
        "hideBulletsCount": 50,
        "valueField": "value",
        "balloonText": "<span style='font-size:12px;'>[[value]] Watts</span>",
        "balloon":{
          "drop":true
        }
      }],
      "chartScrollbar": {
          "graph": "g1",
          "oppositeAxis":false,
          "offset":30,
          "scrollbarHeight": 80,
          "backgroundAlpha": 0,
          "selectedBackgroundAlpha": 0.1,
          "selectedBackgroundColor": "#888888",
          "graphFillAlpha": 0,
          "graphLineAlpha": 0.5,
          "selectedGraphFillAlpha": 0,
          "selectedGraphLineAlpha": 1,
          "autoGridCount":true,
          "color":"#AAAAAA"
      },
      "chartCursor": {
       //"limitToGraph":"g1"
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable":true
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "minPeriod": "HH",
        "equalSpacing": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "legend": {
        "useGraphSettings": true
      },
      //"dataProvider": chartData1,
      "export": {
              "enabled": true
      }
    });

  //console.log("este es el valor en 0: "+ data[0].sensorVAL);

  for (var i = 0; i < data.length; i++) {
    //chartData[i]=data[i];
    chartData.push({
      date: new Date(parseInt(data[i].timestamp)),
      value: data[i].sensorVAL
    });
  }
  //console.log(chartData);
  chart.dataProvider = chartData;
  chart.validateData();

  chart.addListener("rendered", zoomChart);

  zoomChart();

  function zoomChart() {
      chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
  }
  }
