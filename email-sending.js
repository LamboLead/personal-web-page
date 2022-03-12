require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');
const exHandleBars = require('nodemailer-express-handlebars');
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const people = require("./acknowledgements/info.js");

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
    extname: ".handlebars",
    partialsDir: path.resolve(__dirname, "views"),
    defaultLayout: false
  },
  viewPath: path.resolve(__dirname, "views"),
  extName: ".handlebars"
}));

function setUpMessage(subject) {
  let message = {
    title: `Saludos, ${subject.name}`,
    parag1: `LamboLead Tech quiere invitarl${subject.pronom} a visitar su nueva página web. Escondido en lo profundo de la lógica hay un regalo para usted. Para verlo, lea atentamente:`,
    messageTitle: "Siga las instrucciones al pie de la letra:",
    message: `
      <ol>
        <li>Haga click en el logo o en la dirección <a href="https://lambolead.com">lambolead.com</a></li>
        <li>Explore la página</li>
        <li>Diríjase a la sección de 'Contacto'</li>
        <li>En los siguientes campos, digite la siguiente información, <b><i>justo como se muestra en pantalla</b></i>:
          <ul>
            <li>Nombre: <b>${subject.name}</b></li>
            <li>E-mail: <i>(su dirección de correo, preferiblemente de gmail)</i></li>
            <li>Mensaje: <b>${subject.pass}</b></li>
          </ul>
        </li>
        <li>Haga click en 'Hablemos'</li>
        <li>Sonría :)</li>
      </ol>
    `,
    parag2: "Gracias por su atención!",
    footerTitle1: "Qué puedo hacer por usted?",
    footerInfo1: "Puedo ayudarle a hacer crecer su negocio y la confianza de sus clientes, mejorar su presencia online, y mucho más.",
    footerTitle2: "Información de contacto:",
    footerInfo21: "Carrera 44 #18-56. Ciudad del Río. Medellín, Antioquia, Colombia",
    footerInfo22: "+57 318 309 9879"
  }
  return message;
}

// Send emails
(async() => {
  people.acknowledgements.forEach(async (person) => {
    let mailOptions = {
      from: `"Juan David López" <${process.env.EMAIL}>`,
      to: "lopezlopezdavid8g@gmail.com", // cambiar
      subject: "Tiene un nuevo mensaje!",
      template: 'email',
      context: setUpMessage(person)
    }
    let mailPromise = await transporter.sendMail(mailOptions);
    console.log(mailPromise);
  });
})();