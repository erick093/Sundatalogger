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

var Rdif_data = mongoose.model('Rdif_data', {
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
var Rdir_data = mongoose.model('Rdir_data', {
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

var T_amb_data = mongoose.model('T_amb_data', {
  sensorID: {
    type: String,
    default: "temp/amb"
  },
  sensorVAL: {
    type: String
  },
  timestamp: {
    type: String,
    default: Date.now
  }
});

var T_W_ext_data = mongoose.model('T_W_ext_data', {
  sensorID: {
    type: String,
    default: "temp/outwater"
  },
  sensorVAL: {
    type: String
  },
  timestamp: {
    type: String,
    default: Date.now
  }
});

var T_W_int_data = mongoose.model('T_W_int_data', {
  sensorID: {
    type: String,
    default: "temp/inwater"
  },
  sensorVAL: {
    type: String
  },
  timestamp: {
    type: String,
    default: Date.now
  }
});

var T_F_ext_data = mongoose.model('T_F_ext_data', {
  sensorID: {
    type: String,
    default: "temp/voutside"
  },
  sensorVAL: {
    type: String
  },
  timestamp: {
    type: String,
    default: Date.now
  }
});

var T_F_int_data = mongoose.model('T_F_int_data', {
  sensorID: {
    type: String,
    default: "temp/vinside"
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

var Solar_H_data = mongoose.model('Solar_H_data', {
  sensorID: {
    type: String,
    default: "control/solarheater"
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

var Q_air_data = mongoose.model('Q_air_data', {
  sensorID: {
    type: String,
    default: "q/air"
  },
  sensorVAL: {
    type: String
  },
  timestamp: {
    type: String,
    default: Date.now
  }
});

var Q_water_data = mongoose.model('Q_water_data', {
  sensorID: {
    type: String,
    default: "q/water"
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
  sensorVAL: {
    type: String
  },
  timestamp: {
    type: String,
    default: Date.now
  }
});

var Mode_data = mongoose.model('Mode_data', {
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
module.exports.Rdif_data = Rdif_data; //Solar Radiation  Difuse Data
module.exports.Rdir_data = Rdir_data; //Solar Radiation  Direct Data
module.exports.T_ext_data = T_ext_data; //Exterior Temperature Data
module.exports.T_int_data = T_int_data; //Interior Temperature Data
module.exports.T_amb_data = T_amb_data; //Ambient Temperature of Solar Heater Data
module.exports.T_W_ext_data = T_W_ext_data; //Exterior Water Temperature Data
module.exports.T_W_int_data = T_W_int_data; //Interior Water Temperature Data
module.exports.T_F_ext_data = T_F_ext_data; //Exterior Fan #2 Temperature Data
module.exports.T_F_int_data = T_F_int_data; //Interior Fan #2 Temperature Data
module.exports.Fan_data = Fan_data; //Fan control Data
module.exports.Solar_H_data = Solar_H_data; //Solar Heater(Fan # 2) control Data
module.exports.Lights_data = Lights_data; //Lights control Data
module.exports.AC_P_data = AC_P_data; //Lights control Data
module.exports.Q_air_data = Q_air_data; //Q air data
module.exports.Q_water_data = Q_water_data; // Q water data
module.exports.Set_Point_data = Set_Point_data; //Temp set point Data
module.exports.Mode_data = Mode_data; //Fan mode Data
