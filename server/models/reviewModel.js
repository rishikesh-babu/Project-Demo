const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        courseId: {
            type: mongoose.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    {
        timestamps: true
    }
)

const Review = mongoose.model('Review', reviewSchema)
module.exports = { Review }