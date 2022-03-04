import * as FormHandler from '../dom-element-handler/form-handler.js';

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
if (w <= h) {
  document.querySelector("html, body").style.width = w;
  document.querySelector("html, body").style.height = h;
}

const inputFields = [
  new FormHandler.Input(
    "name",
    "[name=your-name]",
    /^[a-zA-Z]{4,}.*/,
    {
      "en": "At least four letters at the beginning",
      "es": "Al menos cuatro letras al inicio"
    }
  ),
  new FormHandler.Input(
    "email",
    "[name=your-email]",
    /.*@(.|\.){1,}/,
    {
      "en": "Insert a valid email",
      "es": "Inserte un correo electrónico válido"
    }
  ),
  new FormHandler.Input(
    "message",
    "[name=how-can-i]",
    /^([\w\d\,\.\?\&\!\$\(\)#%¡¿:áéíóúü]{1,}\s){2,}\.*[\w\d\s\,\.\?\!áéíóúü]{1,}$/,
    {
      "en": "At least three words",
      "es": "Al menos tres palabras"
    }
  )
]
const formStates = {
  loading: {
    class: "is-form-submitting",
    message: {
      "en": "Sending e-mail",
      "es": "Enviando correo electrónico"
    },
    svg: ""
  },
  success: {
    class: "form-has-submitted",
    message: {
      "en": "Your e-mail has been sent successfully!<br>A confirmation message will arrive soon",
      "es": "Correo electrónico enviado con éxito!<br>Pronto le llegará un mensaje de confirmación"
    },
    svg: ""
  },
  error: {
    class: "error-submitting-form",
    message: {
      "en": "Something wrong has occurred. Check the typed email or try again later",
      "es": "Hubo un error en el envío. Verifique el email ingresado o inténtelo de nuevo más tarde"
    },
    svg: ""
  },
  successDisabled: {
    class: "form-has-submitted-disabled",
    message: {
      "en": "Your e-mail has been sent successfully!<br>A confirmation message will arrive soon<br><br>You can send new messages until *",
      "es": "Correo electrónico enviado con éxito!<br>Pronto le llegará un mensaje de confirmación<br><br>Puede enviar nuevos mensajes hasta las *"
    }
  },
  disabled: {
    class: "is-form-disabled",
    message: {
      "en": "You can send new messages until *",
      "es": "Puede enviar nuevos mensajes hasta las *"
    },
    svg: ""
  }
}

const contactForm = new FormHandler.Form("contact-form", inputFields, submitForm, {
  disableForm: true,
  attempts: 3,
  disablingTime: 0.5,
  disableCallback: () => {
    alert("This form is disabled!");
  }
}, formStates);

async function submitForm(data) {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("success")
  //   }, 5000)
  // });
  console.log("Submitted data:", data);
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  let promise = new Promise((resolve, reject) => {
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
      resolve(xhr.responseText);
    });
  });
  console.log("Stringified data:", JSON.stringify(data));
  xhr.send(JSON.stringify(data));
  return await promise;
}


export default contactForm;