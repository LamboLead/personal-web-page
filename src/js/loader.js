// Animate loader logo & set up progressbar


// Retrieve network & user info
let networkSpeed = window.navigator.connection.downlink;
console.log(networkSpeed);
if (networkSpeed > 3) {
  // Load heavy theme
  import ("./theme/theme-full.js");
} else {
  // Load light theme
  import ("./theme/theme-light.js");
}

// Set up worker
// const netPerformanceWorker = new Worker("./performance.js", {name: "performanceWorker"});

// netPerformanceWorker.postMessage("whatever")