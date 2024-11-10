const Router = require('express')
const router = new Router()
const orderController = require('../controller/order.controller')

router.post('/create', orderController.createOrder)
router.post('/delete', )


module.exports = router