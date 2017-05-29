var socket = io();

var chartData1 = [];
var chartData2 = [];
var chartData3 = [];
var chartData4 = [];
var chartData5 = [];
var chartData6 = [];
var chartData7 = [];
var chartData8 = [];
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
  "fontSize" : "10",
  "dataDateFormat": "YYYY-MM-DD HH:NN",
  // "valueAxes": [{
  //   "axisAlpha": 0,
  //   "position": "left",
  //   "titleFontSize" : "14",
  //    "titleBold" : false
  // }],
  "mouseWheelZoomEnabled": false,
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
var chartConfig4 = clone(chartConfig);
var chartConfig5 = clone(chartConfig);
var chartConfig6 = clone(chartConfig);
var chartConfig7 = clone(chartConfig);
var chartConfig8 = clone(chartConfig);
var chart1 = AmCharts.makeChart("V_chart", chartConfig1);
var chart2 = AmCharts.makeChart("A_chart", chartConfig2);
var chart3 = AmCharts.makeChart("P_chart", chartConfig3);
var chart4 = AmCharts.makeChart("T_ext_chart", chartConfig4);
var chart5 = AmCharts.makeChart("T_int_chart", chartConfig5);
var chart6 = AmCharts.makeChart("L_chart", chartConfig6);
var chart7 = AmCharts.makeChart("F_chart", chartConfig7);
var chart8 = AmCharts.makeChart("R_chart", chartConfig8);
var valueAxis1 = new AmCharts.ValueAxis();
valueAxis1.position = "left";
valueAxis1.title = "Voltage";
valueAxis1.titleFontSize = "14";
valueAxis1.axisAlpha = 0 ;
valueAxis1.titleBold = false;
valueAxis1.unit = "V";
chart1.addValueAxis(valueAxis1);
var valueAxis2 = new AmCharts.ValueAxis();
valueAxis2.position = "left";
valueAxis2.title = "Amperage";
valueAxis2.titleFontSize = "14";
valueAxis2.axisAlpha = 0 ;
valueAxis2.titleBold = false;
valueAxis2.unit = "A";
chart2.addValueAxis(valueAxis2);
var valueAxis3 = new AmCharts.ValueAxis();
valueAxis3.position = "left";
valueAxis3.title = "Power Output";
valueAxis3.titleFontSize = "14";
valueAxis3.axisAlpha = 0 ;
valueAxis3.titleBold = false;
valueAxis3.unit = "Watts";
chart3.addValueAxis(valueAxis3);
var valueAxis4 = new AmCharts.ValueAxis();
valueAxis4.position = "left";
valueAxis4.title = "Outside Temperature";
valueAxis4.titleFontSize = "14";
valueAxis4.axisAlpha = 0 ;
valueAxis4.titleBold = false;
valueAxis4.unit = "°C";
chart4.addValueAxis(valueAxis4);
var valueAxis5 = new AmCharts.ValueAxis();
valueAxis5.position = "left";
valueAxis5.title = "Inside Temperature";
valueAxis5.titleFontSize = "14";
valueAxis5.axisAlpha = 0 ;
valueAxis5.titleBold = false;
valueAxis5.unit = "°C";
chart5.addValueAxis(valueAxis5);
var valueAxis6 = new AmCharts.ValueAxis();
valueAxis6.position = "left";
valueAxis6.title = "Lights Status";
valueAxis6.titleFontSize = "14";
valueAxis6.axisAlpha = 0 ;
valueAxis6.titleBold = false;
chart6.addValueAxis(valueAxis6);
var valueAxis7 = new AmCharts.ValueAxis();
valueAxis7.position = "left";
valueAxis7.title = "Fan Status";
valueAxis7.titleFontSize = "14";
valueAxis7.axisAlpha = 0 ;
valueAxis7.titleBold = false;
chart7.addValueAxis(valueAxis7);
var valueAxis8 = new AmCharts.ValueAxis();
valueAxis8.position = "left";
valueAxis8.title = "Solar Radiation";
valueAxis8.titleFontSize = "14";
valueAxis8.axisAlpha = 0 ;
valueAxis8.titleBold = false;
valueAxis8.unit = "Watts/m2";
chart8.addValueAxis(valueAxis8);

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
chart4.addListener("rendered", zoomChart4);
zoomChart4();
chart5.addListener("rendered", zoomChart5);
zoomChart5();
chart6.addListener("rendered", zoomChart6);
zoomChart6();
chart7.addListener("rendered", zoomChart7);
zoomChart7();
chart8.addListener("rendered", zoomChart8);
zoomChart8();

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
function zoomChart4() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart4.zoomToIndexes(chartData4.length - 40, chartData4.length - 1);
}
function zoomChart5() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart5.zoomToIndexes(chartData5.length - 40, chartData5.length - 1);
}
function zoomChart6() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart6.zoomToIndexes(chartData6.length - 40, chartData6.length - 1);
}
function zoomChart7() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart7.zoomToIndexes(chartData7.length - 40, chartData7.length - 1);
}
function zoomChart8() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart8.zoomToIndexes(chartData8.length - 40, chartData8.length - 1);
}
socket.on('panels_V', function (data) {
  // console.log("V value: "+ data.message );
  // console.log("V time: "+new Date(parseInt(data.time)));
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
  // console.log("A time: "+new Date(parseInt(data.time)));
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
  // console.log("P time: "+new Date(parseInt(data.time)));
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

socket.on('temp_ext', function (data) {
  //var newDate = new Date();
  // console.log("P time: "+new Date(parseInt(data.time)));
  chartData4.push({
    //date: newDate,
    date: new Date(parseInt(data.time)),
    value: data.message
  });
  chart4.dataProvider = chartData4;
  if (chartData4.length > 20) {
    chartData4.splice(0, chartData4.length - 20);
  }
  chart4.validateData();
});

socket.on('temp_int', function (data) {
  //var newDate = new Date();
  // console.log("P time: "+new Date(parseInt(data.time)));
  chartData5.push({
    //date: newDate,
    date: new Date(parseInt(data.time)),
    value: data.message
  });
  chart5.dataProvider = chartData5;
  if (chartData5.length > 20) {
    chartData5.splice(0, chartData5.length - 20);
  }
  chart5.validateData();
});

socket.on('lights_status', function (data) {
  //var newDate = new Date();
  // console.log("P time: "+new Date(parseInt(data.time)));
  chartData6.push({
    //date: newDate,
    date: new Date(parseInt(data.time)),
    value: data.message
  });
  chart6.dataProvider = chartData6;
  if (chartData6.length > 20) {
    chartData6.splice(0, chartData6.length - 20);
  }
  chart6.validateData();
});

socket.on('fan_status', function (data) {
  //var newDate = new Date();
  // console.log("P time: "+new Date(parseInt(data.time)));
  chartData7.push({
    //date: newDate,
    date: new Date(parseInt(data.time)),
    value: data.message
  });
  chart7.dataProvider = chartData7;
  if (chartData7.length > 20) {
    chartData7.splice(0, chartData7.length - 20);
  }
  chart7.validateData();
});

socket.on('panels_R', function (data) {
  //var newDate = new Date();
  // console.log("P time: "+new Date(parseInt(data.time)));
  chartData8.push({
    //date: newDate,
    date: new Date(parseInt(data.time)),
    value: data.message
  });
  chart8.dataProvider = chartData8;
  if (chartData8.length > 20) {
    chartData8.splice(0, chartData8.length - 20);
  }
  chart8.validateData();
});
