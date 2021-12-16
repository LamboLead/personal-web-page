let canvas = document.getElementById("cat-canvas");
let context = canvas.getContext("2d");

const frameCount = 50;
const currentFrame = (index) => {
  return `/public/video/catto/catto${index.toString().padStart(2, '0')}.jpg`
};

const images = [];
const cattos = {
  frame: 0
};

for (let i = 1; i < frameCount + 1; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.width = canvas.width;
  img.height = canvas.height;
  images.push(img);
}

gsap.to(cattos, {
  frame: frameCount - 1,
  snap: "frame",
  scrollTrigger: {
    id: "main-page-pin",
    trigger: "#main-page",
    start: "top top",
    end: "bottom bottom",
    // pin: true,
    scrub: 0.5
  },
  onUpdate: render
})

images[0].onload = render;

function render() {
  let image = images[cattos.frame];
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
  // ctx.drawImage(img, 0,0, img.width, img.height, 0,0,img.width, img.height);
}

