const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;  // Choose the environment variable for the port

// Middleware for serving static folders
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());


// Send HTML file
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/src/index.html');
});

// Send email from user to me (implement the sending of a confirmation email)
app.post('/', (request, response) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: process.env.SMTPPORT,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name: ${request.body.name}</li>
      <li>Email: ${request.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${request.body.message}</p>
  `

  const mailOptions = {
    from: request.body.useremail,
    to: process.env.EMAIL,
    subject: `lambolead.com - Message from ${request.body.email}: ${request.body.name}`,
    // text: request.body.message,
    html: output
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      response.send("error");
    } else {
      console.log("Email sent successfully!");
      response.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});