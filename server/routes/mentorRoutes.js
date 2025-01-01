const express = require('express')
const { mentorSingnup, mentorLogin, mentorProfile, mentorLogout, mentorResetPassword, mentorCheck } = require('../controllers/mentorController')
const { mentorAuth } = require('../middlewares/mentorAuth')

const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: mentor')
    next()
})

router.post('/signup', mentorSingnup)
router.post('/login', mentorLogin)

router.get('/profile', mentorAuth, mentorProfile)
router.put('/logout', mentorAuth, mentorLogout)

router.put('/reset-password', mentorAuth, mentorResetPassword)
router.put('/profile-update')
router.delete('/delete-account')

router.get('/check-mentor', mentorAuth, mentorCheck)

module.exports = { mentorRouter: router } 