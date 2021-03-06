import imageManager from "../images/image-manager.js";
import { renderTheme } from "./theme-light.js";

initLightTheme();

function initLightTheme() {
  renderTheme(imageManager.currentTheme);
  imageManager.initialize();
}