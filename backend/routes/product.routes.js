const Router = require('express')
const router = new Router()
const productController = require('../controller/product.controller')

router.post('/create-product', productController.createProduct)
router.get('/getproduct', productController.getProducts)
router.get('/getproduct/:product_id', productController.getProduct)
router.delete('/delete-product/:product_id', productController.deleteProduct)


module.exports = router