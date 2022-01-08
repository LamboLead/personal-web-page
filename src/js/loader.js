// Animate loader logo & set up progressbar
import injectSVG from "./dom-element-handler/import-svg.js";
import {startLoaderAnimation, logoTimeline} from "./animations/loader-animation.js";
import Progressbar from "./dom-element-handler/progressbar-handler.js";
import importAllSVG from "./import-SVGs.js";

import {initThemeLight} from "./theme/theme-light.js";
import {initThemeFull} from "./theme/theme-full.js";

let loadingProgressbar, networkSpeed;

// Inject loader SVG and animate
(async () => {
  await injectSVG({id: "grouped-smoke-clouds", src: "loader-logo/grouped-smoke-clouds.svg", withDivContainer: false}, {parentSelector: "#loader .logo-smoke-wrapper"});
  await injectSVG({id: "loader-logo", src: "loader-logo/loader-logo.svg", withDivContainer: false}, {parentSelector: "#loader .logo-smoke-wrapper"});
  console.log("Injected!");

  startLoaderAnimation(async () => {
    loadingProgressbar = await loadProgressbar();
    init();
  })
})();


async function init() {

  loadingProgressbar.setProgress(0);
  // Inject all SVGs()
  await importAllSVG();
  loadingProgressbar.setProgress(0.3);
  // Load multilanguage
  loadLanguage();
  loadingProgressbar.setProgress(0.6);
  // Load theme and animations
  await loadThemeAndAnimations();
  loadingProgressbar.setProgress(1);
  setTimeout(() => {
    hideLoader();
  }, 1000)
}

async function loadProgressbar() {
  console.log("Completed!");
  let progressbar = new Progressbar(
    "progress-1",
    {src: "other/progressbar.svg", parent: "#loader"},
    {toAnimate: "scaleX", default: {duration: 0.3, ease: "none"}},
    true
  );
  await progressbar.render()
  return progressbar;
}

function loadLanguage() {
  import ("./language/language-manager.js");
}

async function loadThemeAndAnimations() {
  // Retrieve network & user info
  networkSpeed = window.navigator.connection.downlink;
  console.log(`Network speed: ${networkSpeed}Mb/s`);
  if (networkSpeed > 3.5) {
    // Load heavy theme
    await initThemeFull();
  } else {
    // Load light theme
    await initThemeLight();
  }
  import ("./animations/about-me-animation.js");
}

function loadScrollingAnimations() {
  import ("./scrolling-related.js");
}

function hideLoader() {
  // Kill loader animation
  logoTimeline.kill();

  // Remove all intended classes
  let loader = document.getElementById("loader");
  loader.classList.add("is-loader-invisible");
  let body = document.querySelector("body");
  body.classList.remove("is-loading-website");

  // Initialize theme
  if (networkSpeed > 3.5) {
    import ("./theme/theme-full-starter.js");
  } else {
    import ("./theme/theme-light-starter.js");
  }

  // Initialize scrolling animations
  loadScrollingAnimations();
}

/**
 * Some thoughts:
 * -> Try to code better classes to improve transition from loader to main section
 */