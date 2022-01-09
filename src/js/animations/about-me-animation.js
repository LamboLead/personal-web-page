let carTimeline = gsap.timeline();

// Car
carTimeline.add(
  gsap.to("#car, #smoke-front, #smoke-rear", {
    x: 40,
    duration: 4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  })
, 0)

// Buildings
carTimeline.add(
  gsap.to("#buildings-1, #buildings-2", {
    x: "-100%",
    duration: 9,
    ease: "none",
    repeat: -1
  })
, 0);

// Roadlines
carTimeline.add(
  gsap.to("#roadlines-1, #roadlines-2", {
    x: "-100%",
    duration: 0.8,
    ease: "none",
    repeat: -1
  })
, 0);

// Rims
let rimTimeline = gsap.timeline();
rimTimeline.add(
  gsap.fromTo("#shine-1",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 0.7,
    yoyo: true,
    ease: "none",
    repeat: -1
  })
, 0);
rimTimeline.add(
  gsap.fromTo("#shine-2",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 0.6,
    yoyo: true,
    ease: "none",
    repeat: -1
  })
, 0.3);
rimTimeline.add(
  gsap.fromTo("#shine-3",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 0.5,
    yoyo: true,
    ease: "none",
    repeat: -1
  })
, 0.6);

// Smoke
let smokeTimeline = gsap.timeline();

// Smoke > Front

smokeTimeline.add(
  gsap.to("#smoke-front .bright-cloud-2", {
    opacity: 0.7,
    duration: 0.4,
    repeat: -1,
    ease: "none"
  })
, 0)
smokeTimeline.add(
  gsap.fromTo("#smoke-front .dark-cloud-2",
  {
    x: 0,
    opacity: 1
  },
  {
    x: "-50%",
    scaleX: 1.6,
    opacity: 0,
    duration: 0.4,
    repeat: -1,
    ease: "none"
  })
, 0.2)

smokeTimeline.add(
  gsap.fromTo("#smoke-front .bright-cloud-1",
  {
    x: 0,
    opacity: 1
  },
  {
    x: "-40%",
    opacity: 0,
    duration: 0.4,
    repeat: -1
  })
, 0)
smokeTimeline.add(
  gsap.fromTo("#smoke-front .dark-cloud-1",
  {
    x: 0,
    opacity: 1
  },
  {
    x: "-40%",
    opacity: 0,
    duration: 0.4,
    repeat: -1
  })
, 0.2)

// Rear
smokeTimeline.add(
  gsap.to("#smoke-rear .bright-cloud-2", {
    opacity: 0.7,
    duration: 0.4,
    repeat: -1,
    ease: "none"
  })
, 0.2)
smokeTimeline.add(
  gsap.fromTo("#smoke-rear .dark-cloud-2",
  {
    x: 0,
    opacity: 1
  },
  {
    x: "-50%",
    scaleX: 1.6,
    opacity: 0,
    duration: 0.4,
    repeat: -1,
    ease: "none"
  })
, 0.5)

smokeTimeline.add(
  gsap.fromTo("#smoke-rear .bright-cloud-1",
  {
    x: 0,
    opacity: 1
  },
  {
    x: "-40%",
    opacity: 0,
    duration: 0.4,
    repeat: -1
  })
, 0.2)
smokeTimeline.add(
  gsap.fromTo("#smoke-rear .dark-cloud-1",
  {
    x: 0,
    opacity: 1
  },
  {
    x: "-40%",
    opacity: 0,
    duration: 0.4,
    repeat: -1
  })
, 0.5)

let aboutMeTimeline = gsap.timeline({paused: true});
aboutMeTimeline.add(carTimeline, 0);
aboutMeTimeline.add(rimTimeline, 0);
aboutMeTimeline.add(smokeTimeline, 0);

export default aboutMeTimeline;