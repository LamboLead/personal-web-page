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
    let degrees = Math.floor(self.getVelocity()) / 3;
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
    if (self.progress > 0.6) {
      document.querySelector("#skillset").classList.remove("is-skillset-contracted");
      document.querySelector("#who-am-i").classList.add("is-about-me-contracted");
    } else {
      document.querySelector("#skillset").classList.add("is-skillset-contracted");
      document.querySelector("#who-am-i").classList.remove("is-about-me-contracted");
    }
  }
});

// Snap scrolling

const sections = document.querySelectorAll("#main-section .single-section, .double-section");

function goToSection(section) {
  // console.log(section);
  gsap.to(window, {
    scrollTo: {y: section, autoKill: false},
    duration: 0.5,
    delay: 0.5
  });
  
  // anim && anim.restart();
}

sections.forEach((section) => {
  // const intoAnim = gsap.from(section.querySelector(".right-col"), {yPercent: 50, duration: 1, paused: true});
  let id = `#${section.id}`;
  console.log(id);
  
  ScrollTrigger.create({
    // markers: true,
    trigger: section,
    start: "top+=4% bottom",
    end: "bottom-=4% top+=1",
    // onEnter: () => goToSection(section, intoAnim),
    onEnter: () => goToSection(id),
    onEnterBack: () => goToSection(id)
    // onEnter: () => console.log("I entered!", id),
    // onEnterBack: () => console.log("I entered back!", id)
  });
});
