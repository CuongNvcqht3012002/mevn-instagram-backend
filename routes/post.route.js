const router = require('express').Router()
const controller = require('../controllers/post.controller')
const uploadPost = require('../middlewares/uploadPost.middleware')

const verifyToken = require('../middlewares/verifyToken')

// create a post
router.post('/', verifyToken, uploadPost.single('postImg'), controller.post)


// get a post
router.get('/:id', controller.getPost)


// get all posts
router.get('/', controller.getAllPost)


// delete a post
router.delete('/:id', verifyToken ,controller.delete)


module.exports = router
