// - - - Rotating wheel  - - -

let target = "#navbar-main-logo .full-tyre";
let proxy = {rotation: 0};
let rotationSetter = gsap.quickSetter(target, "rotate");
let clamp = gsap.utils.clamp(-360, 360);
gsap.set(target, {transformOrigin: "50% 50%"});

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

// - - - Scrolling arrows - - -

// ScrollTrigger.create({
//   onToggle: (self) => {
//     gsap.to(".scrolling-arrows-svg .right", {
//       transformOrigin: "center center",
//       skewY: `${self.direction * 20}deg`,
//       duration: 0.5
//     })
//     gsap.to(".scrolling-arrows-svg .left", {
//       transformOrigin: "center center",
//       skewY: `${-1 * self.direction * 20}deg`,
//       duration: 0.5
//     })
//   }
// })

// - - - Snap scrolling - - -

const snapDuration = 0.5;
const snapDelay = 0.7
const sections = document.querySelectorAll("#main-section .single-section, .double-section");

let enteredSections = [];
sections.forEach((section) => {
  let id = section.id;
  ScrollTrigger.create({
    id: id,
    trigger: `#${id}`,
    start: "top bottom",
    end: "bottom top+=1",
    onEnter: () => {
      enteredSections.push(id);
      // console.log(enteredSections);
      setTimeout(() => {
        if (enteredSections[enteredSections.length - 1] === id) {
          // console.log(`${id} was the last accessed`);
          goToSection(id);
        }
      }, snapDelay * 1000);

      setTimeout(() => {
        enteredSections = [];
      }, 1000);
    },
    onEnterBack: () => {
      enteredSections.push(id);
      // console.log(enteredSections);
      setTimeout(() => {
        if (enteredSections[enteredSections.length - 1] === id) {
          // console.log(`${id} was the last accessed`);
          goToSection(id);
        }
      }, snapDelay * 1000);
      
      setTimeout(() => {
        enteredSections = [];
      }, 1000);
    }
  });
});

function goToSection(section) {
  moveNavbarBackground(section)
  gsap.to(window, {
    scrollTo: {y: `#${section}`, autoKill: true},
    duration: snapDuration
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
    // console.log(self.progress);
    if (self.progress > 0.6) {
      document.querySelector("#skillset").classList.remove("is-skillset-contracted");
      document.querySelector("#who-am-i").classList.add("is-about-me-contracted");
    } else {
      document.querySelector("#skillset").classList.add("is-skillset-contracted");
      document.querySelector("#who-am-i").classList.remove("is-about-me-contracted");
    }
  }
});

// - - - about-me animation - - -

import aboutMeTimeline from "./animations/about-me-animation.js";

ScrollTrigger.create({
  // markers: true,
  trigger: "#who-am-i",
  start: "top-=10% top",
  end: "bottom+=95% bottom",
  onEnter: () => aboutMeTimeline.play(),
  onEnterBack: () => aboutMeTimeline.play(),
  onLeave: () => aboutMeTimeline.pause(),
  onLeaveBack: () => aboutMeTimeline.pause()
});

// - - - Navigation with navbar - - -

// Basic anchor navigation
const links = document.querySelectorAll("#logo,#index .link");
moveNavbarBackground("main-page");

let pinTrig = ScrollTrigger.getById("about-me-pin");
let snapTrig = ["main-page", "about-me", "my-portfolio", "contact"];

// When user clicks on the link from navbar, it scrolls to the corresponding section, while disabling temporarily the corresponding ScrollTrigger instance when navigating navbar to avoid massive epylepsia
links.forEach((link) => {
  link.addEventListener("click", () => {
    let sectionId = link.getAttribute("data-navigation-section");
    moveNavbarBackground(sectionId);

    snapTrig.forEach((id) => ScrollTrigger.getById(id).disable(false, false));
    // console.log("Scrollers disabled");
    pinTrig.disable();
    
    gsap.to(window, {
      // scrollTo: {y: `#${sectionId}`, autoKill: false}, what does autokill do?
      scrollTo: {y: `#${sectionId}`},
      duration: snapDuration - 0.2
    });
    
    setTimeout(() => {
      pinTrig.enable(false, true);
      snapTrig.forEach((id) => ScrollTrigger.getById(id).enable(false, false));
      // console.log("Scrollers enabled!");
    }, snapTrig * 1000);

  });
});

function moveNavbarBackground(selector) {
  let vPortHeight = window.innerHeight;
  let element = document.querySelector(`[data-navigation-section=${selector}]`);
  let elemPosition = Math.floor(element.getBoundingClientRect().top);
  let elemHeight = element.offsetHeight + 5;

  gsap.to("#container1", {height: elemPosition});
  gsap.to("#gap", {height: elemHeight});
  gsap.to("#container2", {height: vPortHeight - elemHeight - elemPosition});

  let gap = document.querySelector("#gap");
  if (selector === "main-page") {
    gap.classList.remove("gap-background");
  } else {
    gap.classList.add("gap-background");
  }
}

// - - - Mobile navbar - - -

/**
 * Some thoughts...
 * -> When the user clicks out of the navbar, close it. If it scrolls to other section of the page, wait some time and then close it.
 * -> Create a small-animated logo to encourage users to use your navbar.
 */

const navbarTab = document.getElementById("navbar-tab");
const navbar = document.getElementById("navbar");
const body = document.querySelector("body");
const blackener = document.getElementById("blackener");

blackener.addEventListener("click", () => {
  navbarTab.click();
});

navbarTab.addEventListener("click", () => {
  if (navbar.classList.contains("is-navbar-expanded")) {
    navbar.classList.remove("is-navbar-expanded");
    body.classList.remove("is-scrolling-disabled");
    blackener.classList.remove("is-blackener-enabled");
    return;
  }
  navbar.classList.add("is-navbar-expanded");
  body.classList.add("is-scrolling-disabled");
  blackener.classList.add("is-blackener-enabled");
});

/**
 * Some alternatives:
 * 
 * -> Disable about-me-pin ScrollTrigger when clicking the navbar, but not with regular scrolling.
 * status: DONE
 * 
 * -> Try to implement ScrollTrigger on timelines or tweens to avoid using 'onEnter', 'onEnterBack' callbacks that mess up with shit.
 * status: PENDING
 * 
 * -> Implement 'scrollStart' and 'scrollEnd' events to disable unintended snapping while scrolling really fast.
 * status: PENDING
 * 
 * -> In case your current solution doesn't work, try to obtain some parameter that characterizes the active section from the rest and scroll to that one at the end (just like you did earlier, but with other parameter)
 * status: HOPE NOT TO USE IT
 * 
 * -> Set dynamic snapping. Deactivate ScrollTrigger when the user is still scrolling.
 * status: VERY LIKELY TO IMPLEMENT
 */