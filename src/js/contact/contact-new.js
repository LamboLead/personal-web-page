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
      "english": "Something wrong has occurred. Try again later",
      "español": "Hubo un error en el envío del correo electrónico. Inténtelo de nuevo más tarde"
    },
    svg: ""
  },
  disabled: {
    class: "is-form-disabled",
    message: {
      "english": "You can send new messages until",
      "español": "Puede enviar nuevos mensajes hasta"
    },
    svg: ""
  }
}

const contactForm = new FormHandler.Form("contact-form", inputFields, submitForm, {
  disableForm: true,
  attempts: 3,
  disablingTime: 1,
  disableCallback: () => {
    alert("This form is disabled!");
  }
}, formStates);

const form = document.getElementById(contactForm.id);
const fields = form.querySelector(".form-wrapper");
const confirmation = form.querySelector(".confirmation-wrapper")
const confirmationButton = confirmation.querySelector("button");

async function submitForm(data) {
  console.table(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success")
    }, 5000)
  });

  // let xhr = new XMLHttpRequest();
  // xhr.open('POST', '/');
  // xhr.addEventListener("load", () => {
  //   console.log(xhr.responseText);
  //   if (xhr.responseText === "success") {
  //     alert("Email sent");
  //   } else {
  //     alert("Something went wrong!");
  //   }
  // });
  // xhr.send(JSON.stringify(data));
}

// function changeLoadingState(state) {
//   let form = document.getElementById(contactForm.id);
//   form.classList.add("is-contact-card-hidden");
//   confirmation.classList.remove("is-contact-card-hidden");
//   confirmation.classList.add("is-form-submitting");
//   // Remove other states
//   Object.keys(formLoadingState).forEach((item) => {
//     confirmation.classList.remove(formLoadingState[item].class)
//   });
//   confirmation.classList.add(formLoadingState[state].class)
// }

export default contactForm;