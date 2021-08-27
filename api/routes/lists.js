const express = require('express')
const Movie = require('../models/Movie')
const verify = require('../verifyToken')

const router = express.Router()

//Create
//Will create new film
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)

        try {
            const savedMovie = await newMovie.save()
            res.status(201).json(savedMovie)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You are not authorized to create movies')
    }
})

module.exports = router