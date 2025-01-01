const jwt = require('jsonwebtoken')

async function mentorAuth(req, res, next) {
    try {
        console.log('Router: Auth Mentor')
        
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'unauthorized: token not provided' })
        }

        const secretKey = process.env.JWT_SECRET_KEY
        const decodedToken = jwt.verify(token, secretKey)

        if (!decodedToken) {
            return res.status(401).json({ message: 'unauthorized user' })
        }

        const tokenRoll = decodedToken.roll 

        if (tokenRoll !== 'mentor' && tokenRoll !== 'admin') {
            return res.status(401).json({ message: 'user not authorized' })
        }
        
        req.mentor = decodedToken
    
        next()
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(500).json({ message: err.message || 'internal server error' })
    }
}

module.exports = { mentorAuth }