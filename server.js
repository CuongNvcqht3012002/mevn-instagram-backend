require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const cors = require('cors')
const compression = require('compression')
const async = require('async')

// const authRoute = require('./routes/auth.route')
// const postRoute = require('./routes/post.route')
// const userRoute = require('./routes/user.route')
// const commentRoute = require('./routes/comment.route')
// const likeRoute = require('./routes/like.route')
// const followRoute = require('./routes/follow.route')

const app = express()
// app.use(helmet())
// app.use(express.json())
// app.use(cors())
app.use(compression())
app.use('/api/public', express.static('public'))

// import speed
function parallel(middlewares) {
	return function (req, res, next) {
		async.each(
			middlewares,
			function (mw, cb) {
				mw(req, res, cb)
			},
			next
		)
	}
}

app.use(parallel([helmet(), express.json(), cors()]))






// connect to database
mongoose.connect(
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bbo20.mongodb.net/instagram?retryWrites=true&w=majority`
)

// auth
app.use('/api/auth', require('./routes/auth.route'))

// posts
app.use('/api/posts', require('./routes/post.route'))

// user
app.use('/api/users', require('./routes/user.route'))

// comment
app.use('/api/comments', require('./routes/comment.route'))

// like
app.use('/api/like', require('./routes/like.route'))

// follow
app.use('/api/follow', require('./routes/follow.route'))


// test
app.get('/api/test', (req, res) => {
	res.status(200).json('Done backend!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
