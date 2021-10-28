const request = require ('request')
const dayjs = require('dayjs')

const forecast = (longitude, latitude, callback) => {
   const url = 'http://api.weatherstack.com/current?access_key=92f3134448f31d125685671f0c675387&query=' + latitude + ',' + longitude  + '&units=m'
   

    request ({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to the internet', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.current.temperature + '\xB0' + 'c' + ' ' + body.current.weather_descriptions [0]+ ' ' ) //+ ' degree out. the humidity is ' + body.current.humidity + '%.')  //+ body.current.feelslike  + ' degree ')  //' ' + body.location.localtime  +
        }
    })
}


module.exports = forecast

