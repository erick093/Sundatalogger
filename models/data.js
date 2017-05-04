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

var E_data = mongoose.model('E_data', {
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


var R_data = mongoose.model('R_data', {
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
module.exports.V_data = V_data; //Voltages Data
module.exports.A_data = A_data; //Amperage Data
module.exports.P_data = P_data; //Power Data
module.exports.E_data = E_data; //Energy Data
module.exports.R_data = R_data; //Solar Radiation Data
