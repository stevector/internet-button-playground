'use strict'
const got = require('got')

module.exports = async (configObject) => {
  const { particleToken, deviceId, colorList } = configObject
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

    // Sample value
    // {"id":"500031000c51353432383931","last_app":"","connected":true,"return_value":1}
    console.log(response.body)
    return true
  } catch (error) {
    // Sample value
    // {"ok":false,"error":"timed out"}
    console.log(response.body)
    console.log(error.response.body)
    return false
  }
}
