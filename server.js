const express = require('express')
const logger = require('morgan')
const app = express()
const userController = require('./controllers/userController.js')

//middleware
app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '/client/build/'))

app.use('/api/users', userController)

// app.get('/', (req, res)=> {
//     res.send('idaho')
// })
app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
  })

const PORT = process.env.PORT || 1000
app.listen(PORT, () =>{
    console.log(`Need more magic at port ${1000}`)
})