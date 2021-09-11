const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			require: true,
			select: false,
		},
		avatar: {
			type: String,
		},
		follower: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
