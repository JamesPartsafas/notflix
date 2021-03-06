//Handles finding, modifying, and sending individual films

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

//Update
//Modify film data
router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.status(200).json(updatedMovie)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You are not authorized to modify movies')
    }
})

//DELETE
//Delete a film from the database
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json('The movie has been deleted')
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You are not authorized to delete movies')
    }
})

//GET
//Get film information
router.get('/find/:id', verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.status(200).json(movie)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//POST
//Get favorites film information
router.post('/favorites', /*verify,*/ async (req, res) => {
    try {
        const list = [{title: "My List", _id: "1", info: []}]
        const favorites = req.body.favorites

        for (let i = 0; i < favorites.length; i++) {
            const movie = await Movie.findById(favorites[i])
            list[0].info.push(movie)
        }

        res.status(200).json(list)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET RANDOM
//Get film information of a randomly selected film
router.get('/random', verify, async (req, res) => {
    const type = req.query.type //type determines if a series or movie should be returned
    let movie

    try {
        if (type === 'series') {
            movie = await Movie.aggregate([
                { $match: {isSeries: true } },
                { $sample: { size: 1 } }
            ])
        }
        else {
            movie = await Movie.aggregate([
                { $match: {isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(movie)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET SEARCH
//Get films that match search query
router.get('/search', verify, async (req, res) => {
    const inputRegex = new RegExp(req.query.input, 'i')
    let movie
    const responseSize = 8 //Limit number of items sent back to user

    try {
        movie = await Movie.find({title: inputRegex}).limit(responseSize)
        res.status(200).json(movie)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL
//Get all films from the database
router.get('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies.reverse()) //return array of movies with most recent at front
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You are not authorized to view all movies')
    }
})

module.exports = router