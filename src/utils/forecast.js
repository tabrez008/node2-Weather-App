const request = require('request')

const forecast = (lat,long,callback) => {
      const url ='https://api.darksky.net/forecast/48d54fd6f408d2a5453c2623bb6314e5/' + lat + ',' + long
      request({url : url , json : true} , (error, {body}) => {
          if(error) {
              callback('Unable to connect to weather services...', undefined)
          } else if(body.error) {
              callback(undefined,'unable to find the location..')
          } else {
              callback(undefined,body.daily.data[0].summary + 'It is currently ' + 
                       body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability
                       + '% chance of rain.')
          }
      })
}

module.exports = forecast