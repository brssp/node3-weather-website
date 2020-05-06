const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Setting variable with paths
const pathPublic = path.join(__dirname, '../public')
const pathTemplates = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')

//Configure express server
app.use(express.static(pathPublic))
app.set('view engine', 'hbs')
app.set('views', pathTemplates)
hbs.registerPartials(pathPartials)


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Boris Spaniol'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Boris Spaniol'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Boris Spaniol'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an adress.'
        })
    }
    
    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({error: error})
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            res.send({
                location: data.placename,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404.hbs',{
        title: 'Error:',
        message: 'Help article not found.',
        name: 'Boris Jeronimo'
    })
})

app.get('*', (req,res) => {
    res.render('404.hbs', {
        title: '404 Error:',
        message: 'Page not found.',
        name: 'Boris Jeronimo'
    })
})


app.listen(3000, () => {
    console.log('Hosting on port 3000')
})