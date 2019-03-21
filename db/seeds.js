require('dotenv').config()
const mongoose= require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const User = require('../models/User.js')
const Activity = require('../models/Activity.js')


const traderJoe = new Activity({
    title:'Loading Dock behind Trader Joes',
    description:'wonderful place for free flowers or bananas. Like after valentines day, they had so many flowers they could not sell, so I got them all because boyfriend brought me none :[',
    legal:'maybe'
})

const rvs = new Activity({
    title:'Browsing at Richards Variety Store',
    description:"everything here is so expensive, but if you browse for unique ideas, then buy it online, it's way cheaper!",
    legal:"yes"
})

const nemo = new User({
    userName:'Nemo',
    password:'swampsoda',
    activity: [traderJoe, rvs]
})

User.remove({})
.then(() => nemo.save())
.then(() => console.log('save successful'))
.then(() => mongoose.connection.close())