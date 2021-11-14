// -> Rotating wheel

// const { Timeline } = require("gsap/gsap-core");

let target = "#navbar-main-logo .full-tyre";
let proxy = {rotation: 0};
let rotationSetter = gsap.quickSetter(target, "rotate");
let clamp = gsap.utils.clamp(-360, 360);

ScrollTrigger.create({
  onUpdate: (self) => {
    let degrees = Math.floor(self.getVelocity()) / -6;
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

// -> Snap scrolling <-

const snapDuration = 0.5;
const snapDelay = 0.3
const sections = document.querySelectorAll("#main-section .single-section, .double-section")

sections.forEach((section) => {
  let id = section.id;
  ScrollTrigger.create({
    id: id,
    trigger: `#${id}`,
    // start: "top+=4% bottom",
    // end: "bottom-=4% top+=1",
    start: "top bottom",
    end: "bottom top+=1",
    onEnter: () => goToSection(id),
    onEnterBack: () => goToSection(id)
  });
})

function goToSection(section) {
  moveNavbarBackground(section)
  gsap.to(window, {
    scrollTo: {y: `#${section}`, autoKill: false},
    duration: snapDuration,
    delay: snapDelay
  });
}

// -> about-me scrolling <-

ScrollTrigger.create({
  // markers: {startColor: "yellow", endColor: "blue"},
  trigger: "#about-me",
  start: "top top",
  end: "bottom bottom",
  pin: true,
  onUpdate: (self) => {
    if (self.progress > 0.7) {
      document.querySelector("#skillset").classList.remove("is-skillset-contracted");
      document.querySelector("#who-am-i").classList.add("is-about-me-contracted");
    } else {
      document.querySelector("#skillset").classList.add("is-skillset-contracted");
      document.querySelector("#who-am-i").classList.remove("is-about-me-contracted");
    }
  }
});

// -> Navigation with navbar <-

// Basic anchor navigation
const links = document.querySelectorAll("#logo,#index .link");
moveNavbarBackground("main-page");

// May help: To avoid massive epylepsia, disable snapping temporarily on very high scrolling speeds. This will take care of users scrolling too fast, or browser scrolling by using the navigation links. It will also prevent you from putting a temporary courtain while scrolling

// Discussion: Disable wheel rotation on navbar link navigation

// Scrolls to the corresponding section, while disabling temporarily the corresponding ScrollTrigger instance when navigating navbar to avoid massive epylepsia
links.forEach((link) => {
  link.addEventListener("click", () => {
    let sectionId = link.getAttribute("data-navigation-section");
    moveNavbarBackground(sectionId);

    let snapTrig = ScrollTrigger.getById(sectionId);
    snapTrig.disable();

    gsap.to(window, {
      scrollTo: {y: `#${sectionId}`, autoKill: false},
      duration: snapDuration - 0.2
    });

    setTimeout(() => {
      snapTrig.enable();
    }, snapDuration + snapDelay + 0.1);
  });
})

function moveNavbarBackground(selector) {
  let vPortHeight = window.innerHeight;
  let element = document.querySelector(`[data-navigation-section=${selector}]`);
  let elemPosition = Math.floor(element.getBoundingClientRect().top);
  let elemHeight = element.offsetHeight + 5;

  gsap.to("#container1", {height: elemPosition});
  gsap.to("#gap", {height: elemHeight});
  gsap.to("#container2", {height: vPortHeight - elemHeight - elemPosition});
}

// Mobile navbar deployment

const navbarTab = document.querySelector("#navbar-tab");

// const navTL = gsap.to("#navbar", {
//   duration: 0.5,
//   className: "+=is-navbar-expanded"
// })
const navTL = gsap.timeline({reversed: false});
navTL
  .to("#navbar", {x: 0, duration: 0.3, ease: "none"}, "0")
  .to("#navbar #logo", {x: 0, duration: 0.3, ease: "none"}, "0");
navbarTab.addEventListener("click", () => {
  // navTL.paused(false);
  navTL.reversed(!navTL.reversed());
});