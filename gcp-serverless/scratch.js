'use strict'
const getColorCodes = require('./getColorCodes')

const makeRequest = async () => {
  const colorList = await getColorCodes()
  console.log(colorList)
  // await callParticleApi(particleToken, deviceId, colorList)
}
makeRequest()