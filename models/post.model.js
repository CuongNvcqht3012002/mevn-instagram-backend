const mongoose = require('mongoose')

const PostSchema = mongoose.Schema(
	{
		img: {
			type: String,
			required: true,
		},
		caption: {
			type: String,
			default: '',
		},
		location: {
			type: String,
			default: ''
		},
		likes: {
			type: Array,
			default: [],
		},
		userId: {
			type: String,
			ref: 'User'
		}
	},
	{ timestamps: true }
)


module.exports = mongoose.model('Post', PostSchema)