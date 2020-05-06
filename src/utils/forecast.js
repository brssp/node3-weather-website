const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d43a73201394682f8b8f25da729309cc&query=' + latitude + ', ' + longitude
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to get response from web API.', undefined)
        } else if (body.success === false) {
            callback('Unable to find this location, try again!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". The current temperature is " + body.current.temperature + ". It feels like " + body.current.feelslike + ".")
        }
    })
}

module.exports = forecast