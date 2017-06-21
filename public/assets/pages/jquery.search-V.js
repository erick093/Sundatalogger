var c_data =[];

$(function() {
    $("#variable").selectmenu();
    $("#from").datepicker({
      changeMonth: true,
      changeYear: true,
      defaultDate: new Date(),
       maxDate: new Date()
    });
    $("#to").datepicker({
      changeMonth: true,
      changeYear: true,
      defaultDate: new Date()
       //maxDate: new Date()
    });

    $("#bt").click(function(){
      var from = $("#from").val();
      var to = $("#to").val();
      var vardata = $("#variable").val();
      var fromv = new Date(from).getTime();

      switch (vardata) {
        case "Voltage":
          console.log("voltaje");
          var urlAjax = "/find/V/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Amperage":
          console.log("corriente");
          var urlAjax = "/find/A/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Power":
          console.log("potencia");
          var urlAjax = "/find/P/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Energy":
          console.log("energia");
          var urlAjax = "/find/E/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Solar Radiation":
          console.log("radiacion solar");
          var urlAjax = "/find/R/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "AC Power Line Consumption":
          console.log("AC Power");
          var urlAjax = "/find/ACP/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Inside Temperature":
          console.log("temperatura interior");
          var urlAjax = "/find/Tint/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Outside Temperature":
          console.log("temperatura exterior");
          var urlAjax = "/find/Text/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Air entry Temperature":
          console.log("temperatura aire interior");
          var urlAjax = "/find/TFint/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Air exit Temperature":
          console.log("temperatura aire exterior");
          var urlAjax = "/find/TFext/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Water entry Temperature":
          console.log("temperatura agua interior");
          var urlAjax = "/find/TWint/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Water exit Temperature":
          console.log("temperatura agua exterior");
          var urlAjax = "/find/TWext/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Q air":
          console.log("Q aire");
          var urlAjax = "/find/Qa/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Q water":
          console.log("Q agua");
          var urlAjax = "/find/Qw/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Lights Status":
          console.log("Estado luces");
          var urlAjax = "/find/Lights/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Fan Status":
          console.log("Estado ventilador");
          var urlAjax = "/find/Fan/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
        case "Solar Heater Status":
          console.log("Estado calefactor solar");
          var urlAjax = "/find/Solarh/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
          break;
      }
      var div = document.getElementById("v_text");
      div.textContent = vardata;
      var text = div.textContent;
      //var urlAjax = "/find/V/from/" + new Date(from).getTime() + "/to/" + new Date(to).getTime() ;
      $.ajax({
        type: "GET",
        url:urlAjax,
        dataType: 'json',
        success: function(data) {
          c_data = data ;
          alert('Searching '+ data.length + ' '+vardata +' points...');
          DrawGraph(data);
        }
      });
    });
});

function DrawGraph(data) {
  var chartData = [];
  //console.log("Recibo: "+ data.length);
  var chart =AmCharts.makeChart("s_volt", {
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
      "balloonText": "<span style='font-size:12px;'>[[value]]</span>",
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
