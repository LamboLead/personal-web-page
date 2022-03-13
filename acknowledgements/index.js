const images = document.querySelectorAll(".images img");
let currentImage = 0;
setInterval(() => {
  images.forEach((image) => {
    image.classList.remove("is-image-being-shown");
  });
  images[currentImage].classList.add("is-image-being-shown");
  if (currentImage == images.length-1) {
    currentImage = 0;
  } else {
    currentImage++;
  }
}, 7000);