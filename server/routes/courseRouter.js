const express = require('express')
const { getCourseDetails, getAllCourse, createCourse } = require('../controllers/courseController')
const { upload } = require('../middlewares/multer')
const { mentorAuth } = require('../middlewares/mentorAuth')
const { userAuth } = require('../middlewares/userAuth')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: course')
    next()
})

router.post('/create-course', mentorAuth, upload.single('image'), createCourse)
router.get('/get-all-courses', getAllCourse)
router.get('/get-courseDetails/:courseId', getCourseDetails)
router.put('update-course')
router.delete('/course-delete')

router.get('/get-latest-course')
router.get('/search-courses')

const courseRouter = router
module.exports = { courseRouter }