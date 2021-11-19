// - - - Rotating wheel  - - -

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

// - - - Snap scrolling - - -

const snapDuration = 0.5;
const snapDelay = 0.3

const sections = document.querySelectorAll("#main-section .single-section, .double-section")

sections.forEach((section) => {
  let id = section.id;
  ScrollTrigger.create({
    id: id,
    trigger: `#${id}`,
    start: "top bottom",
    end: "bottom top+=1",
    onEnter: () => console.log("Entered!"), // Do not use these
    onEnterBack: () => console.log("Entered back!") // Do not use these
    // onEnter: () => goToSection(id),
    // onEnterBack: () => goToSection(id)
  });
});

function goToSection(section) {
  moveNavbarBackground(section)
  gsap.to(window, {
    scrollTo: {y: `#${section}`, autoKill: true},
    duration: snapDuration,
    delay: snapDelay
  });
}

// - - - pin about-me - - -

ScrollTrigger.create({
  // markers: {startColor: "yellow", endColor: "blue"},
  id: "about-me-pin",
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

let pinTrig = ScrollTrigger.getById("about-me-pin");
let snapTrig = ["main-page", "about-me", "my-portfolio", "contact"];

// Scrolls to the corresponding section, while disabling temporarily the corresponding ScrollTrigger instance when navigating navbar to avoid massive epylepsia
links.forEach((link) => {
  link.addEventListener("click", () => {
    let sectionId = link.getAttribute("data-navigation-section");
    moveNavbarBackground(sectionId);

    snapTrig.forEach((id) => ScrollTrigger.getById(id).disable(false, false));
    pinTrig.disable();
    
    gsap.to(window, {
      // scrollTo: {y: `#${sectionId}`, autoKill: false},
      scrollTo: {y: `#${sectionId}`},
      duration: snapDuration - 0.2
    });
    
    setTimeout(() => {
      pinTrig.enable(false, true);
      snapTrig.forEach((id) => ScrollTrigger.getById(id).enable(false, false));
    }, snapDuration * 1000)

    // ScrollTrigger.addEventListener("scrollEnd", enablePinTrigger);
    // setTimeout(() => {
    //   ScrollTrigger.removeEventListener("scrollEnd", enablePinTrigger);
    // }, snapDuration + 1);

  });
})

function enablePinTrigger() {
  pinTrig.enable();
}

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

// ATTEMPT TO FIX FAULTY SNAPPING

// let pinScrollT = ScrollTrigger.getById("about-me-pin");
// ScrollTrigger.addEventListener("scrollStart", () => {
//   if (pinScrollT.isActive()) return;
//   pinScrollT.disable(true, false);
// });

// ScrollTrigger.addEventListener("scrollEnd", () => {
//   pinScrollT.enable(true, true);
// });
/*

let sTriggerIds = ["main-page", "about-me", "my-portfolio", "contact"];

ScrollTrigger.addEventListener("scrollStart", () => {
  ScrollTrigger.getById("about-me-pin").disable(true, false);
  sTriggerIds.forEach((id) => {
    ScrollTrigger.getById(id).disable(true, false);
  });
});

ScrollTrigger.addEventListener("scrollEnd", () => {
  ScrollTrigger.clearScrollMemory();
  // ScrollTrigger.getById("about-me-pin").enable();
  sTriggerIds.forEach((id) => {
    ScrollTrigger.getById(id).enable(false, true);
  });
});

*/
/*
Some thoughts...

  -> You can disable about-me-pin scrollTrigger when clicking the navbar, but not with regular scrolling: DONE!
  -> Try to implement ScrollTrigger on timelines or tweens to avoid using 'onEnter', 'onEnterBack' callbacks that mess up with shit.
  -> Implement 'scrollStart' and 'scrollEnd' events to disable unintended snapping while scrolling really fast
  -> When navigating with navbar, deactivate the 'hide' class on about-me sections
  
*/