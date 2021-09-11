require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const verifyToken = async (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res.status(401).json({
			success: false,
			message: 'Access token was not found',
		})

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

		const user = await User.findById(decoded.userId)
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Access token was not found',
			})
		}

		req.userId = decoded.userId
		next()
	} catch (err) {
		res.status(403).json({
			success: false,
			message: 'Invalid token',
		})
	}
}

module.exports = verifyToken
