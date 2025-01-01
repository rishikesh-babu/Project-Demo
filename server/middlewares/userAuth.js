const jwt = require('jsonwebtoken')

function userAuth(req, res, next) {
    try {
        console.log('Router: userAuth')
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: no token provided' })
        }

        const secretKey = process.env.JWT_SECRET_KEY
        const decodedToken = jwt.verify(token, secretKey)
        
        if (!decodedToken) {
            return res.status(401).json({ message: 'user not authorized'})
        }

        req.user = decodedToken

        next()

    } catch (error) {
        console.log('err.message in cokkies :>> ', err.message);
        res.status(error.statusCode || 500).json({ message: error.message || 'internal server error'})
    }
}

module.exports = { userAuth }