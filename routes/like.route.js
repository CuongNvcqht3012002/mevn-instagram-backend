const router = require('express').Router();
const controller = require('../controllers/like.controller')

const verifyToken = require('../middlewares/verifyToken')


router.put('/:id', verifyToken, controller.like)

module.exports = router