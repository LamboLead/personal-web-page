let loaderLogo = document.getElementById("loader-main-logo");

gsap.set("#loader-logo #ambo, #loader-logo #ead", {
  opacity: 0
});

gsap.set("#loader-logo .dark-logo", {
  x: "-100vw",
  svgOrigin: "0 0",
})
// gsap.set("#smoke-clouds-1", {
//   opacity: 0
// })
// gsap.set("#smoke-clouds-2", {
//   opacity: 0
// })
// gsap.set("#smoke-clouds-3", {
//   opacity: 1,
//   x: "-100vw",
//   svgOrigin: "0 0"
// })

// gsap.to("#loader-logo .dark-logo", {
//   delay: 3,
//   duration: 3,
//   x: "-24%"
// })
gsap.to("#loader-logo #full-tyre", {
  delay: 1,
  rotate: 3600,
  duration: 3,
  transformOrigin: "50% 50%"
})
