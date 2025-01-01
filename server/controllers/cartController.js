const { Cart } = require("../models/cartModel");
const { Course } = require("../models/courseModel");

async function getCart(req, res, next) {
    try {
        const userId = req.user.id;
        console.log('userId :>> ', userId);

        const cart = await Cart.findOne({ userId }).populate('courses.courseId')
        console.log('cart :>> ', cart);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        res.status(200).json({ message: 'cart item fetched', data: cart })
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(500).json({ message: err.message || 'internal server error' })
    }
}

async function addCourseToCart(req, res, next) {
    try {
        console.log('Router: add course to cart')

        const userId = req.user.id
        console.log('userId :>> ', userId);

        const { courseId } = req.body
        console.log('courseId :>> ', courseId);

        const course = await Course.findOne({ _id: courseId })

        if (!course) {
            return res.status(404).json({ message: 'course not found' })
        }

        let cart = await Cart.findOne({ userId })
        
        if (!cart) {
            cart = new Cart({
                userId,
                courses: []
            })
            console.log('Created new cart')
        }
        
        console.log('cart :>> ', cart);

        const courseExist = cart.courses.some((item) => item.courseId.equals(courseId))

        console.log('courseExist :>> ', courseExist);

        if (courseExist) {
            return res.status(400).json({ message: 'course already in cart' })
        }

        cart.courses.push({
            courseId,
            price: course.price,
        })

        cart.calculateTotalPrice();
        console.log('cart :>> ', cart);

        await cart.save();
        
        res.status(200).json({ message: 'course added to cart', data: cart })
        
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(500).json({ message: err.message || 'internal server error' })
    }
}

async function removeCourseFromCart(req, res, next) {
    try {
        console.log('Router: remove course from cart')

        const userId = req.user.id
        const { courseId } = req.body

        console.log('courseId :>> ', courseId);
        console.log('userId :>> ', userId);

        const cart = await Cart.findOne({ userId }).populate('courses.courseId')

        if (!cart) {
            return res.status(400).json({ message: 'cart not found' })
        }

        // cart.courses = cart.courses.filter((item) => !item.courseId.equals(courseId))
        cart.courses = cart.courses.filter((course) => !course.courseId.equals(courseId)); 
        console.log('cart.courses :>> ', cart.courses);

        cart.calculateTotalPrice()
        
        console.log('cart :>> ', cart);

        await cart.save()
        
        res.status(200).json({ message: 'course removed', data: cart})
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(500).json({ message: err.message || 'internal server error' })
    }
}

module.exports = { getCart, addCourseToCart, removeCourseFromCart }