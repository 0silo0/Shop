const port = 4000;
const express = require("express");
const app = express();
const pg = require("pg");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')

app.use(express.json());
app.use('/api', userRouter)
app.use('/api', postRouter)

app.use(cors());


app.listen(port, () => console.log(`server started on post ${port}`))