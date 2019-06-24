'use strict'
var exec = require('child_process').exec
const config = require('./config.json')
// const got = require('got')

exports.callparticle = (request, response) => {



  const makeRequest = async () => {
    // const value1 = await promise1()
    // const value2 = await promise2(value1)
    // return promise3(value1, value2)




    const colorList = 'g,g,r,g,g,g,g,g,g,g,g'

    exec('curl https://api.particle.io/v1/devices/' + config.BALANCE1_ID + "/circleCi -d arg='" + colorList + "' -d access_token=" + config.PARTICLE_TOKEN)
    // got.post("https://api.particle.io/v1/devices/" + config.BALANCE1_ID + "/circleCi",{
    //   body: {
    //     arg: colorList,
    //     access_token: config.PARTICLE_TOKEN
    //   }
    // })
    response.status(200).send(colorList)
    
  }
  makeRequest()



  
}

exports.event = (event, callback) => {
  callback()
}
