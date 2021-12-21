import * as SwitchHandler from './dom-element-handler/switch-handler.js';
import database from './storage/database-object.js';
import * as DatabaseInfoModule from './storage/information-management-module.js';

/**
 * This is the theme module for Customization functionality.<br>
 * It exports functions related to the interaction and modification of the theme of the interface.<br><br>
 * Imports: {@link module:DOMElementHandler|DOMElementHandler (module)}, {@link module:Storage/database|database (object)}, {@link module:Storage/information-management|information-management (module)}
 * @module Customization/theme
 */

window.currentTheme = retrieveTheme();

SwitchHandler.setUpSwitch(".switch-container-div", ".inside-switch-div", {
  leftValue: "dark-theme",
  rightValue: "light-theme",
  callback: renderTheme
});

/**
 * Renders the specified theme on the screen and saves it into the database
 * @function renderTheme
 * @param {string} newTheme Name of the theme to display on the screen
 */
function renderTheme(classTheme) {
  window.currentTheme = classTheme;
  let body = document.querySelector("body");
  body.className = "shared";
  body.classList.add(classTheme);
  saveTheme(classTheme);
}

/**
 * Saves the selected theme into the database
 * @function saveTheme
 * @param {string} theme Theme to save into the database
 */
function saveTheme(classTheme) {
  DatabaseInfoModule.saveInfo(database, "Custom preferences", { key: "theme", value: classTheme});
}

/**
 * Retrieves theme from the database and renders it into the page
 * @async
 * @function retrieveTheme
 */
async function retrieveTheme() {
  let retrievedTheme = (await DatabaseInfoModule.retrieveInfo(database, "Custom preferences", { query: "theme" }))[0];
  if (!retrievedTheme) {
    retrievedTheme = "dark-theme";
  }
  renderTheme(retrievedTheme);
  SwitchHandler.renderSwitch(".switch-container-div", ".inside-switch-div",
    {
      leftValue: "dark-theme",
      rightValue: "light-theme"
    }, retrievedTheme);
  return retrievedTheme;
}

/**
 * Some things that you must do:
 * -> Set up theme switch
 * -> Set up functions for:
 * Render the specified theme
 * Save theme in database
 * Retrieve theme from the database
 * -> Set up your code so that you can add variations to your themes (later, after the MVP)
 * -> On Figma: Create components with different colors to tune themes nicely and painlessly.
 */