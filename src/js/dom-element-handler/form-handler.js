/**
 * This is the Form handler module.<br>
 * It stores functions related to the set up and handling of forms in the webpage.
 * @module FormHandler
 */

import database from '../storage/database-object.js';
import * as DatabaseInfoModule from '../storage/information-management-module.js';

export class Form {
  constructor(id, inputFields, onSubmit, {disableForm = false, attempts = undefined, disablingTime = undefined, disableCallback = undefined}, stateOptions = undefined) {
    this.id = id;
    this.inputFields = inputFields;
    this.usable = true;
    this.onSubmit = onSubmit;
    this.language = "español";
    this.disablingOptions = {
      disable: disableForm,
      attemptsPerPeriod: attempts,
      attemptsLeft: attempts,
      disablingTime: disablingTime,
      callback: disableCallback
    }
    this.stateOptions = stateOptions
    this.initializeForm();
  }

  async initializeForm() {
    // Set up event listeners
    let form = document.getElementById(this.id);
    let fields = form.querySelector(".form-wrapper");
    let confirmation = form.querySelector(".confirmation-wrapper");
    let confirmationButton = confirmation.querySelector("button");
    // Form submitting
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submitForm();
    });
    // New form
    confirmationButton.addEventListener("click", () => {
      Object.keys(this.stateOptions).forEach((item) => {
        form.classList.remove(this.stateOptions[item].class);
      });
      fields.classList.remove("is-form-section-hidden");
      confirmation.classList.add("is-form-section-hidden");
    })

    // Check if there is any info about contact messages on initialization
    let formInfo = (await DatabaseInfoModule.retrieveInfo(database, "Contact messages", {query: 1}))[0];
    if (!formInfo) {
      formInfo = {
        "last sent at": undefined,
        "messages left": this.disablingOptions.attemptsPerPeriod
      }
      DatabaseInfoModule.saveInfo(database, "Contact messages", {value: formInfo});
      return;
    }
    this.disablingOptions.attemptsLeft = formInfo["messages left"];

    // Check if the form is usable on initialization
    if (this.disablingOptions.disable) {
      if (!(await this.isFormUsable())) {
        this.changeFormState("disabled");
      }
    }
  }

  checkInputs() {
    if (this.validFields) return;
    this.inputFields.forEach((input) => {
      let inputElement = document.querySelector(`#${this.id} ${input.selector}`);
      if (!input.pattern.test(inputElement.value)) {
        // Show error message
        alert(input.errorMessages[this.language]);
        input.valid = false;
      } else {
        // Show correct message
        input.valid = true;
      }
    });
    return this.inputFields.every(input => input.valid);
  }

  async submitForm() {
    if (!this.isFormUsable()) return;
    if (!this.checkInputs()) return;
    this.changeFormState("loading");
    let formData = {};
    this.inputFields.forEach((input) => {
      let inputElement = document.querySelector(`#${this.id} ${input.selector}`);
      formData[input.name] = inputElement.value;
      inputElement.value = '';
    });
    let response = await this.onSubmit(formData);
    await this.saveInfo(formData);

    // Check if the form is usable on initialization
    if (this.disablingOptions.disable) {
      this.disablingOptions.attemptsLeft--;
      if (!(await this.isFormUsable())) {
        this.disablingOptions.callback();
        this.changeFormState("disabled");
        return;
      }
    }
  
    if (response === "success") {
      this.changeFormState("success")
    } else {
      this.changeFormState("error")
    }
  }

  async saveInfo(message) {
    if (this.disablingOptions.disable) {
      let formInfo = {
        "last sent at": new Date(),
        "messages left": this.disablingOptions.attemptsLeft
      }
      await DatabaseInfoModule.saveInfo(database, "Contact messages", {key: 1, value: formInfo});
    }
    await DatabaseInfoModule.saveInfo(database, "Contact messages", {value: message});
  }

  async isFormUsable() {
    let formInfo = (await DatabaseInfoModule.retrieveInfo(database, "Contact messages", {query: 1}))[0];
    let [lastSent, messagesLeft] = [formInfo["last sent at"], formInfo["messages left"]];
    console.log(lastSent, messagesLeft);

    if (messagesLeft > 0 || (!lastSent)) {
      return true;
    } else {
      let then = new Date(lastSent);
      let now = new Date();
      let diffHours = (now - then) / (3600*1000);
      if (diffHours > this.disablingOptions.disablingTime) {
        let formInfo = {
          "last sent at": then,
          "messages left": this.disablingOptions.attemptsPerPeriod
        }
        DatabaseInfoModule.saveInfo(database, "Contact messages", {key: 1, value: formInfo});
        return true;
      } else {
        return false;
      }
    }
  }

  changeFormState(state) {
    if (!this.stateOptions) return;
    let form = document.getElementById(this.id);
    let fields = form.querySelector(".form-wrapper");
    let confirmation = form.querySelector(".confirmation-wrapper");
    // Hide fields
    fields.classList.add("is-form-section-hidden");
    confirmation.classList.remove("is-form-section-hidden");
    // Remove existing classes
    Object.keys(this.stateOptions).forEach((item) => {
      form.classList.remove(this.stateOptions[item].class);
    });
    // Add desired state and show desired message
    let desiredState = this.stateOptions[state];
    form.classList.add(desiredState.class);
    console.log(desiredState, this.language);
    confirmation.querySelector(".confirmation-message").innerHTML = desiredState["message"][this.language];
  }
}

export class Input {
  constructor(name, selector, regexPattern, errorMessages) {
    this.name = name;
    this.selector = selector;
    this.pattern = regexPattern;
    this.errorMessages = errorMessages;
    this.valid = false;
  }
}
