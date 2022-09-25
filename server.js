const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const { PORT, GMAIL_USERNAME, GMAIL_PASS } = process.env

const app = express();
app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", router);



const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USERNAME,
    pass: GMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});


app.post('/api/contact', (req,res) => {
  console.log(req.body)
  let { name, email, message } = req.body
  let payload = {
    from: email,
    to: GMAIL_USERNAME,
    subject: `Artisan House request from ${name}`,
    text: `From: ${email} Message: ${message}`,
  };
  contactEmail.sendMail(payload)
  res.status(200).send('email sent')
});


  app.listen(PORT, () => console.log(`Running on Port ${PORT}`));