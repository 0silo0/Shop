const port = 4000;
const express = require("express");
const app = express();
const pg = require("pg");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')

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


const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    const { formData } = req.body;

    // Настройки почтового транспорта (используйте свои SMTP данные)
    const transporter = nodemailer.createTransport({
        service: "Gmail", // или другой почтовый сервис
        auth: {
            user: "your-email@gmail.com",
            pass: "your-email-password",
        },
    });

    const mailOptions = {
        from: formData.email,
        to: "recipient-email@gmail.com", // адрес, на который отправляется письмо
        subject: "Новый заказ",
        text: `
            Фамилия: ${formData.lastName}
            Имя: ${formData.firstName}
            Email: ${formData.email}
            Телефон: ${formData.phone}
            Адрес: ${formData.address}
            Город: ${formData.city}
            Почтовый индекс: ${formData.postalCode}
            Страна: ${formData.country}
            Метод доставки: ${formData.deliveryMethod}
            Метод оплаты: ${formData.paymentMethod}
            Пожелания: ${formData.notes}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email отправлен успешно" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при отправке email", error });
    }
});



app.listen(port, () => console.log(`server started on post ${port}`))