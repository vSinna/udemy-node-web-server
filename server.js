const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((request, response, next) => {
    const now = new Date().toString()
    const log = `${now}: ${request.method}: ${request.url}`
    console.log(log)
    fs.appendFile('data/server.log', log +'\n', (error) => {
        if( error) {
            console.log(error)
        }
    } )

    next()

})

// app.use((request, response, next) => {
//     response.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))






hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (message) => {
    return message.toUpperCase()
})

app.get('/', (request, response) => {
    //response.send(`<h1>Hello Express!</h1>`)
    response.render('index.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Welcome to GreenyDay"
    })

})

app.get('/about', (request, response) => {

    response.render('about.hbs', {
        pageTitle: 'About Page',

    })
})

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Unable to handle request"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})