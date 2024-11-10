const Router = require('express')
const router = new Router()
const orderController = require('../controller/order.controller')

router.post('/create', orderController.createOrder)
router.get('/get', orderController.getOrders)
router.get('/get/:order_id', orderController.getInfoOrder)
router.put('/update/:order_id', orderController.updateOrder)
router.post('/delete', orderController.deleteOrder)


module.exports = router