var mongoose = require('mongoose');

var V1_data = mongoose.model('V1_data', {
  sensorID: {
    type: String
  },
  sensorVAL: {
    type: String
  },
  timestamp: {
    type: String,
    default: Date.now
  }
});

var A1_data = mongoose.model('A1_data', {
  sensorID: {
    type: String
  },
  sensorVAL: {
    type: String
  },
  timestamp: {
    type: String,
    default: Date.now
  }
});

module.exports.V1_data = V1_data;
module.exports.A1_data = A1_data;
