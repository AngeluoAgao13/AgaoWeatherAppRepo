const request = require ('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiYW5nZ2UtMTMiLCJhIjoiY2t1ZTE5a3h2MWcwcDJvcXBxMm84aXcyYSJ9.xg7dw3AOGlreVcUib80RjA&limit=1'

    request ({ url, json: true }, ( error, { body }) => {
        if (error) {
            callback('Unable to connect to the internet', undefined) 
         } else if  (body.features.length === 0) {
            callback('Unable to find Location. Try another Search', undefined) 
       }else {
           callback(undefined, {
               latitude: body.features[0].center[0],
               longitude: body.features[0].center[1],
               location: body.features[0].place_name
               
           })
       }
    })
}     

module.exports = geocode 