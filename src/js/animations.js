// Rotating wheel

let target = "#navbar-main-logo .full-tyre";
let proxy = {rotation: 0};
let rotationSetter = gsap.quickSetter(target, "rotate");
let clamp = gsap.utils.clamp(-360, 360);


ScrollTrigger.create({
  // onToggle: (self) => {
  //   console.log("I was toggled");
  // },
  onUpdate: (self) => {
    // let degrees = clamp(Math.floor(self.getVelocity()));
    let degrees = Math.floor(self.getVelocity()) / 3;
    // console.log(degrees);
    if (Math.abs(degrees) > Math.abs(proxy.rotation)) {
      proxy.rotation = degrees;
      gsap.to(proxy, {
        rotation: 0, duration: 3, ease: "power4.out", overwrite: true,
        onUpdate: () => {
          rotationSetter(proxy.rotation)
        }
      });
    }
  }
});

gsap.set(target, {transformOrigin: "50% 50%"});

// Snapping scrolling

// About-me section
// let tline = gsap.timeline({
//   scrollTrigger: {
//     markers: true,
//     trigger: "#about-me",
//     start: "top top",
//     end: "bottom bottom",
//     scrub: true,
//     pin: true,
//     anticipatePin: 2
//   }
// });
// tline.to("#skillset", {width: 0});



// ScrollTrigger.create({
//   markers: true,
//   trigger: "#about-me",
//   start: "top top",
//   end: "bottom bottom",
//   pin: true,
//   anticipatePin: 2
// });

// gsap.to("#skillset", {
//   scrollTrigger: {
//     markers: {startColor: "yellow", endColor: "blue"},
//     trigger: "#about-me",
//     start: "25% center",
//     end: "bottom bottom",
//     onEnter: () => {
//       gsap.to()
//     }
//   },
//   x: "40%",
//   duration: 2
// });

ScrollTrigger.create({
  // markers: {startColor: "yellow", endColor: "blue"},
  trigger: "#about-me",
  start: "top top",
  end: "bottom bottom",
  pin: true,
  onUpdate: (self) => {
    if (self.progress > 0.5) {
      document.querySelector("#skillset").classList.remove("is-section-contracted");
      document.querySelector("#who-am-i").classList.add("is-section-contracted");
    } else {
      document.querySelector("#skillset").classList.add("is-section-contracted");
      document.querySelector("#who-am-i").classList.remove("is-section-contracted");

    }
    // console.log(self.progress.toFixed(1));
  }
  // toggleActions: "play none none reverse",
  // toggleClass: {targets: ["#skillset"], className: "is-section-contracted"}
});