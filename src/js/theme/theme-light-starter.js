import imageManager from "../animations/animations-light.js";
import { renderTheme } from "./theme-light.js";

initLightTheme();

function initLightTheme() {
  renderTheme(imageManager.currentTheme);
  imageManager.initialize();
  imageManager.loadImage(imageManager.currentSection, "startSession", imageManager.currentTheme);
}