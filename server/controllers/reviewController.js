const { Course } = require("../models/courseModel");
const { Review } = require("../models/reviewModel");

async function addReview(req, res, next) {
    try {
        console.log('Router: Review')

        const userId = req.user.id;
        const { courseId, rating, comment } = req.body

        console.log('userId :>> ', userId);
        console.log('rating :>> ', rating);
        console.log('comment :>> ', comment);
        console.log('courseId :>> ', courseId);

        if (!rating) {
            return res.status(400).json({ message: 'select the rating' })
        }

        if (rating > 5 || rating < 1) {
            return res.status(400).json({ message: 'provide proper rating' })
        }

        const course = await Course.findById(courseId)
        console.log('course :>> ', course);

        if (!course) {
            return res.status(404).json({ message: 'course not found' })
        }

        const existReview = await Review.findOne({ userId, courseId })

        if (!existReview) {
            const newReview = new Review({
                userId,
                courseId,
                rating,
                comment
            })

            await newReview.save()
            res.json({ message: 'review added' })

        } else {
            existReview.rating = rating
            existReview.comment = comment

            await existReview.save()
            res.json({ message: 'review updated' })
        }
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(500).json({ message: err.message || 'internal server error' })
    }
}

async function getCourseReviews(req, res, next) {
    try {
        console.log('Router: get course reviews')

        const { courseId } = req.body
        console.log('courseId :>> ', courseId);

        if (!courseId) {
            return res.status(400).json({ message: 'course id is required' })
        }

        const review = await Review.find({ courseId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 })

        console.log('review.length :>> ', review.length);
        if (review.length === 0) {
            return res.status(404).json({ message: 'no reviews' })
        }

        res.json({ message: 'review fetched', data: review})

    } catch (err) {
        next(err)
    }
}

module.exports = { addReview, getCourseReviews }