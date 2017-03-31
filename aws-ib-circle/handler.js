'use strict';

module.exports.hello = (event, context, callback) => {

  var exec = require('child_process').exec;

  var CircleCI = require('circleci');
  var ci = new CircleCI({
    auth: process.env.CIRCLECI_TOKEN
  });

  const params = require('./repos.js');

  var promises = [];
  for(var i=0; i < params.length; i++) {
      promises.push(ci.getBranchBuilds(params[i])
    );
  }

  var par_arg = '1';
  Promise.all(promises).then((results) => {
      for(var i=0; i < results.length; i++) {
        if ('success' == results[i][0].outcome) {
          par_arg = par_arg + ',g';
        }
        else {
          par_arg = par_arg + ',r';
        }
      }
      exec("curl https://api.particle.io/v1/devices/" + process.env.PARTICLE_DEVICE_ID + "/circleCi -d arg='"  + par_arg + "' -d access_token=" + process.env.PARTICLE_ACCESS_TOKEN);
  })
  .catch((e) => {
      // handle errors here
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };


  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
