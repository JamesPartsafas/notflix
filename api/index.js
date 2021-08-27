//Entry point of API

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const moviesRoute = require('./routes/movies')
const listsRoute = require('./routes/lists')

dotenv.config()

const app = express()

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
app.listen(process.env.PORT, () => {
    console.log("Backend server running")
})