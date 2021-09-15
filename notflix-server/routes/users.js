//Handles finding, modifying, and sending user information

const express = require('express')
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const verify = require('../verifyToken')

const router = express.Router()

//UPDATE
//Will modify email, username, and password, as passed in by body
router.put('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        
        //Change password
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password, 
                process.env.HASH_KEY
            ).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
                },
                {
                    new: true //return updated user
                }
            )
            res.status(200).json(updatedUser)
        } 
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You cannot update that account')
    }
})

//DELETE
//Delete accounts
router.delete('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('User has been deleted')
        } 
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You cannot delete that account')
    }
})

//GET
//Get user info
router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json(info)
    } 
    catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL
//Get all users' info
router.get('/', verify, async (req, res) => {

    const query = req.query.new //if there is query parameter ?new=true, return only 10 most recent users

    if (req.user.isAdmin) {
        
        try {
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
            res.status(200).json(users)
        } 
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You are not authorized to see all users')
    }
})

//GET USER STATS
router.get('/stats', async (req, res) => {
    try {
        //data returns an array of objects containing month and users created in that month
        const data = await User.aggregate([
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: {$sum:1}
                }
            }
        ])
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router