const express = require('express')
const cors = require('cors')
// const proxy = require('./controller.js')
const cntl = require('./controller.js')
const port = process.env.PORT || 7777

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('client'))
// app.use('/', proxy())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/img', cntl.getImg)
app.post('/img', cntl.addImg)


app.listen(port, () => console.log(`Port ${port} is up!`))