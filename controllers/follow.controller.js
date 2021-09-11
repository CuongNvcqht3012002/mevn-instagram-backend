const User = require('../models/user.model')

module.exports.follow = async (req, res) => {
	try {
		// get user followed
		// get user who is follower, from token
		const [userIsFollowed, user] = await Promise.all([
			User.findById(req.params.id),
			User.findById(req.userId),
		])

		if (!userIsFollowed) {
			return res.status(400).json({
				success: false,
				message: 'The user was not found',
			})
		}

		// handle request
		// if following
		if (user.following.includes(userIsFollowed._id)) {
			await Promise.all([
				user.updateOne({ $pull: { following: userIsFollowed._id } }),
				userIsFollowed.updateOne({ $pull: { follower: user._id } }),
			])

			res.status(200).json({
				success: true,
				follow: false,
				message: 'The user has been unfollowed',
			})
		} else {
			await Promise.all([
				user.updateOne({ $push: { following: userIsFollowed._id } }),
				userIsFollowed.updateOne({ $push: { follower: user._id } }),
			])

			res.status(200).json({
				success: true,
				follow: true,
				message: 'The user has been followed',
			})
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Call server is failed',
		})
	}
}
