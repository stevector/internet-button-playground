'use strict'
const got = require('got')

module.exports = async (configObject) => {

  const {particleToken, deviceId, colorList } = configObject
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
