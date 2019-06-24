'use strict'
var exec = require('child_process').exec
const config = require('./config.json')
const getColorCodes = require('./getColorCodes')
const got = require('got')

exports.callparticle = (request, response) => {
  const makeRequest = async () => {
    const colorList = 'g,g,r,g,g,g,g,g,g,g,g'
    // const colorList = await getColorCodes()
    const particleURL = "https://api.particle.io/v1/devices/" + config.BALANCE1_ID + "/circleCi"

    //exec('curl https://api.particle.io/v1/devices/' + config.BALANCE1_ID + "/circleCi -d arg='" + colorList + "' -d access_token=" + config.PARTICLE_TOKEN)
    const particleResponse = await got.post(particleURL,{
      body: {
        arg: colorList,
        access_token: config.PARTICLE_TOKEN
      }
    })
    console.log(particleResponse);
    response.status(200).send(colorList)
  }
  makeRequest()
}

exports.event = (event, callback) => {
  callback()
}
