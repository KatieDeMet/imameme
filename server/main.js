const express = require('express')
const cors = require('cors')
// const proxy = require('./controller.js')
const cntl = require('./controller.js')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('client'))
// app.use('/', proxy())

app.get('/img', cntl.getImg)
app.post('/img', cntl.addImg)


app.listen(7777, () => console.log("Port 7777 is up!"))