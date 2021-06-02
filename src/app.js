const express = require('express')
const routes = require('./routes/routes')
const path = require('path')

const app = express()
console.log(path.join(__dirname, 'views'))

app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', routes)

module.exports = app;