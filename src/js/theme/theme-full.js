/**
 * Full theme module. Loaded if the network speed is more than 3Mb/s
 */

import * as SwitchHandler from '../dom-element-handler/switch-handler.js';
import database from '../storage/database-object.js';
import * as DatabaseInfoModule from '../storage/information-management-module.js';
import animationManager from '../animations/animations-full.js';

let firstTime = true;

// Anonymous asynchronous function that waits for currentTheme to render the according animation
(async () => {
  animationManager.currentTheme = await retrieveTheme();
  animationManager.loadAnimation(animationManager.currentSection, "startSession", animationManager.currentTheme);
})();

SwitchHandler.setUpSwitch(".switch-container-div", ".inside-switch-div", {
  leftValue: "dark-theme",
  rightValue: "light-theme",
  callback: renderTheme
});

/**
 * Renders the specified theme and its corresponding animation on the screen and saves it into the database
 * @function renderTheme
 * @param {string} classTheme Name of the theme to display on the screen
 */
function renderTheme(classTheme) {
  // Change theme in animationManager and render according animation
  animationManager.currentTheme = classTheme;
  let currentSection = animationManager.currentSection;
  if (!firstTime) {
    animationManager.setNewAnimation(currentSection);
    animationManager.playAnimation(currentSection);
  } else {
    firstTime = false;
  }

  // Render theme
  let body = document.querySelector("body");
  body.className = "shared";
  body.classList.add(classTheme);
  saveTheme(classTheme)
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
  console.log(retrievedTheme);
  if (!retrievedTheme) {
    retrievedTheme = "dark-theme";
  }
  SwitchHandler.renderSwitch(".switch-container-div", ".inside-switch-div",
    {
      leftValue: "dark-theme",
      rightValue: "light-theme"
    }, retrievedTheme);
  renderTheme(retrievedTheme);
  return retrievedTheme;
}