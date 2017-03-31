'use strict';

module.exports = (outcome, i) => {

  var exec = require('child_process').exec;


    console.log(outcome);
    if ('success' == outcome) {
      exec("curl https://api.particle.io/v1/devices/" + process.env.PARTICLE_DEVICE_ID + "/ledOn -d arg='"  + (i+1) + ",green' -d access_token=" + process.env.PARTICLE_ACCESS_TOKEN);
      console.log('green');
    }
    else {
      exec("curl https://api.particle.io/v1/devices/" + process.env.PARTICLE_DEVICE_ID + "/ledOn -d arg='"  + (i+1) + ",red' -d access_token=" + process.env.PARTICLE_ACCESS_TOKEN);
      console.log('red');
    }


};
