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
    this.language = "es";
    this.disablingOptions = {
      disable: disableForm,
      attemptsPerPeriod: attempts,
      disablingTime: disablingTime,
      attemptsLeft: attempts,
      lastSentAt: false,
      callback: disableCallback
    };
    this.stateOptions = stateOptions;
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
    // Inputs
    this.inputFields.forEach((input) => {
      let inputElement = form.querySelector(input.selector);
      inputElement.addEventListener("keyup", () => {
        this.checkInputs();
      });
    });

    // Check if there is any info about contact messages on initialization
    let formInfo = (await DatabaseInfoModule.retrieveInfo(database, "Contact messages", {query: 1}))[0];
    if (!formInfo) {
      this.saveLastMessageInfo(this.disablingOptions.lastSentAt, this.disablingOptions.attemptsPerPeriod);
      return;
    }
    this.disablingOptions.attemptsLeft = formInfo["messages left"];
    this.disablingOptions.lastSentAt = formInfo["last sent at"];

    // Check if the form is usable on initialization
    if (this.disablingOptions.disable) {
      let isUsable = await this.isFormUsable();
      if (!isUsable) {
        this.changeFormState("disabled", [await this.usableUntil()]);
      }
    }
  }

  checkInputs() {
    if (this.validFields) return;
    let submitButton = document.querySelector(`#${this.id} [type=submit]`);
    this.inputFields.forEach((input) => {
      let inputElement = document.querySelector(`#${this.id} ${input.selector}`);
      let validMessageElement = inputElement.nextElementSibling;
      let validMessage = input.errorMessages[this.language];
      validMessageElement.innerText = validMessage;
      if (!input.pattern.test(inputElement.value)) {
        // Show error message
        validMessageElement.classList.add("invalid-input-message");
        inputElement.classList.add("invalid-input");
        // alert(input.errorMessages[this.language]);
        inputElement.classList.remove("valid-input");
        input.valid = false;
        
      } else {
        validMessageElement.classList.remove("invalid-input-message");
        inputElement.classList.add("valid-input");
        inputElement.classList.remove("invalid-input")
        input.valid = true;
        
      }
    });
    let verification = this.inputFields.every(input => input.valid);
    if (verification) {
      submitButton.classList.remove("disabled-button");
    } else {
      submitButton.classList.add("disabled-button");
    }
    return verification;
  }

  async submitForm() {
    if (!this.isFormUsable()) return;
    if (!this.checkInputs()) return;
    this.changeFormState("loading");
    let formData = {};
    let submitButton = document.querySelector(`#${this.id} [type=submit]`);
    this.inputFields.forEach((input) => {
      let inputElement = document.querySelector(`#${this.id} ${input.selector}`);
      formData[input.name] = inputElement.value;
      inputElement.value = '';
      inputElement.classList.remove("valid-input");
    });
    formData.language = this.language;
    submitButton.classList.add("disabled-button");
    let response = await this.onSubmit(formData);
    console.log("Server response:", response);
    if (response === "error") {
      this.changeFormState("error");
      return;
    }
    await this.saveInfo(formData);

    // Check if the form is usable
    if (this.disablingOptions.disable) {
      this.disablingOptions.attemptsLeft--;
      let isUsable = await this.isFormUsable();
      this.disablingOptions.lastSentAt = new Date();
      await this.saveLastMessageInfo(this.disablingOptions.lastSentAt, this.disablingOptions.attemptsLeft);
      if (!isUsable) {
        this.changeFormState("successDisabled", [await this.usableUntil()]);
        return;
      }
    }
  
    if (response === "success") {
      this.changeFormState("success")
    }
  }
  
  async saveLastMessageInfo(lastSent, attemptsLeft) {
    if (!this.disablingOptions.disable) return;
    let formInfo = {
      "last sent at": lastSent,
      "messages left": attemptsLeft
    }
    await DatabaseInfoModule.saveInfo(database, "Contact messages", {key: 1, value: formInfo});
  }

  async saveInfo(message) {
    await DatabaseInfoModule.saveInfo(database, "Contact messages", {value: message});
  }

  async isFormUsable() {
    let lastSent = this.disablingOptions.lastSentAt;
    let attemptsLeft = this.disablingOptions.attemptsLeft;

    if (attemptsLeft > 0 || (!lastSent)) {
      return true;
    } else {
      let then = new Date(lastSent);
      let now = new Date();
      let diffHours = (now - then) / (3600*1000);
      // console.log("Difference in hours:", diffHours);
      if (diffHours > this.disablingOptions.disablingTime) {
        this.disablingOptions.attemptsLeft = this.disablingOptions.attemptsPerPeriod
        await this.saveLastMessageInfo(then, this.disablingOptions.attemptsLeft);
        return true;
      } else {
        return false;
      }
    }
  }

  changeFormState(state, complementInfo = undefined) {
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
    // Add desired state
    let desiredState = this.stateOptions[state];
    form.classList.add(desiredState.class);
    console.log(desiredState, this.language);
    // Show desired message
    let message = desiredState["message"][this.language];
    if (complementInfo) {
      complementInfo.forEach((info) => {
        message = message.replace(/\*/, info);
      });
    }
    confirmation.querySelector(".confirmation-message").innerHTML = message
  }

  async usableUntil() {
    let formInfo = (await DatabaseInfoModule.retrieveInfo(database, "Contact messages", {query: 1}))[0];
    let lastSent = formInfo["last sent at"];
    lastSent = (new Date(lastSent)).getTime();
    let timePeriod = this.disablingOptions.disablingTime*3600*1000;
    let timeUntil = new Date(lastSent + timePeriod);
    timeUntil = `${timeUntil.getHours()}:${timeUntil.getMinutes()}`;
    return timeUntil;
  }

  updateMessages() {
    // Update input validation messages
    this.inputFields.forEach((input) => {
      let inputElement = document.querySelector(`#${this.id} ${input.selector}`);
      let validMessageElement = inputElement.nextElementSibling;
      let validMessage = input.errorMessages[this.language];
      validMessageElement.innerText = validMessage;
    });
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
