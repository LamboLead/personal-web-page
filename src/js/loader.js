// Animate loader logo & set up progressbar
import startLoaderAnimation from "./animations/loader-animation.js";

startLoaderAnimation(() => {
  console.log("Completed!");
})

/*
// Set up language settings
import ("./language/language-manager.js");

// Retrieve network & user info
let networkSpeed = window.navigator.connection.downlink;
console.log(networkSpeed);
if (networkSpeed > 3.5) {
  // Load heavy theme
  import ("./theme/theme-full.js");
} else {
  // Load light theme
  import ("./theme/theme-light.js");
}

*/