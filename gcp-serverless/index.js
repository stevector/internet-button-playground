'use strict'
const config = require('./config.json')
const getColorCodes = require('./getColorCodes')
const callParticleApi = require('./callParticleApi');

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
