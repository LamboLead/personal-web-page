/**
 * Light animations module. Loaded if light theme module is imported
 */

import animations from './animation-info.js';

class ImageManager {
  constructor() {
    this.images = {};
    this.currentTheme = undefined;
    this.currentSection = undefined;
  }

  initialize() {
    Object.keys(animations).forEach((element) =>{
      let anim = animations[element].info;
      ScrollTrigger.create({
        markers: anim.markers,
        id: anim.id,
        trigger: anim.trigger,
        start: anim.start,
        end: anim.end,
        onEnter: () => {
          console.log("Entered!", element);
          this.showImage(element)
        },
        onEnterBack: () => {
          console.log("Entered back!", element);
          this.showImage(element)
        },
        onLeave: () => {
          console.log("Left!", element);
          this.setNewImage(element);
        }
      });
    });
  }

  async loadImage(name, type, theme) {
    console.table("Load image!", {name: name, type: type, theme: theme});

    let image = new CanvasImage(name);
    this.images[name] = image;

    console.log("Image hasn't loaded!");

    let orientation = this.checkOrientation(name);
    let imageInfo = animations[name][type][orientation][theme];
    let index = Math.floor(Math.random() * imageInfo.length);
    let bestFrame = imageInfo[index].bestFrame;
    let folderName = imageInfo[index].folderName;

    let promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.src = fullRoute(bestFrame);
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.addEventListener("error", () => {
        reject(Error("Unable to load image"));
      });
    });

    image.file = await promise;
    image.orientation = orientation;

    // Set up rescaling
    image.canvas.width = image.file.naturalWidth;
    image.canvas.height = image.file.naturalHeight;

    console.log(image);

    this.images[name] = image;

    image.hasLoaded = true;
    console.log("Image has loaded!")

    function fullRoute(index) {
      return `/public/video/${folderName}/pic${index.toString()}.png`;
    }
  }

  showImage(name) {
    let image = this.images[name];
    this.currentSection = name;

    let checkInterval = setInterval(() => {
      image = this.images[name];
      if (image.hasLoaded) {
        renderImage();
      } else {
        return;
      }
    }, 500);

    function renderImage() {
      clearInterval(checkInterval);
      image.render();
      image.show();
    }
  }

  setNewImage(name) {
    this.loadImage(name, "currentSession", this.currentTheme);
    console.log(this.images);
    this.images[name].hide();
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

class CanvasImage {
  constructor(name) {
    this.name = name;
    this.file = undefined;
    this.canvas = document.getElementById(name);
    this.hasLoaded = false;
    this.orientation = undefined;
  }
  show() {
    this.canvas.classList.remove("is-animation-loading");
  }
  hide() {
    this.canvas.classList.add("is-animation-loading");
  }
  setUpOrientation() {
    if (this.canvas.clientHeight > this.canvas.clientWidth) {
      this.orientation = "vertical";
    } else {
      this.orientation = "horizontal";
    }
  }
  render() {
    let canvas = this.canvas;
    let context = canvas.getContext("2d");
    let image = this.file;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}

const imageManager = new ImageManager();
imageManager.initialize();

export default imageManager;