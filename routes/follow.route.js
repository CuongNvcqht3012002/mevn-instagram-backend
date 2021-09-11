const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const controller = require('../controllers/follow.controller')

// follow a user
router.put('/:id', verifyToken, controller.follow)

module.exports = router
