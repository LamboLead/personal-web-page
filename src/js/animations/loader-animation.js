// Set up all elements
let logoTimeline;
function startLoaderAnimation(callback) {
  gsap.set("#loader-logo", {
    x: "80%",
    opacity: 1
  });
  gsap.set("#grouped-smoke-clouds", {
    x: "-9%",
    y: "-6%",
    opacity: 1
  });
  gsap.set("#loader-logo #dark-L", {
    x: "-87%",
    y: "-37.3%",
    transformOrigin: "0 0"
  });
  gsap.set("#loader-logo #text-mask", {
    scaleX: 0
  });
  gsap.set("#loader .logo-smoke-wrapper", {
    x: "-100%"
  });

  logoTimeline = gsap.timeline();
  let dur = 2;
  // Move whole logo to the right
  logoTimeline.add(
    gsap.to("#loader .logo-smoke-wrapper", {
      x: "0",
      duration: dur,
      ease: "sine.out"
    })
  , 0)
  // Rotate wheel
  logoTimeline.add(
    gsap.to("#loader-logo #full-tyre", {
      rotate: 3600,
      transformOrigin: "50%, 50%",
      duration: dur,
      ease: "sine.out"
    })
  , 0)
  // Dissapear smoke trace
  logoTimeline.add(
    gsap.to("#grouped-smoke-clouds .dark-trace, #grouped-smoke-clouds .bright-trace", {
      opacity: 0,
      duration: 0.7
    })
  , "-=0.5")
  // Dissapear smoke
  logoTimeline.add(
    gsap.to("#grouped-smoke-clouds", {
      x: "15%",
      opacity: 0,
      duration: 1,
      ease: "none"
    })
  , "-=0.3")

  // Smoke animation
  let smokeDur = 0.3;
  let rep = 4;
  let smokeTimeline = gsap.timeline();
  smokeTimeline.add(
    gsap.to("#smoke-clouds-1 .bright-cloud, #smoke-clouds-1 .dark-cloud", {
      opacity: 1,
      duration: smokeDur,
      yoyo: true,
      repeat: rep
    })
  , 0);
  smokeTimeline.add(
    gsap.to("#smoke-clouds-2 .bright-cloud, #smoke-clouds-2 .dark-cloud", {
      opacity: 1,
      duration: smokeDur,
      yoyo: true,
      repeat: rep - 1
    })
  , "0.4");
  smokeTimeline.add(
    gsap.to("#smoke-clouds-3 .bright-cloud, #smoke-clouds-3 .dark-cloud", {
      opacity: 1,
      duration: smokeDur,
      yoyo: true,
      repeat: rep - 1
    })
  , "0.9");

  logoTimeline.add(smokeTimeline, "0");

  // Expand logo
  let expandTimeline = gsap.timeline({onComplete: callback});

  expandTimeline.add(
    gsap.to("#loader-logo", {
      x: "50%",
      duration: 0.5
    })
  , 0)
  expandTimeline.add(
    gsap.to("#loader-logo #dark-L", {
      x: "0",
      y: "0",
      duration: 0.5
    })
  , "0")
  expandTimeline.add(
    gsap.to("#loader-logo #text-mask", {
      scaleX: 1,
      duration: 0.5
    })
  , "+=0")

  logoTimeline.add(expandTimeline, "+=0");

  // Rotate wheel indefinitely
  logoTimeline.add(
    gsap.to("#loader-logo #full-tyre", {
      rotate: -360,
      transformOrigin: "50%, 50%",
      duration: 13,
      ease: "sine.inOut",
      repeat: -1
    })
  , "+=0");
}

export {startLoaderAnimation, logoTimeline};