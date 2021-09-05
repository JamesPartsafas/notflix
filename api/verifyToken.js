//Middleware to verify JWT token before request can access sensitive information or the database

const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(' ')[1] //Get token

        jwt.verify(token, process.env.HASH_KEY, (err, user) => {
            if (err) {
                res.status(403).json('Token is not valid')
                return
            }
            
            req.user = user
            next()
        })
    }
    else {
        return res.status(401).json('You are not authenticated')
    }
}

module.exports = verify