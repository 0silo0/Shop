const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/create', userController.createUser)
router.post('/login', userController.Login)
router.get('/userAll', userController.getUsers)
router.get('/get/:id', userController.getOneUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)


module.exports = router