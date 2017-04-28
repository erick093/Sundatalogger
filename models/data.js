var mongoose = require('mongoose');

var V_data = mongoose.model('V_data', {
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

var A_data = mongoose.model('A_data', {
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

var P_data = mongoose.model('P_data', {
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

module.exports.V_data = V_data;
module.exports.A_data = A_data;
module.exports.P_data = P_data;
