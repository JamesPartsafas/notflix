//Entry point of API

//Libraries imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

//Routes imports
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const moviesRoute = require('./routes/movies')
const listsRoute = require('./routes/lists')

dotenv.config()

const app = express()

const corsOptions = {
    origin: process.env.CLIENT
}
app.use(cors(corsOptions))

//Connect to database
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connection Successful'))
    .catch(err => console.log(err))

app.use(express.json())

//Implement routers
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', moviesRoute)
app.use('/api/lists', listsRoute)

//Start server
app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server running")
})