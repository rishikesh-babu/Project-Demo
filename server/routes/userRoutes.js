const express = require('express')
const { userSignup, userLogin, userProfile, userLogout, userCheck, userResetPassword } = require('../controllers/userControllers')
const { userAuth } = require('../middlewares/userAuth')

const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: user')
    next()
})

router.post('/signup', userSignup)
router.post('/login', userLogin)

router.get('/profile', userAuth, userProfile)
router.put('/logout', userAuth, userLogout)

router.put('/reset-password', userAuth, userResetPassword)
router.put('/profile-update')
router.delete('/delete-account')

router.get('/check-user', userAuth, userCheck)

const userRouter = router
module.exports = { userRouter }