const express = require('express')
const User = require('../models/User.js')
const Activity = require('../models/Activity.js')
const router = express.Router()
// home/ index
router.get('/', (req, res) => {
    User.find().then(users => {
        res.json(users)
    })
})

// user create
router.post('/', (req, res) => {
    const newUser = new User(req.body.user)
    newUser.save()
        .then((user) => {
            res.json(user)
        })
})

// user show
router.get('/:userId', (req, res) => {
    User.findById(req.params.userId).then(user => {
        user.activity = user.activity.reverse()
        res.json(user)
    })

})

//user edit
router.get('/:userId/edit', (req, res) => {
    User.findById(req.params.userId, {
        userName: req.body.email,
        password: req.body.password
    })

})

//user update
router.put('/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true }).then(() => {
        res.redirect(`${req.params.userId}`)
    })
})

// delete user
router.delete('/:userId', (req, res) => {
    User.findByIdAndRemove(req.params.userId).then(user => {
        user.save()
        res.json('200 status. Deleted.')
    })
})

// new activity
router.post('/:userId/activities/:activityId', (req, res) => {
    User.findById(req.params.userId).then(user => {
        const newActivity = new Activity(req.body.activity)
        user.activity.push(newActivity)
        user.save()
            .then((user) => {
                res.json(newActivity)
            })
    })
})

// show activity: 
router.get('/:userId/activity/:activityId/', (req, res) => {
    User.findById(req.params.userId).then((user) => {
        const singleActivity = user.activity.id(req.params.activityId)
        res.json(singleActivity)
    })
})


// delete activity
router.delete('/:userId/activities/:activityId', (req, res) => {
    User.findById(req.params.userId).then(user => {
        const filterUserActivity = user.activity.filter(activity => activity._id.toString() !== req.params.activityId)
        user.activity = filterUserActivity
        user.save()
            .then(user => {
                user.activity = user.activity.reverse()
                res.json(user, activity)
            })
    })
})
//update activity
router.put('/:userId/activities/:activityId', (req, res) => {
const activity = req.params.activityId
const userId = req.params.userId
const updateActivity = req.body
User.findByIdAndUpdate(userId).then((user) => {
    const activityToUpdate = user.activity.id(activity)
    activityToUpdate.title = updateActivity.title
    activityToUpdate.description = updateActivity.description
    activityToUpdate.legal = updateActivity.legal
    return user.save()
}).then((user) => {
    res.json(user.activity.id(activity))
})
})


module.exports = router