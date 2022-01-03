// Animate loader logo & set up progressbar
import {startLoaderAnimation, logoTimeline} from "./animations/loader-animation.js";
import Progressbar from "./dom-element-handler/progressbar-handler.js";

let loadingProgressbar, networkSpeed;

startLoaderAnimation(async () => {
  loadingProgressbar = await loadProgressbar();
  init();
})

function init() {

  // import all SVGs()
  loadLanguage();
  loadingProgressbar.setProgress(0.3);
  setTimeout(() => {
    loadingProgressbar.setProgress(0.6);
    loadThemeAndAnimations();
    loadingProgressbar.setProgress(1);
    setTimeout(() => {
      hideLoader();
    }, 1000);
  }, 1000)
}

async function loadProgressbar() {
  console.log("Completed!");
  let progressbar = new Progressbar(
    "progress-1",
    {src: "/public/svg/other/progressbar.svg", parent: "#loader"},
    {toAnimate: "scaleX", default: {duration: 0.3, ease: "none"}},
    true
  );
  await progressbar.render()
  return progressbar;
}

function loadLanguage() {
  import ("./language/language-manager.js");
}

function loadThemeAndAnimations() {
  // Retrieve network & user info
  networkSpeed = window.navigator.connection.downlink;
  console.log(`Network speed: ${networkSpeed}Mb/s`);
  if (networkSpeed > 3.5) {
    // Load heavy theme
    import ("./theme/theme-full.js");
  } else {
    // Load light theme
    import ("./theme/theme-light.js");
  }
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