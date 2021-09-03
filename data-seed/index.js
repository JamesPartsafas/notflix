//Entry point of data seeding application.
//This is a simple script to automate the initial population of the Notflix app

const axios = require('axios')
const videoData = require('./videoData.json')
const cheerio = require('cheerio')

require('dotenv').config()

//Pages from IMDB to be scraped. They are top-rated comedy, action, horror, sci-fi, fantasy, drama, animation movies and shows
const pages = [
    'https://www.imdb.com/search/title/?genres=comedy&sort=user_rating,desc&title_type=feature&num_votes=25000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=5aab685f-35eb-40f3-95f7-c53f09d542c3&pf_rd_r=5CNN6MFECX10X144XB92&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_gnr_5',
    'https://www.imdb.com/search/title/?genres=action&sort=user_rating,desc&title_type=feature&num_votes=25000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=5aab685f-35eb-40f3-95f7-c53f09d542c3&pf_rd_r=5CNN6MFECX10X144XB92&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_gnr_1',
    'https://www.imdb.com/search/title/?genres=horror&sort=user_rating,desc&title_type=feature&num_votes=25000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=5aab685f-35eb-40f3-95f7-c53f09d542c3&pf_rd_r=5CNN6MFECX10X144XB92&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_gnr_12',
    'https://www.imdb.com/search/title/?genres=sci_fi&sort=user_rating,desc&title_type=feature&num_votes=25000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=5aab685f-35eb-40f3-95f7-c53f09d542c3&pf_rd_r=5CNN6MFECX10X144XB92&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_gnr_17',
    'https://www.imdb.com/search/title/?genres=fantasy&sort=user_rating,desc&title_type=feature&num_votes=25000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=5aab685f-35eb-40f3-95f7-c53f09d542c3&pf_rd_r=5CNN6MFECX10X144XB92&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_gnr_9',
    'https://www.imdb.com/search/title/?genres=drama&sort=user_rating,desc&title_type=feature&num_votes=25000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=5aab685f-35eb-40f3-95f7-c53f09d542c3&pf_rd_r=5CNN6MFECX10X144XB92&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_gnr_7',
    'https://www.imdb.com/search/title/?genres=animation&sort=user_rating,desc&title_type=feature&num_votes=25000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=5aab685f-35eb-40f3-95f7-c53f09d542c3&pf_rd_r=5CNN6MFECX10X144XB92&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_gnr_3',

    'https://www.imdb.com/search/title/?genres=comedy&sort=user_rating,desc&title_type=tv_series,mini_series&num_votes=5000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=f85d9bf4-1542-48d1-a7f9-48ac82dd85e7&pf_rd_r=2PCMA83F3JS8YAZH1HVD&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_gnr_5',
    'https://www.imdb.com/search/title/?genres=action&sort=user_rating,desc&title_type=tv_series,mini_series&num_votes=5000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=f85d9bf4-1542-48d1-a7f9-48ac82dd85e7&pf_rd_r=2PCMA83F3JS8YAZH1HVD&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_gnr_1',
    'https://www.imdb.com/search/title/?genres=horror&sort=user_rating,desc&title_type=tv_series,mini_series&num_votes=5000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=f85d9bf4-1542-48d1-a7f9-48ac82dd85e7&pf_rd_r=2PCMA83F3JS8YAZH1HVD&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_gnr_13',
    'https://www.imdb.com/search/title/?genres=sci_fi&sort=user_rating,desc&title_type=tv_series,mini_series&num_votes=5000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=f85d9bf4-1542-48d1-a7f9-48ac82dd85e7&pf_rd_r=2PCMA83F3JS8YAZH1HVD&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_gnr_20',
    'https://www.imdb.com/search/title/?genres=drama&sort=user_rating,desc&title_type=tv_series,mini_series&num_votes=5000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=f85d9bf4-1542-48d1-a7f9-48ac82dd85e7&pf_rd_r=2PCMA83F3JS8YAZH1HVD&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_gnr_8',
    'https://www.imdb.com/search/title/?genres=animation&sort=user_rating,desc&title_type=tv_series,mini_series&num_votes=5000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=f85d9bf4-1542-48d1-a7f9-48ac82dd85e7&pf_rd_r=2PCMA83F3JS8YAZH1HVD&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_gnr_3'
]

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
        const res = await axios.get(pages[i])
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