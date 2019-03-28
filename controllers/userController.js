const express = require('express')
const User = require('../models/User.js')
const Activity = require('../models/Activity.js')
const router = express.Router()
// home/ index
router.get('/', (req, res) => {
    User.find().then(users => {
        res.json(users)
    }).catch((err) =>
        console.log('error from root/index usercontroller', err))
})

// user create
router.post('/', (req, res) => {
    const newUser = new User(req.body.user)
    newUser.save()
        .then((user) => {
            res.json(user)
        }).catch((err) =>
            console.log('error from creating new user route', err))
})

// user show
router.get('/:userId', (req, res) => {
    User.findById(req.params.userId).then(user => {
        user.activity = user.activity.reverse()
        res.json(user)
    })
        .catch((err) =>
            console.log('error from usercontroller for show user and activities', err))
})

//user edit
router.get('/:userId/edit', (req, res) => {
    User.findById(req.params.userId, {
        userName: req.body.email,
        password: req.body.password
    })
        .catch((err) => {
            console.log('error from user edit', err)
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
        console.log(req.body.activity)
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

// // edit activity
// router.get('/:userId/activities/:activityId/edit', (req, res) => {
//     User.findById(req.params.userId).then((user) => {
//         res.json(user.activity, { activity, userId: req.params.userId })

//     })
// })

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
    User.findById(req.params.userId).then(user => {
        const update = req.body
        console.log('error from patch', update)
    //    const updateActivity = user.activity.id(req.params.activityId)
        let oldActivity = user.activity.id(req.params.activityId)
        console.log(oldActivity)
        console.log(update)
        //this may not be working don't trust the bald guy
        oldActivity = update
        oldActivity.location = update.location
        user.save().then((user) => {
            user.activity = user.activity.reverse()
            res.json(user)
            res.json("saved successfully")
        })
    })
})
    // Activity.findByIdAndUpdate(req.params.activityId, req.body, { new: true })
    //     .then((activity) => {
    //         res.json(activity)
    //     }).catch((err) => {
    //         console.log(err)
    //         res.status(500).json(err)
    //     })
// })

//where it says "user.activity", that is referencing the schemas
module.exports = router