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
}),
// user create
router.post('/', (req, res) => {
    const newUser = new User(req.body.user)
    newUser.save()
    .then((user) => {
        res.json(user)
    }).catch((err) =>
    console.log('error from creating new user route', err))
}),
// user show
router.get('/:userId', (req, res) => {
    User.findById(req.params.userId).then(user =>{
        user.activity = user.activity.reverse()
        res.json(user)
    })
    .catch((err)=>
    console.log('error from usercontroller for show user and activities', err))
}),
//user edit
router.get('/:userId/edit', (req, res)=> {
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
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true}).then(() => {
res.redirect(`${req.params.userId}`)
    })
})

// delete user
router.delete('/:userId', (req, res) => {
    User.findByIdAndRemove(req.params.userId).then(user => {
        user.save()
        res.json('200 status. Deleted.')
    })
}),
// new activity
router.post('/:userId/activities', (req, res) => {
User.findById(req.params.userId).then(user => {
    const newActivity = new Activity(req.body.activity)
    console.log(req.body.activity)
    user.activity.push(newActivity)
    user.save()
    .then((user) => {
        res.json(newActivity)
    })
})
}),

// show activity: 
router.get('/:userId/activity/:activityId/', (req, res) => {
    User.findById(req.params.userId).then(()=>{

    
    Activity.findById(req.params.activityId).then((activity) => {
res.json(activity, {activity, userId: req.params.userId})
    })
})
})

// edit activity
router.get('/:userId/activities/:activityId/edit', (req, res) => {
User.findById(req.params.userId).then(()=> {
Activity.findById(req.params.activityId).then(activity => {
    res.json(activity, {activity, userId: req.params.userId})
})
})
})

// delete activity
router.delete('/:userId/activities/:activityId', (req, res) => {
    User.findById(req.params.userId).then(user => {
       const filterUserActivity = user.activity.filter(activity => activity._id.toString() !== req.params.activityId)
       user.activity = filterUserActivity
       user.save()
       .then(user=>{
           user.activity = user.activity.reverse()
           res.json(user, activities)
       })
    })
}),
//update activity
router.patch('/:userId/activities/:activitiesId', (req, res) => {
    User.findById(req.params.userId).then(user => {
        const update = req.body.activity
        const activity = user.activity.id(req.params.activityId)
        Activity.findByIdAndUpdate(id, {$set: {new: true}})
        if (update.title) {
            activity.title = update.title
        }
        if (update.description) {
            activity.description = update.description
        }
        if (update.legal) {
            activity.legal = update.legal
        }
        user.save().then((user) => {
            user.activity = user.activity.reverse()
            res.json(user)
        })
    })
})
//where it says "user.activity", that is referencing the schemas
module.exports = router