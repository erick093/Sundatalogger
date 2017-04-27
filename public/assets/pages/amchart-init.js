var socket = io();

var chartData1 = [];
var chartData2 = [];
var chartData3 = [];
var chartData4 = [];
chart_config = {
  "type": "serial",
  "theme": "light",
  "fontFamily": "sans-serif",
  "fontSize" : "12",
  "valueAxes": [{
    "id": "v1",
    "position": "left"
  }],
  "mouseWheelZoomEnabled": true,
  "graphs": [{
    "id": "g1",
    "bullet": "round",
    "bulletBorderAlpha": 1,
    "bulletColor": "#FFFFFF",
    "useLineColorForBulletBorder": true,
    "hideBulletsCount": 50,
    "valueField": "value",
    "balloonText": "[[value]]",
    "balloon":{
      "drop":true
    }
  }],
  "chartCursor": {
   "limitToGraph":"g1"
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

chart2_config = {
  "type": "serial",
  "theme": "light",
  "fontFamily": "sans-serif",
  "fontSize" : "12",
  "valueAxes": [{
    "id": "v1",
    "position": "left"
  }],
  "mouseWheelZoomEnabled": true,
  "graphs": [{
    "id": "g1",
    "bullet": "round",
    "bulletBorderAlpha": 1,
    "bulletColor": "#FFFFFF",
    "useLineColorForBulletBorder": true,
    "hideBulletsCount": 50,
    "valueField": "value",
    "balloonText": "[[value]]",
    "balloon":{
      "drop":true
    }
  }],
  "chartCursor": {
   "limitToGraph":"g1"
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


var chart1 = AmCharts.makeChart("V1_chart", chart_config);
var chart2 = AmCharts.makeChart("A1_chart", chart2_config);
// var categoryAxis = chart.categoryAxis;
// categoryAxis.parseDates = true;
// categoryAxis.minPeriod = "DD";
//chart.dataDateFormat = "YYYY-MM-DD, JJ:NN:SS";
// chart.numberFormatter = {
//   precision:3,decimalSeparator:",",thousandsSeparator:""
// };
// chart.addListener("rendered", zoomChart);
// zoomChart();

// this method is called when chart is first inited as we listen for "rendered" event
// function zoomChart() {
//     // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
//     chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
// }

socket.on('panel1_V', function (data) {
  var newDate = new Date();
  chartData1.push({
    date: newDate,
    value: data.message
  });
  chart1.dataProvider = chartData1;
  if (chartData1.length > 20) {
    chartData1.splice(0, chartData1.length - 20);
  }
  chart1.validateData();
});


socket.on('panel1_A', function (data) {
  var newDate = new Date();
  chartData2.push({
    date: newDate,
    value: data.message
  });
  chart2.dataProvider = chartData2;
  if (chartData2.length > 20) {
    chartData2.splice(0, chartData2.length - 20);
  }
  chart2.validateData();
});
