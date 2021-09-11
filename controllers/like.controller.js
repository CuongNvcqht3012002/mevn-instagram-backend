const Post = require('../models/post.model')

// like/unlike a post
module.exports.like = async (req, res) => {
	try {
		// get post
		const post = await Post.findById(req.params.id)

		// if the post was not found
		if (!post)
			return res.status(400).json({
				success: false,
				message: 'The post was not found',
			})

		// check like and toggle like
		if (!post.likes.includes(req.userId)) {
			await post.updateOne({ $push: { likes: req.userId } })
			res.status(200).json({
				success: true,
				liked: true,
				message: 'The post has been liked',
			})
		} else {
			await post.updateOne({ $pull: { likes: req.userId } })
			res.status(200).json({
				success: true,
				liked: false,
				message: 'The post has been disliked',
			})
		}
	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'The post was not found',
		})
	}
}
