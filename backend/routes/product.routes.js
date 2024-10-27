const Router = require('express')
const router = new Router()
const productController = require('../controller/product.controller')

router.post('/post', productController.createProduct)
router.get('/post', productController.getPostByUser)


module.exports = router