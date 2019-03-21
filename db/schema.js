const mongoose = require('./connection.js')
const Schema = mongoose.Schema

const ActivitySchema = new Schema({
    title: {
        type: String,
        default:'New Title'
    },
    description: {
        type: String,
        default: 'New Description'
    },
    legal: String,
    created: {
        type: Date,
        default: new Date()
    }
})

const UserSchema = new Schema({
    userName: String,
    password: String,
    activity: [ActivitySchema]
})

module.exports = {
    ActivitySchema: ActivitySchema,
    UserSchema: UserSchema
}