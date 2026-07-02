const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const { PORT = 5000, GMAIL_USERNAME, GMAIL_PASS } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

// Serve the static site (index.html, styles.css, script.js, assets/).
app.use(express.static(__dirname));

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
    console.log('Ready to Send');
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const payload = {
    from: email,
    to: GMAIL_USERNAME,
    subject: `Artisan House request from ${name}`,
    text: `From: ${email} Message: ${message}`,
  };
  contactEmail.sendMail(payload, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send('failed to send email');
    }
    res.status(200).send('email sent');
  });
});

// Fallback to the homepage for any unmatched route.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
