$(function() {
  var start = new Date();
  var now= start.setHours(0,0,0,0);
  var end = new Date();
  var nowto= end.setHours(23,59,59,999);
  var url = "/find/P/from/" + now + "/to/" + nowto ;
  document.getElementById("dates").innerHTML = start;
  $.ajax({
    type: "GET",
    url:url,
    dataType: 'json',
    success: function(data) {

      DrawGraph(data);

    }
  });


    $("#from").datepicker({
      changeMonth: true,
      changeYear: true,
      defaultDate: new Date(),
       maxDate: new Date()
    });


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
          DrawGraph(data);
          document.getElementById("dates").innerHTML = new Date(from);
        }
      });
      //alert(urlAjax);

    });
    //console.log("hola " + c_data.length);


});

function DrawGraph(data) {
  var chartData = [];
  //console.log("Recibo: "+ data.length);
  var chart =AmCharts.makeChart("s_pot", {
    "type": "serial",
    "theme": "light",
    "fontFamily": "sans-serif",
    "dataDateFormat": "YYYY-MM-DD HH:NN",
    "valueAxes": [{
      "axisAlpha": 0,
      "unit": "Watts",
      "position": "left",
      "titleFontSize" : "14",
       "titleBold" : true,
      "title": "Power Output"
    }],
    "mouseWheelZoomEnabled": false,
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
        "drop":false
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
    //"dataProvider": chartData1,
    "export": {
            "enabled": true
    }
  });

//console.log("este es el valor en 0: "+ data[0].sensorVAL);

chart.validateData();
//chart.animateAgain();
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
