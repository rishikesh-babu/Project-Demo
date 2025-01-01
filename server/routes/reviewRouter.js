const express = require('express')
const { userAuth } = require('../middlewares/userAuth')
const { addReview, getCourseReviews } = require('../controllers/reviewController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Review')
    next()
}) 

router.post('/add-review', userAuth, addReview)
router.get('/get-course-reviews', userAuth, getCourseReviews)
router.get('/get-user-reviews')

const reviewRouter = router
module.exports = { reviewRouter } 