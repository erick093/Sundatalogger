$(function() {
  var start = new Date();
  var now= start.setHours(0,0,0,0);
  var end = new Date();
  var nowto= end.setHours(23,59,59,999);
  var url1 = "/find/P/from/" + now + "/to/" + nowto ;
  var url2 = "/find/R/from/" + now + "/to/" + nowto ;
  //var temp_1 ;
  //var temp_2 ;
  var v_E ;
  var v_R ;
  document.getElementById("dates_eff").innerHTML = start;
  function getJson(url) {
    return JSON.parse($.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        global: false,
        async: false,
        success: function (data) {
            return data;
        }
    }).responseText);
  }

  var var_E = getJson(url1);
  var var_R = getJson(url2);
  //console.log("Energy S_P: " + JSON.stringify(var_E));
  //console.log("Energy SUN: " + JSON.stringify(var_R));
  // var eff = [];
  // for (var i = 0; i < var_R.length; i++) {
  //   console.log("Dividiendo: "+ var_E[i].sensorVAL + "/" +var_R[i].sensorVAL );
  //   eff[i]=parseInt(var_E[i].sensorVAL)/(parseInt(var_R[i].sensorVAL)*0.28968);
  // }
  // console.log("Efficiency: " + JSON.stringify(eff));
  DrawGraph_eff(var_E,var_R);

    $("#from_eff").datepicker({
      changeMonth: true,
      changeYear: true,
      defaultDate: new Date(),
       maxDate: new Date()
    });


    $("#bt_eff").click(function(){
      var from = $("#from_eff").val();
      var fromv = new Date(from).getTime();
      var to = fromv + 86400000;
      var urlAjax1 = "/find/P/from/" + new Date(from).getTime() + "/to/" + to ;
      var urlAjax2 = "/find/R/from/" + new Date(from).getTime() + "/to/" + to ;

      var varc_E = getJson(urlAjax1);
      var varc_R = getJson(urlAjax2);
      //console.log("Energy S_P: : " + JSON.stringify(varc_E));
      //console.log("Energy SUN: : " + JSON.stringify(varc_R));
      // var eff = [];
      // for (var i = 0; i < varc_R.length; i++) {
      //   console.log("Dividiendo: "+ varc_E[i].sensorVAL + "/" +varc_R[i].sensorVAL );
      //   eff[i]=parseInt(varc_E[i].sensorVAL)/(parseInt(varc_R[i].sensorVAL)*0.28968);
      // }
      // console.log("Efficiency: " + JSON.stringify(eff));
      DrawGraph_eff(varc_E,varc_R);
    });
});



function DrawGraph_eff(data1,data2) {
  var chartData = [];
  //console.log("Recibo: "+ data.length);
  var chart =AmCharts.makeChart("s_eff", {
    "type": "serial",
    "theme": "light",
    "fontFamily": "sans-serif",
    "dataDateFormat": "YYYY-MM-DD HH:NN",
    "valueAxes": [{
      "axisAlpha": 0,
      "unit": "%",
      "position": "left",
      "titleFontSize" : "14",
       "titleBold" : true,
      "title": "Solar Panel Efficiency"
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
      "balloonText": "<span style='font-size:12px;'>[[value]] %</span>",
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

//chart.validateData();
//chart.animateAgain();
for (var i = 0; i < data1.length; i++) {
  //chartData[i]=data[i];
  //0.49159= area del panel solar
  var temp = ((parseInt(data1[i].sensorVAL))/(parseInt(data2[i].sensorVAL)*0.49159)).toFixed(3);
  //console.log("P: "+ data1[i].sensorVAL + " / " + "E: " + data2[i].sensorVAL + " = "+ temp );
  chartData.push({
    date: new Date(parseInt(data2[i].timestamp)),
    value: temp*100
    //value2: data2[i].sensorVAL
  });
}

//console.log(chartData);
chart.dataProvider = chartData;
chart.validateData();
chart.addListener("rendered", zoomChart);

zoomChart();

function zoomChart() {
    //chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    chart.zoomToIndexes(0, 20);
}



}
