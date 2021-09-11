const router = require('express').Router()
const controller = require('../controllers/user.controller')

// get user 
router.get('/:id', controller.getUser)

// get all user 
router.get('/', controller.getAllUsers)


module.exports = router