const router = require('express').Router()
const controller = require('../controllers/auth.controller')
const uploadAvatar = require('../middlewares/uploadAvatar.middleware')
const verifyToken = require('../middlewares/verifyToken')

// register
router.post('/register', uploadAvatar.single('avatar') ,controller.register)


// login
router.post('/login', controller.login)


// check if user is logging
router.post('/logging', verifyToken, controller.logging)


module.exports = router