const port = 4000;
const express = require("express");
const app = express();
const pg = require("pg");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/product.routes')

app.use(express.json());
app.use('/api', userRouter)
app.use('/addproduct', productRouter)

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// upload endpoint for img
app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const 


app.use(cors());


app.listen(port, () => console.log(`server started on post ${port}`))