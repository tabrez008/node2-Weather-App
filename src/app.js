const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for express config
const publicDiretorypath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//set up handlebars engine and handlebar view
app.set('views' , viewsPath);
app.set('view engine' , 'hbs')
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDiretorypath))



// app.get('' , (req , res) => {
//     res.send('Hello express')
//})

// app.get('/help' , (req , res) => {
//     res.send('Helper page...')
// })
// app.get('/about' , (req , res) => {
//     res.send('<h1>About</h1>')
// })

app.get('' , (req , res) => {
    res.render('index' , {
        title : 'Weather',
        name : 'tabrez'
    })
})
app.get('/about' , (req , res) => {
    res.render('about' , {
        title : 'about me',
        name : 'tabrez'
    })
})
app.get('/help' , (req , res) => {
    res.render('help' , {
        helptext : 'some helpful text',
        title : 'Help',
        name : 'tabrez'
    })
})
app.get('/weather' , (req , res) => {
    if(!req.query.address)
    {
        return res.send({
            error : 'you must provide address term'
        })
    }
    geocode(req.query.address,(error ,{latitude,longitude,location} = {}) => {
        if(error) 
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error)
            return res.send({error})

            res.send({
                location : location,
                forecastData : forecastData,
                address : req.query.address
            })
        })
    })
    // res.send({
    //     location : 'india',
    //     forecast : '50 degree',
    //     address : req.query.address
    // })
})
app.get('help/*' , (req , res) => {
    res.render('404' , {
        errorMessage : 'Help article not found',
        title : '404 ',
        name : 'Tabrez'
    })
})
app.get('*' , (req , res) => {
    res.render('404' , {
        title : '404',
        name : 'Tabrez',
        errorMessage : 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('server is running....')
})