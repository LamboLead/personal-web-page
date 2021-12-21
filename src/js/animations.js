import animations from "../../public/video/animation-info.js";

let canvas = document.getElementById("cat-canvas");
let context = canvas.getContext("2d");

let images = [];
const cattos = {
  frame: 0
};
let animationTween;
let animationHasLoaded = false;

setUpAnimation("start", await currentTheme);

ScrollTrigger.create({
  markers: {startColor: "yellow", endColor: "red"},
  id: "main-page-pin",
  trigger: "#main-page",
  start: "top top+=1",
  end: "+=200% bottom-=1",
  onEnter: playAnimation,
  onEnterBack: playAnimation,
  onLeave: pauseAnimation
});

/**
 * Sets up a random animation from the specified type, ready to be played
 * @function setUpAnimation
 * @param {string} type Type of animation to set up
 */
async function setUpAnimation(type, theme) {
  images = [];
  animationHasLoaded = false;
  console.log("Animation hasn't loaded!");
  console.log(theme);

  let animationIndex = Math.floor(Math.random() * animations[type][theme].length);
  let folderName = animations[type][theme][animationIndex].folderName;
  let frameCount = animations[type][theme][animationIndex].frameCount;
  let duration = animations[type][theme][animationIndex].duration;

  /*
  for (let i = 1; i <= frameCount; i++) {
    let promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.src = fullRoute(i);
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.addEventListener("error", () => {
        reject(Error("Unable to load image"));
      });
    });
    images.push(promise);
  }
  images = await Promise.all(images);
  */

  console.log(theme, folderName, frameCount, duration, fullRoute(1));

  animationTween = gsap.to(cattos, {
    frame: frameCount - 1,
    snap: "frame",
    duration: duration,
    ease: "none",
    // onUpdate: render,
    paused: true
  });
  animationHasLoaded = true;
  console.log("Animation has loaded!");

  function fullRoute(index) {
    return `/public/video/${folderName}/pic${index.toString().padStart(5, '0')}.png`;
  }
}

/**
 * Checks if the animation is ready to be played, and plays it
 * @function playAnimation
 */
function playAnimation() {
  console.log("Entered!");
  let checkInterval = setInterval(() => {
    if (animationHasLoaded) {
      playVideo();
    } else {
      return;
    }
  }, 1000);

  if (animationHasLoaded) playVideo();

  function playVideo() {
    clearInterval(checkInterval);
    console.log("Play animation!");
    animationTween.play();
  }
}

/**
 * Restarts and pauses the current animation
 * @function pauseAnimation
 */
function pauseAnimation() {
  console.log("Leave!");
  setUpAnimation("currentSession", currentTheme);
  animationTween.restart();
  animationTween.pause();
  console.log("Pause animation!");
}

/**
 * Draws each frame of the set animation in the canvas
 * @function render
 */
function render() {
  let image = images[cattos.frame];
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

/**
 * Some thoughts...
 * -> Instead of controlling your animations using ScrollTrigger, play them as a video inside the canvas.
 * -> Figure out a way to play the video using GSAP or whatever you want. For this, you can create a tween and insert the ScrollTrigger inside of it, or create a new ScrollTrigger and set its onEnter, onEnterBack, onLeave methods to control the animations.
 * -> Play different animations depending on the trigger for each section.
 * For main page, for example: Play an animation when the user first visits the page; play another animation as the user enters the section again from below. Play another animation as the user visits the webpage...
 * 
 * Use Python > rembg: https://github.com/danielgatis/rembg
 */