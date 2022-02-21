import * as FormHandler from '../dom-element-handler/form-handler.js';

const inputFields = [
  new FormHandler.Input(
    "name",
    "[name=your-name]",
    /^[a-zA-Z]{4,}.*/,
    {
      "english": "Your name must have at least four letters at the beginning",
      "español": "Su nombre debe tener al menos cuatro letras al inicio"
    }
  ),
  new FormHandler.Input(
    "email",
    "[name=your-email]",
    /.*@(.|\.){1,}/,
    {
      "english": "You must insert a valid email",
      "español": "Debe insertar un correo electrónico válido"
    }
  ),
  new FormHandler.Input(
    "message",
    "[name=how-can-i]",
    /^[a-zA-Z0-9]{3,}.*/,
    {
      "english": "Your message must have at least one word with three letters",
      "español": "Su mensaje debe tener al menos una palabra con tres letras"
    }
  )
]
const formStates = {
  loading: {
    class: "is-form-submitting",
    message: {
      "english": "Sending e-mail",
      "español": "Enviando correo electrónico"
    },
    svg: ""
  },
  success: {
    class: "form-has-submitted",
    message: {
      "english": "Your e-mail has been sent successfully!<br>A confirmation message will arrive soon",
      "español": "Correo electrónico enviado con éxito!<br>Pronto le llegará un mensaje de confirmación"
    },
    svg: ""
  },
  error: {
    class: "error-submitting-form",
    message: {
      "english": "Something wrong has occurred. Check your email or try again later",
      "español": "Hubo un error en el envío. Verifique su email o inténtelo de nuevo más tarde"
    },
    svg: ""
  },
  successDisabled: {
    class: "form-has-submitted-disabled",
    message: {
      "english": "Your e-mail has been sent successfully!<br>A confirmation message will arrive soon<br><br>You can send new messages until *",
      "español": "Correo electrónico enviado con éxito!<br>Pronto le llegará un mensaje de confirmación<br><br>Puede enviar nuevos mensajes hasta las *"
    }
  },
  disabled: {
    class: "is-form-disabled",
    message: {
      "english": "You can send new messages until *",
      "español": "Puede enviar nuevos mensajes hasta las *"
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