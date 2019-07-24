'use strict'
const config = require('./config.json')
const { getColorCodes } = require('./getColorCodes')
const callParticleApi = require('./callParticleApi')

const makeRequest = async (coreid) => {
  const colorList = await getColorCodes(config.GITHUB_TOKEN)
  
  const configObject = {
    'colorList': colorList,
    // @todo, does this var need to be escaped?
    'deviceId': coreid,
    'particleToken': config.PARTICLE_TOKEN
  }
  return await callParticleApi(configObject)
}

exports.makeRequest = makeRequest

exports.callparticle = async (request, response) => {
  const coreid = request.query.coreid
  const returnVal = await makeRequest(coreid, response)
  if (returnVal) {
    response.status(200).send('success')
  }
  else {
    response.status(500).send('fail')
  }
  
}

exports.event = (event, callback) => {
  callback()
}
