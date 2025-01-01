const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        courses: [{
            courseId: {
                type: mongoose.Types.ObjectId,
                ref: 'Course',
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    }
)

// cartSchema.methods.calculateTotalPrice = function() {
//     this.totalPrice = this.courses.reduce((total, course) => total + course.price, 0)
// }

cartSchema.methods.calculateTotalPrice = function () {
    let total = 0

    this.courses.forEach((course) => {
        total = total + course.price
    });

    this.totalPrice = total

    return total
}

const Cart = mongoose.model('Cart', cartSchema)
module.exports = { Cart }