const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()

function generateToken(user, roll) {
    const payload = {
        id: user.id,
        roll: roll
    }
    const secretKey = process.env.JWT_SECRET_KEY
    const options = {
        expiresIn: '1d'
    }

    const token = jwt.sign(payload, secretKey)
    return token
}

module.exports = { generateToken }