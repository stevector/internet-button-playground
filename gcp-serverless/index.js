'use strict'
const config = require('./config.json')
const getColorCodes = require('./getColorCodes')
const got = require('got')

const callParticleApi = async (particleToken, deviceId, colorList) => {
  // const colorList = 'g,g,r,g,g,g,g,g,g,g,g'
  // const colorList = await getColorCodes()
  const particleURL = 'https://api.particle.io/v1/devices/' + deviceId + '/circleCi'

  try {
    const response = await got.post(particleURL, {
      form: true,
      body: {
        arg: colorList,
        access_token: particleToken
      }
    })
    console.log(response.body)
  } catch (error) {
    console.log(error.response.body)
  }
}

exports.callparticle = (request, response) => {
  // @todo, does this var need to be escaped?
  const deviceId = request.query.coreid
  const particleToken = config.PARTICLE_TOKEN
  const makeRequest = async () => {
    const colorList = await getColorCodes()
    await callParticleApi(particleToken, deviceId, colorList)
    response.status(200).send(colorList)
  }
  makeRequest()
}

exports.event = (event, callback) => {
  callback()
}
