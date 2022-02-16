const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

const PORT = process.env.PORT || 5000;  // Choose the environment variable for the port

// Serving static files

app.use("/src", express.static(__dirname + "/src"));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/src/index.html');
});

// Send email from user to me (implement the sending of a confirmation email)
app.post('/', (request, response) => {
  console.log(request.body);
  const myEmail = "lopezlopezdavid8g@gmail.com";
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: myEmail,
      pass: "dyilraoppdvyupqn"
    }
  });
  const mailOptions = {
    from: request.body.useremail,
    to: myEmail,
    subject: `LamboLead - Message from ${request.body.useremail}: ${request.body.username}`,
    text: request.body.message
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
