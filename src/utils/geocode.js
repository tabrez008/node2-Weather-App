const request = require('request')

const geocode = (address , callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address
               + '.json?access_token=pk.eyJ1IjoidGFicmV6MDA4IiwiYSI6ImNqdjBrcXM1OTFrZHozeW13eXI1c2YzdzEifQ.fxbIjKj3K9ZIeYKHISBVlg&limit=1'
    request({url , json : true} , (error,{body}) => {
        if(error) {
            callback('unable to connect to location services!' , undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find the location , try another one!..' , undefined)
        } else {
            callback(undefined , {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode