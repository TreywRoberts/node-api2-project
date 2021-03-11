// implement your server here
// require your posts router and connect it here
// require('dotenv').config()
const express = require('express');

const postRouter = require('./posts/posts-router.js')

const server = express();
server.use(express.json())


server.use('/api/posts', postRouter)
// if (process.env.NODE_ENV === 'development') {
//     const cors = require('cors')
//     server.use(cors())
// }

module.exports = server;