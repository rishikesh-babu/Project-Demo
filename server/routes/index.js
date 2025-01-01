const express = require('express')
const { mentorRouter } = require('./mentorRoutes')
const { courseRouter } = require('./courseRouter')
const { userRouter } = require('./userRoutes')
const { cartRouter } = require('./cartRouter')
const { reviewRouter } = require('./reviewRouter')

const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: index')
    next()
})

router.use('/user', userRouter)
router.use('/mentor', mentorRouter)
router.use('/course', courseRouter)
router.use('/cart', cartRouter)
router.use('/review', reviewRouter)

module.exports = { apiRouter: router }