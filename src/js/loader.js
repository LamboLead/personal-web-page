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


function init() {
  loadingProgressbar.setProgress(0);
  setRandomProgressBetween(0.1, 0.2);

  setTimeout(async () => {
    // Inject all SVGs()
    await importAllSVG();
    setRandomProgressBetween(0.3, 0.4);

    setTimeout(async () => {
      // Load multilanguage
      loadLanguage();
      setRandomProgressBetween(0.5, 0.7);

      setTimeout(async () => {
        await loadThemeAndAnimations();
        loadingProgressbar.setProgress(1);

        setTimeout(() => {
          hideLoader();
        }, 1000)
      }, 1000)
    }, 500)
  }, 1000)
  // Load theme and animations
}

// Progressbar functions
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

/**
 * Sets the progress of the progressbar to a value between the specified arguments to improve realism
 * @param {number} min Minimum acceptable value to set the progressbar
 * @param {number} max Maximum acceptable value to set the progressbar
 */
function setRandomProgressBetween(min, max) {
  let minimum = min * 100;
  let maximum = max * 100;
  let value = Math.random() * (maximum - minimum) + minimum;
  // console.log((value / 100).toFixed(2));
  loadingProgressbar.setProgress((value / 100).toFixed(2));
}

// Load assets
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