const express = require('express')
const { userAuth } = require('../middlewares/userAuth')
const { getCart, addCourseToCart, removeCourseFromCart } = require('../controllers/cartController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Router: Cart')
    next()
})

router.get('/get-cart-item', userAuth, getCart)
router.post('/add-to-cart', userAuth, addCourseToCart)
router.delete('/remove-cart-item', userAuth, removeCourseFromCart)

const cartRouter = router
module.exports = { cartRouter }