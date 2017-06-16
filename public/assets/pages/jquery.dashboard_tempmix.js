$(function() {
  var start = new Date();
  var now= start.setHours(0,0,0,0);
  var end = new Date();
  var nowto= end.setHours(23,59,59,999);
  var url1 = "/find/Text/from/" + now + "/to/" + nowto ;
  var url2 = "/find/Tint/from/" + now + "/to/" + nowto ;
  //var temp_1 ;
  //var temp_2 ;
  var tempc_1 ;
  var tempc_2 ;
  document.getElementById("dates_tmix").innerHTML = start;
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
  // var temp_1 = $.ajax({
  //   global: false,
  //   async:false,
  //   type: "GET",
  //   url:url1,
  //   dataType: 'json',
  //   success: function(data) {
  //     //DrawGraph_Tmix(data);
  //     //temp_1 = data ;
  //     return(data);
  //   }
  // }).responseText;
  // var temp_2 = $.ajax({
  //   global: false,
  //   async:false,
  //   type: "GET",
  //   url:url2,
  //   dataType: 'json',
  //   success: function(data) {
  //     //DrawGraph_Tmix(data);
  //     //temp_2 = data ;
  //     return(data);
  //   }
  // }).responseText;
  var temp_1 = getJson(url1);
  var temp_2 = getJson(url2);
  console.log("Data 1: " + JSON.stringify(temp_1));
  console.log("Data 2: " + JSON.stringify(temp_2));
  DrawGraph_Tmix(temp_1,temp_2);

    $("#from_tmix").datepicker({
      changeMonth: true,
      changeYear: true,
      defaultDate: new Date(),
       maxDate: new Date()
    });


    $("#bt_tmix").click(function(){
      var from = $("#from_tmix").val();
      var fromv = new Date(from).getTime();
      var to = fromv + 86400000;
      var urlAjax1 = "/find/Text/from/" + new Date(from).getTime() + "/to/" + to ;
      var urlAjax2 = "/find/Tint/from/" + new Date(from).getTime() + "/to/" + to ;
      // $.ajax({
      //   type: "GET",
      //   url:urlAjax1,
      //   dataType: 'json',
      //   success: function(data) {
      //     alert('Searching '+ data.length +' points...');
      //     //DrawGraph_Tmix(data);
      //     tempc_1=data;
      //     document.getElementById("dates_tmix").innerHTML = new Date(from);
      //   }
      // });
      // $.ajax({
      //   type: "GET",
      //   url:urlAjax2,
      //   dataType: 'json',
      //   success: function(data) {
      //     alert('Searching '+ data.length +' points...');
      //     //DrawGraph_Tmix(data);
      //     tempc_2=data;
      //     document.getElementById("dates_tmix").innerHTML = new Date(from);
      //   }
      // });
      var tempc_1 = getJson(urlAjax1);
      var tempc_2 = getJson(urlAjax2);
      console.log("Datac 1: " + JSON.stringify(tempc_1));
      console.log("Datac 2: " + JSON.stringify(tempc_2));
      DrawGraph_Tmix(tempc_1,tempc_2);
    });
});



function DrawGraph_Tmix(data1,data2) {
  var chartData = [];
  var chartData2 = [];
  //console.log("Recibo: "+ data.length);
  var chart =AmCharts.makeChart("s_tmix", {
    "type": "serial",
    "theme": "light",
    "fontFamily": "sans-serif",
    "dataDateFormat": "YYYY-MM-DD HH:NN",
    "valueAxes": [{
      "axisAlpha": 0,
      "position": "left",
      "titleFontSize" : "14",
       "titleBold" : true,
      "title": "Lights status"
    }],
    "mouseWheelZoomEnabled": false,
    "graphs": [{
  "id": "g1",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value"
    },
              {
  "id": "g2",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#00FF00",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "green line",
        "useLineColorForBulletBorder": true,
        "valueField": "value2"
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
  chartData.push({
    date: new Date(parseInt(data1[i].timestamp)),
    value: data1[i].sensorVAL
    //value2: data2[i].sensorVAL
  });
}
for (var i = 0; i < data2.length; i++) {
  //chartData[i]=data[i];
  chartData2.push({
    date: new Date(parseInt(data2[i].timestamp)),
    value: data2[i].sensorVAL
  });
}
//console.log(chartData);
chart.dataProvider = chartData;
chart.dataProvider = chartData2;
chart.validateData();
chart.addListener("rendered", zoomChart);

zoomChart();

function zoomChart() {
    //chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    chart.zoomToIndexes(0, 20);
}



}
