require('dotenv').config()
const User = require('../models/user.model')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const imgbbUploader = require("imgbb-uploader");

// register
module.exports.register = async (req, res) => {
	const { username, password } = req.body
	let avatar = req.file
		? req.file.path
		: 'public/images/avatars/default-avatar.jpg'

	// check form
	if (!username || !password) {
		return res.status(400).json({
			success: false,
			message: 'Missing username and/or password',
		})
	}

	// start register
	try {
		// check if the user already exists
		const user = await User.findOne({ username })
		if (user) {
			return res.status(400).json({
				success: false,
				message: 'User already exists',
			})
		}

		// generate new password
		const hashedPassword = await argon2.hash(password)

		// up img to imgbb
		const upload = await imgbbUploader(process.env.IMGBB_KEY, avatar)
		

		let img = upload.url

		// create user
		const newUser = new User({
			username,
			password: hashedPassword,
			avatar: img,
		})

		// save user
		await newUser.save()

		// create token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		newUser.password = ''
		res.status(200).json({
			success: true,
			message: 'User created successfully',
			accessToken,
			user: newUser,
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Đăng kí không thành công'
		})
	}
}




// login
module.exports.login = async (req, res) => {
	const { username, password } = req.body

	// check form
	if (!username || !password)
		return res.status(400).json({
			success: false,
			message: 'Missing username and/or password',
		})

	// start login
	try {
		// check user and password
		const user = await User.findOne({ username }).select('+password')
		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'Incorrect username and/or password',
			})
		}

		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res.status(400).json({
				success: false,
				message: 'Incorrect username and/or password',
			})

		// ------ login success ------ 

		// return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)
		
		
		user.password = ''
		res.status(200).json({
			success: true,
			message: 'User logged successfully',
			accessToken,
			user: user,
		})
	} catch (err) {
		res.status(500).json(err)
	}
}



// check logging
module.exports.logging = async (req, res) => {
	try {
		const user = await User.findById(req.userId)
		if (!user)
			return res.status(403).json({
				success: false,
				message: 'Invalid token',
			})

		res.status(200).json({
			success: true,
			message: 'User already logged',
			user
		})
	} catch (err) {
		return res.status(403).json({
			success: false,
			message: 'Invalid token',
		})
	}
}
