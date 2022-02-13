import images from "./image-info.js";

class ImageManager {
  constructor() {
    this.images = {};
    this.currentTheme = undefined;
    this.currentSection = undefined;
  }

  initialize() {
    let dynamicImages = images["dynamic"];
    Object.keys(dynamicImages).forEach((element) => {
      let img = dynamicImages[element].info;
      ScrollTrigger.create({
        markers: img.markers,
        id: img.id,
        trigger: img.trigger,
        start: img.start,
        end: img.end,
        onEnter: () => {
          console.log("Entered!", element);
          this.currentSection = element;
          console.log(this.currentSection);
          this.showImage(element);
        },
        onEnterBack: () => {
          console.log("Entered back!", element);
          this.currentSection = element;
          console.log(this.currentSection);
          this.showImage(element);
        },
        onLeave: () => {
          console.log("Left!", element);
          this.setNewImage(element);
        },
        onLeaveBack: () => {
          console.log("Left!", element);
          this.setNewImage(element);
        }
      });
    });
  }

  async loadImage({name, type, subtype = undefined}, theme) {
    console.table("Load image!", {name: name, info: {type, subtype}, theme: theme});
    
    let image = new CanvasImage(name, type);
    if (type === "normal") image.hide();
    this.images[name] = image;

    console.log("Image hasn't loaded!", name);

    let selectedImage, imageInfo, index;

    if (!subtype) {
      selectedImage = images[type][name][image.orientation][theme];
    } else {
      imageInfo = images[type][name][subtype][image.orientation][theme];
      index = Math.floor(Math.random() * imageInfo.length);
      selectedImage = imageInfo[index];
    }

    let promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `/public/img/${selectedImage.src}`;
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.addEventListener("error", () => {
        reject(Error("Unable to load image"));
      });
    });
    image.file = await promise;

    // Set up rescaling
    image.canvas.width = image.file.naturalWidth;
    image.canvas.height = image.file.naturalHeight;

    image.hasLoaded = true;
    this.images[name] = image;

    console.log("Image has loaded!", name);

    if (type === "normal") this.showImage(name);
  }

  showImage(name) {
    let image = this.images[name];
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
    this.loadImage({name: name, type: "dynamic", subtype: "currentSession"}, this.currentTheme);
    console.log(this.images);
    this.images[name].hide();
  }
}

class CanvasImage {
  constructor(name, type = undefined) {
    this.name = name;
    this.type = type
    this.file = undefined;
    this.canvas = document.getElementById(name);
    this.hasLoaded = false;
    this.orientation = this.setUpOrientation();
  }
  show() {
    this.canvas.classList.remove("is-animation-loading");
  }
  hide() {
    this.canvas.classList.add("is-animation-loading");
  }
  setUpOrientation() {
    if (this.canvas.clientHeight > this.canvas.clientWidth) {
      return "vertical";
    } else if (this.canvas.clientHeight < this.canvas.clientWidth) {
      return "horizontal";
    } else {
      return "squared";
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

export default imageManager;