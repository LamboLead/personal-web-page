import * as DropdownHandler from "../dom-element-handler/dropdown-handler.js";
import english from "./en.js";
import español from "./es.js";

let languages = [
  {display: "English", id: "en", svg: "language/UK.svg"},
  {display: "Español", id: "es", svg: "language/ES.svg"}
];

(async () => {
  await DropdownHandler.createDropdown("drop-language", "#language .change-language", languages, changeLanguage);
  let browserLang = navigator.language.match(/[a-z]/g).join("");
  changeLanguage(browserLang);
  DropdownHandler.updateDisplay("drop-language", browserLang);
})();

// Retrieve browser language and render it

/**
 * 
 * @param {string} langId Id of the default language used by the browser
 * @returns {void}
 */
function changeLanguage(langId) {
  switch (langId) {
    case "en":
      updateLang(english);
      break;
    case "es":
      updateLang(español);
      break;
    default:
      return;
  }

  function updateLang(lang) {
    // Change normal text
    Object.entries(lang.text).forEach((entry) => {
      let element = document.querySelectorAll(`[data-lang=${entry[0]}]`);
      element.forEach((elem) => elem.innerHTML = entry[1])
    });
    // Change placeholder on inputs
    Object.entries(lang.placeholders).forEach((entry) => {
      let input = document.querySelectorAll(`[data-lang=${entry[0]}]`);
      input.forEach((elem) => elem.setAttribute("placeholder", entry[1]));
    });
  }
}