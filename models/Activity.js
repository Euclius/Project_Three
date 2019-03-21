const {ActivitySchema} = require('../db/schema.js')
const mongoose = require('mongoose')

module.exports = mongoose.model('Activity', ActivitySchema)