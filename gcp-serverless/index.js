'use strict'
const config = require('./config.json')
const { getColorCodes } = require('./getColorCodes')
const callParticleApi = require('./callParticleApi')

exports.callparticle = (request, response) => {
  // @todo, does this var need to be escaped?
  

  const makeRequest = async () => {
    const colorList = await getColorCodes(config.GITHUB_TOKEN)
    const configObject = {
      "colorList": colorList,
      "deviceId": request.query.coreid,
      "particleToken": config.PARTICLE_TOKEN     
    }

    await callParticleApi(configObject)
    response.status(200).send(colorList)
  }
  makeRequest()
}

exports.event = (event, callback) => {
  callback()
}
