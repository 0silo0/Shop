const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/create', userController.createUser)
router.post('/login', userController.Login)
router.get('/userAll', userController.getUsers)
router.get('/get/:user_id', userController.getOneUser)
router.put('/update/:user_id', userController.updateUser)
router.delete('/delete/:user_id', userController.deleteUser)


module.exports = router