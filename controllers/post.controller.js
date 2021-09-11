const Post = require('../models/post.model')
const User = require('../models/user.model')
const Comment = require('../models/comment.model')
const imgbbUploader = require('imgbb-uploader')

// create a post
module.exports.post = async (req, res) => {
	let postImg = req.file
		? req.file.path
		: 'public/images/posts/default-avatar.jpg'

	try {
		const upload = await imgbbUploader(process.env.IMGBB_KEY, postImg)

		let img = upload.url

		const newPost = new Post({
			img,
			...req.body,
			userId: req.userId,
		})

		await newPost.save()
		await newPost.populate('userId')

		res.status(200).json({
			success: true,
			message: 'Post created successfully',
			post: newPost,
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Đăng bài không thành công',
		})
	}
}

// get a post
module.exports.getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post)
			return res.status(400).json({
				success: false,
				message: 'The post was not found',
			})

		// populate user
		await post.populate('userId')

		// get comment of post
		let comments = await Comment.find({ postId: post._id }).populate('userId')

		post._doc.comments = comments

		res.status(200).json({
			success: true,
			post,
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'The post was not found',
		})
	}
}

// get all posts
module.exports.getAllPost = async (req, res) => {
	try {
		let posts = await Post.find().populate('userId')

		let comments = await Comment.find().populate('userId')

		posts.forEach((post) => {
			post._doc.comments = []
			comments.forEach((comment) => {
				if (post._id == comment.postId) post._doc.comments.push(comment)
			})
		})

		// response result
		res.status(200).json({
			success: true,
			posts,
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'Request server failed.',
		})
	}
}

// delete a post
module.exports.delete = async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, userId: req.userId }
		const post = await Post.findOne(postDeleteCondition)
		if (!post)
			return res.status(400).json({
				success: false,
				message: 'Failed post deletion',
			})

		await post.deleteOne()
		res.status(200).json({
			success: true,
			message: 'Delete a post successfully.',
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Failed post deletion',
		})
	}
}
