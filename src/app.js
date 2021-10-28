const path = require ('path')
const express = require ('express')
const hbs = require ('hbs') // where we are going to see our partials
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))  --->  //to point the public directory

const app = express()

// Define   paths for express config
const publicDirectoryPath = path.join(__dirname, '../public') //to point the public directory
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine an dviews location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// this function ay para ma search an app.com or any .com that we creat

// const dayjs = require('dayjs');
// let now = dayjs();
// console.log(now.format("ddd, MMM D"));




app.get('', (req, res) => { // this is for the index.html  main page 
    res.render('index', {
        title: 'Weather Forecast',
        name: 'AnggeAngge'
    })
})

app.get ('/about', (req, res) => {  //this is for the about page
    res.render('about', {
        title: 'About me',
        name: 'AnggeAngge',
        aboutMessage: 'This is the group members',
    })
})

// app.get ('/help',(req, res) =>{
//     res.render('help', {
//         helptext: 'do you wanna build a snowman?',
//         title: 'Help',
//         name: 'Angge Angge'
//     })
// }) 
app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send ({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send ({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        }) 
    })
    // res.send({
    //     forecast: 'Its summer',
    //     location: 'Philippines' ,
    //     address: req.query.address
    // })
})

app.get ('/products',(req, res) =>{

    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send ({
        products: []
    })
})
app.get('/help/*',(req, res ) => {
    res.render ('404', {
        title: '404',
        name: 'Angge Angge',
        errorMessage: 'Help article not found.'
    })
})

app.get ('*', (req, res) => {
    res.render ('404', {
        title: '404',
        name: 'Angge Angge',
        errorMessage: 'Sorry! Page not found.'
    })
})




app.listen(3000, () => {
    console.log("server is up on port 3000.")
})