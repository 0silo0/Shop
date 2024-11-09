const Router = require('express')
const router = new Router()
const cartItemController = require('../controller/cartItem.controller')

router.post('/addtocart', cartItemController.addCartItem)
router.post('/delete', cartItemController.deleteFromCartItem)
router.post('/get', cartItemController.getCartItems)


module.exports = router