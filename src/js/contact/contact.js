import * as InputHandler from '../dom-element-handler/input-handler.js';

const form = document.getElementById("contact-form");
const name = form.querySelector("[name=your-name]");
const email = form.querySelector("[name=your-email]");
const message = form.querySelector("[name=how-can-i]");
const submitButton = form.querySelector("[type=submit]");
const confirmation = document.getElementById("contact-confirmation")
const confirmationButton = confirmation.querySelector("button");

window.addEventListener('keydown', (e) => {
  if (e.keyIdentifier=='U+000A' || e.keyIdentifier=='Enter' || e.keyCode==13) {
    if (e.target.nodeName=='INPUT' && e.target.type=='text') {
      e.preventDefault();
      return false;
    }
  }
}, true);

InputHandler.handleUserInput(
  "#contact-form [name=your-name]",
  {
    flag: "REGEX",
    errorMessage: {
      "english": "At least four letters in its beginning",
      "español": "Al menos cuatro letras al principio"
    },
    pattern: /^[a-zA-Z]{4,}.*/
  },
  (value) => {
    console.log(value);
  },
  false
);
InputHandler.handleUserInput(
  "#contact-form [name=your-email]",
  {
    flag: "REGEX",
    errorMessage: "You must insert a valid email",
    pattern: /.*@(.|\.){1,}/
  },
  (value) => {
    console.log(value);
  },
  false
);
InputHandler.handleUserInput(
  "#contact-form [name=how-can-i]",
  {
    flag: "REGEX",
    errorMessage: "Your message must have at least one word with three letters",
    pattern: /^([\w\d\,\.]{1,}\s){2,}\.*[\w\d\,\.\s]{1,}$/
  },
  (value) => {
    console.log(value);
  },
  false
);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.classList.add("is-contact-card-hidden");
  confirmation.classList.remove("is-contact-card-hidden");
  let emailInfo = {
    username: name.value,
    useremail: email.value,
    message: message.value
  };
  console.table(emailInfo);

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.addEventListener("load", () => {
    console.log(xhr.responseText);
    if (xhr.responseText === "success") {
      alert('Email sent');
      InputHandler.clearInput("#contact-form [name=your-name]")
      InputHandler.clearInput("#contact-form [name=your-email]")
      InputHandler.clearInput("#contact-form [name=how-can-i]")
    } else {
      alert('Something went wrong');
    }
  });

  xhr.send(JSON.stringify(emailInfo));
});

confirmationButton.addEventListener("click", () => {
  confirmation.classList.add("is-contact-card-hidden");
  form.classList.remove("is-contact-card-hidden")
})

/**
 * Validaciones:
 * El nombre debe tener más de 4 letras
 * El email debe ser un email
 * El mensaje debe tener más de 2 palabras
 */

/**
 * Cosas por hacer
 * - Validaciones
 * - Clase y estilos para indicar que el mensaje fue enviado
 * - Escribir código para comunicarse con BackEnd
 * - Escribir código en BackEnd para enviar email
 * - Escribir código para confirmar que el mensaje fue enviado
 */

import * as FormHandler from '../dom-element-handler/form-handler.js';

let inputFields = [
  new FormHandler.Input(
    "name",
    "[name=your-name]",
    /^[a-zA-Z]{4,}.*/,
    {
      english: "Your name must have at least four letters at the beginning",
      español: "Su nombre debe tener al menos cuatro letras al inicio"
    }
  ),
  new FormHandler.Input(
    "email",
    "[name=your-email]",
    /.*@(.|\.){1,}/,
    {
      english: "You must insert a valid email",
      español: "Debe insertar un correo electrónico válido"
    }
  ),
  new FormHandler.Input(
    "message",
    "[name=how-can-i]",
    /^[a-zA-Z0-9]{3,}.*/,
    {
      english: "Your message must have at least one word with three letters",
      español: "Su mensaje debe tener al menos una palabra con tres letras"
    }
  )
]

const contactForm = new FormHandler.Form("contact-form", inputFields, submitForm);
