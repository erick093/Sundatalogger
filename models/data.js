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

var T_ext_data = mongoose.model('T_ext_data', {
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

var T_int_data = mongoose.model('T_int_data', {
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

var Fan_data = mongoose.model('Fan_data', {
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

var Lights_data = mongoose.model('Lights_data', {
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

var AC_P_data = mongoose.model('AC_P_data', {
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

var Set_Point_data = mongoose.model('Set_Point_data', {
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
module.exports.T_ext_data = T_ext_data; //Exterior Temperature Data
module.exports.T_int_data = T_int_data; //Interior Temperature Data
module.exports.Fan_data = Fan_data; //Fan control Data
module.exports.Lights_data = Lights_data; //Lights control Data
module.exports.AC_P_data = AC_P_data; //Lights control Data
module.exports.Set_Point_data = Set_Point_data; //Temp set point Data
