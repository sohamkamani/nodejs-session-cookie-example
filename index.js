const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { signinHandler, welcomeHandler, refreshHandler } = require('./handlers')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/signin', signinHandler)
app.get('/welcome', welcomeHandler)
app.post('/refresh', refreshHandler)

app.listen(8080)