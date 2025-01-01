const { cloudinaryInstance } = require("../config/cloudinary")
const { Course } = require("../models/courseModel")

async function getAllCourse(req, res, next) {
    try {
        console.log('Router: get all course')

        const courseList = await Course.find()
        res.json({ message: 'course-list fetched', data: courseList })
    } catch (err) {

    }
}

async function getCourseDetails(req, res, next) {
    try {
        console.log('Router: get course details')

        const { courseId } = req.params;
        const courseData = await Course.findById(courseId).populate('mentor')
        res.json({ message: 'course data fetched', data: courseData })

    } catch (err) {

    }
}

async function createCourse(req, res, next) {
    try {
        console.log('Router: create course')

        const { title, description, price, duration, image, mentor } = req.body

        const mentorId = req.mentor.id 

        if (!title || !description || !price || !duration) {
            return res.status(400).json({ message: 'all fields required' })
        }

        const courseExist = await Course.findOne({ title })

        if (courseExist) {
            return res.status(400).json({ message: 'course already exist' })
        }

        console.log('req.file :>> ', req.file);

        const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
            folder: 'Sampleproject/course',
        })).url;

        console.log('imageUrl :>> ', imageUrl);

        const courseData = new Course({
            title,
            description,
            price,
            duration,
            image: imageUrl,
            mentor: mentorId
        })

        await courseData.save()

        return res.json({ message: 'course data created', data: courseData })

    } catch (err) {
        console.log('err.message in course creation :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

module.exports = { getAllCourse, getCourseDetails, createCourse }