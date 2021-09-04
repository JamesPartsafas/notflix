const express = require('express')
const List = require('../models/List')
const Movie = require('../models/Movie')
const verify = require('../verifyToken')

const router = express.Router()

//CREATE
//Will create new list
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body)

        try {
            const savedList = await newList.save()
            res.status(201).json(savedList)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You are not authorized to create lists')
    }
})

//DELETE
//Will delete list
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id)
            res.status(201).json('The list was successfully deleted')
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You are not authorized to delete lists')
    }
})

//GET
//Get selected list
router.get('/', verify, async (req, res) => {

    //Type query and genre query are used to filter lists. Each list document has a type and genre as a string value
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []
    const numOfLists = 5

    try {
        if (typeQuery) {
            //Returns only for a specific genre, else returns lists from all genres
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: numOfLists } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ])
            }
            else {
                list = await List.aggregate([
                    { $sample: { size: numOfLists } },
                    { $match: { type: typeQuery } }
                ])
            }
        }
        else {
            list = await List.aggregate([
                { $sample: { size: numOfLists } }
            ])
        }

        res.status(200).json(list)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//GET PAGE
//Get info for a full page load
router.get('/page', verify, async (req, res) => {

    //Type query and genre query are used to filter lists. Each list document has a type and genre as a string value
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []
    const numOfLists = 7

    try {
        if (typeQuery) {
            //Returns only for a specific genre, else returns lists from all genres
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: numOfLists } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ])
            }
            else {
                list = await List.aggregate([
                    { $sample: { size: numOfLists } },
                    { $match: { type: typeQuery } }
                ])
            }
        }
        else {
            list = await List.aggregate([
                { $sample: { size: numOfLists } }
            ])
        }

        //An array of objects, each containing a content array of movie IDs is returned.
        //Get info of each movie

        for (let i = 0; i < list.length; i++) {
            try {
                list[i].info = await Promise.all(list[i].content.map((movieId) => {
                    return Movie.findById(movieId)
                }))
            }
            catch (err) {
                res.status(500).json(err)
            }
        }
        
        res.status(200).json(list)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router