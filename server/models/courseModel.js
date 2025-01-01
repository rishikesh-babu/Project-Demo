const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
            unique: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbKg6GjwsV1gED28b9noFwQVvLtP0kdsoWRUGh8zqBu7TGU9Azl45J8J-SLT1PGoChLTU&usqp=CAU",
        },
        mentor: {
            type: mongoose.Types.ObjectId,
            ref: "Mentor",
        },
    }, { timestamps: true }
)

const Course = mongoose.model('Course', courseSchema)
module.exports = { Course }