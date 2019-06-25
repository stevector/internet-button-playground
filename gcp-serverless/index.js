'use strict'
const config = require('./config.json')
const getColorCodes = require('./getColorCodes')
const got = require('got')

const callParticleApi = async (deviceId, colorList) => {
  // const colorList = 'g,g,r,g,g,g,g,g,g,g,g'
  // const colorList = await getColorCodes()
  const particleURL = 'https://api.particle.io/v1/devices/' + deviceId + '/circleCi'

  try {
    const response = await got.post(particleURL, {
      form: true,
      body: {
        arg: colorList,
        access_token: config.PARTICLE_TOKEN
      }
    })
    console.log(response.body)
  } catch (error) {
    console.log(error.response.body)
  }
}

exports.callparticle = (request, response) => {
  const deviceId = request.query.coreid
  const makeRequest = async () => {
    const colorList = await getColorCodes()
    await callParticleApi(deviceId, colorList)
    response.status(200).send(colorList)
  }
  makeRequest()
}

exports.event = (event, callback) => {
  callback()
}
