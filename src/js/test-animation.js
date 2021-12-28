import animations from "./animations/animation-info.js";

class AnimationManager {
  constructor() {
    this.animations = {};
    this.currentTheme = undefined;
    this.currentSection = undefined;
  }

  initialize() {
    // Create all ScrollTrigger instances
    Object.keys(animations).forEach((element) => {
      let anim = animations[element].info
      ScrollTrigger.create({
        markers: anim.markers,
        id: anim.id,
        trigger: anim.trigger,
        start: anim.start,
        end: anim.end,
        onEnter: () => {
          console.log("Entered!", element);
          this.playAnimation(element);
        },
        onEnterBack: () => {
          console.log("Entered back!", element);
          this.playAnimation(element);
        },
        onLeave: () => {
          console.log("Left!", element);
          this.setNewAnimation(element);
        },
      });
    });
  }

  async loadAnimation(name, type, theme) {
    console.table("Load animation!", {name: name, type: type, theme: theme});

    let animation = new Animation(name);
    
    this.animations[name] = animation;
    console.log("Animation hasn't loaded!");
    
    // Load frames from server
    let frames = [];
    let orientation = this.checkOrientation(name);
    let animationInfo = animations[name][type][orientation][theme];
    let index = Math.floor(Math.random() * animationInfo.length);
    let folderName = animationInfo[index].folderName;
    let frameCount = animationInfo[index].frameCount;
    let duration = animationInfo[index].duration;

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
      frames.push(promise)
    }

    // Set up all animation elements
    animation.imageFrames = await Promise.all(frames);
    animation.canvas = document.getElementById(name);
    animation.orientation = orientation;
    animation.tween = gsap.to(animation, {
      currentFrame: frameCount - 1,
      snap: "currentFrame",
      duration: duration,
      ease: "none",
      onUpdate: () => animation.render(),
      paused: true
    });

    // Set up rescaling
    let canvas = document.getElementById(name);
    canvas.width = animation.imageFrames[0].naturalWidth;
    canvas.height = animation.imageFrames[0].naturalHeight;

    // Update the current animation
    this.animations[name] = animation;

    animation.hasLoaded = true;
    console.log("Animation has loaded!");

    function fullRoute(index) {
      return `/public/video/${folderName}/pic${index.toString()}.png`;
    }
  }

  playAnimation(name) {
    let animation = this.animations[name];
    this.currentSection = name;

    let checkInterval = setInterval(() => {
      animation = this.animations[name];
      if (animation.hasLoaded) {
        play();
      } else {
        return;
      }
    }, 1000);

    function play() {
      clearInterval(checkInterval);
      animation.play();
    }
  }

  setNewAnimation(name) {
    this.loadAnimation(name, "currentSession", this.currentTheme);
    console.log(this.animations);
    this.animations[name].restart();
  }

  checkOrientation(name) {
    let canvas = document.getElementById(name);
    if (canvas.clientHeight > canvas.clientWidth) {
      return "vertical";
    } else {
      return "horizontal";
    }
  }
}

class Animation {
  constructor(name) {
    this.name = name;
    this.canvas = document.getElementById(name);
    this.tween = undefined;
    this.imageFrames = [];
    this.currentFrame = 0;
    this.hasLoaded = false;
    this.isPlaying = false;
    this.orientation = undefined;
  }
  play() {
    console.log("Animation is being played")
    this.isPlaying = true;
    this.canvas.classList.remove("is-animation-loading");
    this.tween.play();
  }
  pause() {
    this.isPlaying = false;
    this.tween.pause();
  }
  restart() {
    this.canvas.classList.add("is-animation-loading");
  }
  render() {
    let canvas = this.canvas;
    let context = canvas.getContext("2d");
    let image = this.imageFrames[this.currentFrame];
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}

const animationManager = new AnimationManager();
animationManager.initialize();

export default animationManager;