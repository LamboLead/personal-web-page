import images from "./image-info.js";
class ImageManager {
  constructor() {
    this.images = {};
    this.currentTheme = undefined;
    this.currentSection = undefined;
  }

  initialize() {
    // Set up dynamic images
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
          this.showImage(element);
        },
        onEnterBack: () => {
          console.log("Entered back!", element);
          this.currentSection = element;
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

    // Load and show static images
    let staticImages = images["static"];
    Object.entries(staticImages).forEach(async (image) => {
      await this.loadImage({name: image[0], type: "static"});
    });

    // Load current section image and contactImage
    imageManager.loadImage({name: imageManager.currentSection, type: "dynamic", subtype: "startSession"}, this.currentTheme);
    imageManager.loadImage({name: "contactImage", type: "dynamic", subtype: "startSession"}, this.currentTheme);
  }

  async loadImage({name, type, subtype = undefined}, theme = undefined) {
    console.table("Load image!", {name: name, info: {type, subtype}, theme: theme});
    
    let image = new CanvasImage(name, type);
    if (type === "normal") image.hide();
    this.images[name] = image;

    console.log("Image hasn't loaded!", name);

    let selectedImage;

    switch (type) {
      case "dynamic":
        try {
          let imageInfo = images[type][name][subtype][image.orientation][theme];
          let index = Math.floor(Math.random() * imageInfo.length);
          selectedImage = imageInfo[index];
        } catch (error) {
          console.log(`${name} image wasn't found`);
          return;
        }
        break;
      case "normal":
        try {
          selectedImage = images[type][name][image.orientation][theme];
        } catch (error) {
          console.log(`${name} image wasn't found`);
          return;
        }
        break;
      case "static":
        try {
          selectedImage = images[type][name][image.orientation];
        } catch (error) {
          console.log(`${name} image wasn't found`);
          return;
        }
        break;
      default:
        console.error("No image type selected for image:", name);
        break;
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

    if (selectedImage["style"]) {
      image.style = selectedImage["style"];
    }

    // Set up rescaling
    image.canvas.width = image.file.naturalWidth;
    image.canvas.height = image.file.naturalHeight;

    image.hasLoaded = true;
    this.images[name] = image;

    console.log("Image has loaded!", name);

    if (type === "normal" || type === "static") this.showImage(name);
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
    this.style = "";
    this.canvas = document.getElementById(name);
    this.hasLoaded = false;
    this.orientation = this.setUpOrientation();
  }
  show() {
    this.canvas.parentElement.classList.remove("is-animation-loading");
  }
  hide() {
    this.canvas.parentElement.classList.add("is-animation-loading");
  }
  setUpOrientation() {
    if (window.innerHeight >= window.innerWidth) {
      return "phone";
    } else {
      return "desktop";
    }
  }
  render() {
    let canvas = this.canvas;
    let context = canvas.getContext("2d");
    let image = this.file;
    canvas.parentElement.setAttribute("style", this.style);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}

const imageManager = new ImageManager();

export default imageManager;