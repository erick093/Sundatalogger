var socket = io();

var chartData1 = [];
var chartData2 = [];
var chartData3 = [];

//Cloning Function
function clone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}


var chartConfig = {
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
    "bulletSize": 5,
    "bulletBorderAlpha": 1,
    "bulletColor": "#FFFFFF",
    "useLineColorForBulletBorder": true,
    "hideBulletsCount": 50,
    "valueField": "value",
    "balloonText": "<span style='font-size:18px;'>[[value]]</span>",
    "balloon":{
      "drop":true
    }
  }],
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
};



var chartConfig1 = clone(chartConfig);
var chartConfig2 = clone(chartConfig);
var chartConfig3 = clone(chartConfig);
var chart1 = AmCharts.makeChart("V_chart", chartConfig1);
var chart2 = AmCharts.makeChart("A_chart", chartConfig2);
var chart3 = AmCharts.makeChart("P_chart", chartConfig3);
// var categoryAxis = chart.categoryAxis;
// categoryAxis.parseDates = true;
// categoryAxis.minPeriod = "DD";
//chart.dataDateFormat = "YYYY-MM-DD, JJ:NN:SS";
// chart.numberFormatter = {
//   precision:3,decimalSeparator:",",thousandsSeparator:""
// };
chart1.addListener("rendered", zoomChart1);
zoomChart1();
chart2.addListener("rendered", zoomChart2);
zoomChart2();
chart3.addListener("rendered", zoomChart3);
zoomChart3();



function zoomChart1() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart1.zoomToIndexes(chartData1.length - 40, chartData1.length - 1);
}
function zoomChart2() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart2.zoomToIndexes(chartData2.length - 40, chartData2.length - 1);
}
function zoomChart3() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart3.zoomToIndexes(chartData3.length - 40, chartData3.length - 1);
}

socket.on('panels_V', function (data) {

  console.log("V time: "+new Date(parseInt(data.time)));
  chartData1.push({
    date: new Date(parseInt(data.time)),
    value: data.message
  });
  chart1.dataProvider = chartData1;
  if (chartData1.length > 20) {
    chartData1.splice(0, chartData1.length - 20);
  }
  chart1.validateData();
});


socket.on('panels_A', function (data) {
  //var newDate = new Date();
  console.log("A time: "+new Date(parseInt(data.time)));
  chartData2.push({
    //date: newDate,
    date: new Date(parseInt(data.time)),
    value: data.message
  });
  chart2.dataProvider = chartData2;
  if (chartData2.length > 20) {
    chartData2.splice(0, chartData2.length - 20);
  }
  chart2.validateData();
});

socket.on('panels_P', function (data) {
  //var newDate = new Date();
  console.log("P time: "+new Date(parseInt(data.time)));
  chartData3.push({
    //date: newDate,
    date: new Date(parseInt(data.time)),
    value: data.message
  });
  chart3.dataProvider = chartData3;
  if (chartData3.length > 20) {
    chartData3.splice(0, chartData3.length - 20);
  }
  chart3.validateData();
});
