const User = require('../models/user.model')

// get user and his posts
module.exports.getUser = async (req, res) => {
	const userId = req.params.id

	try {
		const user = await User.findById(userId)

		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'User was not found',
			})
		}

		res.status(200).json({
			success: true,
			user,
		})
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: 'User was not found',
		})
	}
}

// get all users
module.exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.status(200).json({
			success: true,
			users,
		})
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: 'Call server failed',
		})
	}
}
