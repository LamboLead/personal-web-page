import animationManager from "../animations/animations-full.js";
import { renderTheme } from "./theme-full.js";

initFullTheme();

function initFullTheme() {
  renderTheme(animationManager.currentTheme);
  animationManager.initialize();
  animationManager.loadAnimation(animationManager.currentSection, "startSession", animationManager.currentTheme);
}