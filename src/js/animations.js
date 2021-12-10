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
    if (self.progress > 0.7) {
      document.querySelector("#skillset").classList.remove("is-skillset-contracted");
      document.querySelector("#who-am-i").classList.add("is-about-me-contracted");
    } else {
      document.querySelector("#skillset").classList.add("is-skillset-contracted");
      document.querySelector("#who-am-i").classList.remove("is-about-me-contracted");
    }
  }
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

// - - - Mobile navbar deployment - - -

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

/*
Some thoughts...

  -> You can disable about-me-pin scrollTrigger when clicking the navbar, but not with regular scrolling: DONE!
  -> Try to implement ScrollTrigger on timelines or tweens to avoid using 'onEnter', 'onEnterBack' callbacks that mess up with shit: DIDN'T KNEW HOW TO DO IT.
  -> Implement 'scrollStart' and 'scrollEnd' events to disable unintended snapping while scrolling really fast: DIDN'T IMPLEMENT IT.
  -> When navigating with navbar, deactivate the 'hide' class on about-me sections

  -> Faulty snapping solution: By storing and accessing the last scrolled section I was able to select which section to snap (usually the last one) and discard the rest, avoiding massive epylepsia.
  -> In case solution doesn't work, try this:
      // if (!isActive) return;
      // goToSection(id);
    Try to obtain some parameter that characterizes the active session from the rest.
  
*/