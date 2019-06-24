'use strict'
var exec = require('child_process').exec
const config = require('./config.json')
const getColorCodes = require('./getColorCodes')
const got = require('got')



  const makeRequest = async (colorList) => {
    //const colorList = 'g,g,r,g,g,g,g,g,g,g,g'
    
    const particleURL = "https://api.particle.io/v1/devices/" + config.BALANCE1_ID + "/circleCi"

	try {
        const response = await got.post(particleURL,{
            form: true,
            body: {
              "arg": colorList,
              "access_token": config.PARTICLE_TOKEN
            }
          })
          console.log(response.body);
	
	} catch (error) {
		console.log(error.response.body)
	}

  }



  const runall = async () => {


  const colorList = await getColorCodes()
  makeRequest(colorList);

}
runall()
