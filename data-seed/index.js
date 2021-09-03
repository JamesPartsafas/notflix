//Entry point of data seeding application.
//This is a simple script to automate the initial population of the Notflix app

const axios = require('axios')
const cheerio = require('cheerio')
const videoData = require('./videoData.json') //List of available video files to associate to each film
const filmWebPages = require('./filmWebPages.json') //Pages from IMDB to be scraped. They are top-rated comedy, action, horror, sci-fi, fantasy, drama, animation movies and shows

require('dotenv').config()

const header = `Bearer ${process.env.TOKEN}`

//Retrieve data from movie API and assign it to an object
const createModels = async (ids) => {
    for (let i = 0; i < ids.length; i++) {
        const model = {}

        //Retrieve data and build model
        let res
        try {
            res = await axios.get(`http://www.omdbapi.com/?i=${ids[i]}&apikey=${process.env.API_KEY}`)
        }
        catch (err) {
            console.log(err)
            return
        }
        
        model.title = res.data.Title
        model.description = res.data.Plot
        model.img = res.data.Poster
        model.video = videoData[Math.floor(Math.random()*videoData.length)] //Choose random video
        model.year = res.data.Year
        model.rating = res.data.Metascore
        model.limit = res.data.Rated
        model.genre = res.data.Genre.split(",")[0] //Take only first genre tag
        if (res.data.Type === 'series')
            model.isSeries = true
        
        await saveMovie(model)
    }
}

//Save to database
const saveMovie = async (movie) => {
    try {
        await axios.post(`${process.env.API_LOCATION}/movies`, movie,
        {
            headers: {
                token: header
            }
        })
        console.log(`${movie.title} saved`)
    }
    catch (err) {
        console.log(err)
        return
    }
}

//Scrapes IMDB to get IDs of top rated movies
const getIds = async () => {

    let ids = []

    for (let i = 0; i < pages.length; i++) {
        const res = await axios.get(filmWebPages[i])
        const $ = cheerio.load(res.data)

        //Get href value to top 10 movies on the current page
        const links = $('.lister-item-header a:lt(10)').toArray().map((x) => { return $(x).attr('href')})

        //Get Id of chosen movies
        links.forEach((link) => {
            ids.push(link.split('/')[2])
        })
    }

    console.log('Ids obtained', ids)

    await createModels(ids)
}

getIds()