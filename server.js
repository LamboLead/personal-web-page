require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const exHandleBars = require('nodemailer-express-handlebars');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

// Middleware for serving static folders
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
app.use("/documents", express.static(path.join(__dirname, 'documents')));
app.use(express.json());

// Send HTML file
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/src/index.html');
});

// Send logo
app.get('/logo', (request, response) => {
  response.sendFile(__dirname + '/public/dark-logo.png');
});

// Send terms & conditions, privacy policy
app.get("/legal/terminos-y-condiciones", (request, response) => {
  response.sendFile(__dirname + "/documents/legal/terminos-y-condiciones.pdf");
});
app.get("/legal/politica-de-privacidad", (request, response) => {
  response.sendFile(__dirname + "/documents/legal/politica-de-privacidad.pdf");
});

// Send product catalog
app.get("/productos", (request, response) => {
  response.sendFile(__dirname + "/documents/products/catalogo-de-productos.pdf");
});

// Send admin and user an email
const transporter = nodemailer.createTransport({
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
transporter.use('compile', exHandleBars({
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "views"),
    defaultLayout: false
  },
  viewPath: path.resolve(__dirname, "views"),
  extName: ".handlebars"
}));

app.post('/', async (request, response) => {

  let sentToAdmin = await sendMailToAdmin(request.body);
  let sentToUser = await sendMailToUser(request.body);

  if (sentToAdmin && sentToUser) {
    response.send("success");
  } else {
    response.send("error");
  }
});

async function sendMailToAdmin(formBody) {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name: ${formBody.name}</li>
      <li>Email: ${formBody.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${formBody.message}</p>`;

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `lambolead.com - Message from ${formBody.email}: ${formBody.name}`,
    // text: request.body.message,
    html: output
  };

  let mailPromise = await transporter.sendMail(mailOptions);
  return mailPromise.accepted.length > 0;
}

async function sendMailToUser(formBody) {
  let language = formBody.language;
  const subjects = {
    "en": "You have sent a new message!",
    "es": "Ha enviado un nuevo mensaje!"
  };
  const contexts = {
    "en": {
      title: `Hello there, ${formBody.name}!`,
      parag1: `You have sent a message to LamboLead Tech. My name is Juan David, and I'm at your service.`,
      messageTitle: "This was your message:",
      message: formBody.message,
      parag2: `In a few moments, our team (me, really) will be answering you.`,
      footerTitle1: "What can I do for you?",
      footerInfo1: "I can help you grow your business, improve your online presence, build confidence in your clients, and much more.",
      footerTitle2: "Contact Info:",
      footerInfo21: "Carrera 44 #18-56. Ciudad del Río. Medellín, Antioquia, Colombia",
      footerInfo22: "+57 318 309 9879"
    }, 
    "es": {
      title: `Hola, ${formBody.name}!`,
      parag1: `Ha enviado un mensaje a LamboLead Tech. Mi nombre es Juan David, y estoy a su servicio.`,
      messageTitle: "Este fue su mensaje:",
      message: formBody.message,
      parag2: `En unos momentos, nuestro equipo (yo, realmente) le responderá.`,
      footerTitle1: "Qué puedo hacer por usted?",
      footerInfo1: "Puedo ayudarle a hacer crecer su negocio y la confianza de sus clientes, mejorar su presencia online, y mucho más.",
      footerTitle2: "Información de contacto:",
      footerInfo21: "Carrera 44 #18-56. Ciudad del Río. Medellín, Antioquia, Colombia",
      footerInfo22: "+57 318 309 9879"
    }
  }
  
  let mailOptions = {
    from: `"Juan David López" <${process.env.EMAIL}>`,
    to: formBody.email,
    subject: subjects[language],
    // text: `Your message: ${formBody.message}`
    template: 'email',
    context: contexts[language]
  }

  let mailPromise = await transporter.sendMail(mailOptions);
  console.log(mailPromise);
  return mailPromise.accepted.length > 0;
}

// Port setup
app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});