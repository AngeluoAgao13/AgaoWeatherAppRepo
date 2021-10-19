const request = require ('request')

const forecast = (longitude, latitude, callback) => {
   const url = 'http://api.weatherstack.com/current?access_key=175197c5e885f6b5dd9f22cb919749d6&query=' + latitude + ',' + longitude  + '&units=f'

    request ({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to the internet', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined,body.current.weather_descriptions [0]+ '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast