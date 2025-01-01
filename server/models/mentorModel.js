const mongoose = require('mongoose')

const mentorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["mentor", "admin"],
            default: 'mentor'
        },
        password: {
            type: String,
            required: true,
        },
        course: [{
            type: mongoose.Types.ObjectId,
            ref: 'Course'
        }],
    }, { timestamps: true, }
)

const Mentor = mongoose.model('Mentor', mentorSchema)
module.exports = { Mentor }