const Comment = require('../models/comment.model')
const Post = require('../models/post.model')
const User = require('../models/user.model')

// add comment
module.exports.add = async (req, res) => {
	try {
		// find post
		const post = await Post.findById(req.params.id)
		if (!post)
			return res.status(400).json({
				success: false,
				message: 'The post was not found',
			})

		// create and save comment
		const comment = new Comment({
			postId: req.params.id,
			userId: req.userId,
			content: req.body.content,
		})

		await comment.save()
		await comment.populate('userId')

		res.status(200).json({
			success: true,
			message: 'Comment successfully',
			comment,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Post comment failed.',
		})
	}
}
