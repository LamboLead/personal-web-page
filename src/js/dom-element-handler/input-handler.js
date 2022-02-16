/**
 * This is the Input element handler module.<br>
 * It stores functions related to the set up and handling of input elements in the webpage
 * @module InputHandler
 */

/**
 * Handles the user input from the specified input element. Supports 'Enter' and 'Escape' keys
 * @function handleUserInput
 * @param {string} inputSelector CSS selector of the input element
 * @param {function} onEnter Function to execute on 'Enter'
 * @param {*} [otherParams] Other parameters to tie to the onEnterFunction
 * @param {boolean} [clearAfterEnter] Indicator to clear input after pressing 'Enter'
 * @param {Object} [validation] Options to validate the input text
 */
export function handleUserInput(inputSelector, validation = {flag, errorMessage, pattern}, onEnter, clearAfterEnter = false) {
  let inputElement = document.querySelector(inputSelector);
  inputElement.addEventListener("keyup", (event) => {
    let inputValue = getUserInput(inputSelector);

    switch (event.code) {
      case "Enter":
        if (!validateInput(inputValue, validation.flag, validation.pattern)) {
          alert(validation.errorMessage); // Fix validation
          return;
        }
        onEnter(inputValue);
        if (clearAfterEnter) {
          clearInput(inputSelector);
          return;
        }
        inputElement.blur();
        break;
      case "Escape":
        clearInput(inputSelector); 
        break;
    }
  });

  inputElement.addEventListener("change", () => {
    inputElement.setAttribute("value", inputElement.value);
  });
}

/**
 * Returns the value inside the specified input element
 * @function getUserInput
 * @param {string} inputElementSelector CSS selector of the input element
 * @returns {string} Value inside the input element
 */
export function getUserInput(inputElementSelector) {
  return document.querySelector(inputElementSelector).value;
}

/**
 * Clears the content of the specified input
 * @param {string} inputElementSelector CSS selector of the input element
 */
export function clearInput(inputElementSelector) {
  let inputElement = document.querySelector(inputElementSelector);
  inputElement.value = "";
}

/**
 * Checks whether the specified value passes the specified test or not
 * @function validateInput
 * @param {string} value Value inserted by the user
 * @param {string} flag Flag specifying the check type. It supports "required" and "regex" flags
 * @param {RegExp} [validatorValue] Regular expression to perform the validation
 * @returns {boolean}
 */
export function validateInput(value, flag, validatorPattern = undefined) {
  switch (flag) {
    case "REQUIRED":
      return value.length > 0;
    case "REGEX":
      return validatorPattern.test(value);
    default:
      return true;
  }
}