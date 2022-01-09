import * as DropdownHandler from "../dom-element-handler/dropdown-handler.js";
import english from "./en.js";
import español from "./es.js";

let languages = [
  {display: "English", id: "en"},
  {display: "Español", id: "es"}
];

DropdownHandler.createDropdown("drop-language", "#language .change-language", languages, changeLanguage);

// Retrieve browser language and render it
let browserLang = navigator.language.match(/[a-z]/g).join("");
let displayLang = languages.filter((lang) => {
  return lang.id === browserLang
})[0].display;
changeLanguage(browserLang);
DropdownHandler.updateDisplay("drop-language", displayLang);


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
    Object.entries(lang).forEach((entry) => {
      let element = document.querySelectorAll(`[data-lang=${entry[0]}]`);
      element.forEach((elem) => elem.innerHTML = entry[1])
    });
  }
}