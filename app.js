const express = require('express')
const app = express()
const port = 3000
const postRouter = require('./routers/postsRouter.js');

app.use(express.static('public'))

app.use(express.json());

app.use('/posts', postRouter)

app.listen(port,() => {
    console.log(`Server listening on port: ${port}`);
})