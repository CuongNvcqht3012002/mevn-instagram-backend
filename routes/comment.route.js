const controller = require('../controllers/comment.controller')
const verifyToken = require('../middlewares/verifyToken')
const router = require('express').Router()


// post a comment
router.post('/:id/add',  verifyToken, controller.add)



module.exports = router