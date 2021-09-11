const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			ref: 'User'
		},
		postId: {
			type: String,
			required: true,
			ref: 'Post'
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Comment', CommentSchema)