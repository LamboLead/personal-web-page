/**
 * Light theme module. Loaded if the network speed is less than 3Mb/s
 */

import * as SwitchHandler from '../dom-element-handler/switch-handler.js';
import database from '../storage/database-object.js';
import * as DatabaseInfoModule from '../storage/information-management-module.js';
import imageManager from '../images/image-manager.js';
import animationManager from '../animations/animations-full.js';

// Anonymous asynchronous function that waits for currentTheme to render the according animation
export async function initThemeLight() {
  imageManager.currentTheme = await retrieveTheme();
  SwitchHandler.setUpSwitch(".switch-container-div", ".inside-switch-div", {
    leftValue: "dark-theme",
    rightValue: "light-theme",
    callback: renderTheme
  });
}

let firstTime = true;
/**
 * Renders the specified theme and its corresponding animation on the screen and saves it into the database
 * @function renderTheme
 * @param {string} classTheme Name of the theme to display on the screen
 */
export function renderTheme(classTheme) {
  // Render theme
  let body = document.querySelector("body");
  let currentTheme = body.getAttribute("data-current-theme")
  body.classList.remove(currentTheme);
  body.classList.add(classTheme);
  body.setAttribute("data-current-theme", classTheme);

  // Change theme in imageManager and render according animation
  imageManager.currentTheme = classTheme;
  let currentSection = imageManager.currentSection;
  if (!firstTime) {
    imageManager.setNewImage(currentSection);
    imageManager.showImage(currentSection);
    saveTheme(classTheme);
  } else {
    firstTime = false;
  }

  imageManager.loadImage({name: "tutdlImage", type: "normal"}, imageManager.currentTheme);

  // Change about-me animation colors
  let aboutMeAnimationWrapper = document.querySelector("#who-am-i .animation-wrapper");
  aboutMeAnimationWrapper.classList = "animation-wrapper " + classTheme;
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
    saveTheme(retrievedTheme);
  };
  SwitchHandler.renderSwitch(".switch-container-div", ".inside-switch-div",
    {
      leftValue: "dark-theme",
      rightValue: "light-theme"
    }, retrievedTheme);
  return retrievedTheme;
}