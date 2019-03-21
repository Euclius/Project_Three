const express = require('express')
const User = require('../models/User.js')
const Activity = require('../models/Activity.js')
const router = express.Router()

router.get('/', (req, res) => {
    User.find().then(users => {
        res.json(users)
    }).catch((err) =>
    console.log('error from root/index usercontroller', err))
}),

router.post('/', (req, res) => {
    const newUser = new User(req.body.user)
    newUser.save()
    .then((user) => {
        res.json(user)
    }).catch((err) =>
    console.log('error from creating new user route', err))
}),

router.get('/:userId', (req, res) => {
    User.findById(req.params.userId).then(user =>{
        user.activity = user.activity.reverse()
        res.json(user)
    })
    .catch((err)=>
    console.log('error from usercontroller for show user and activities', err))
}),

router.post('/:userId/activities', (req, res) => {
User.findById(req.params.userId).then(user => {
    const newActivity = new Activity({})
    user.activity.push(newActivity)
    user.save()
    .then((user) => {
        res.json(newActivity)
    })
})
}),

router.delete('/:userId/activities/activities', (req, res) => {
    User.findById(req.params.userId).then(user => {
       const filterUserActivity = user.activity.filter(activity => activity._id.toString() !== req.params.activityId)
       user.activity = filterUserActivity
       user.save()
       .then(user=>{
           user.activity = user.activity.reverse()
           res.json(user, activities)
       })
    })
})
//where it says "user.activity", that is referencing the schemas
module.exports = router