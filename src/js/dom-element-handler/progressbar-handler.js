/**
 * This is the Progressbar element handler module.<br>
 * It stores functions related to the set up and handling of custom progressbars in the webpage
 * @module ProgressbarHandler
 */

import injectSVG from "./import-svg.js";

export default class Progressbar {
  constructor(id, renderingOptions, tweenOptions, numeric) {
    this.id = id;
    this.progress = 0;
    this.numeric = numeric;
    this.renderingOptions = renderingOptions;
    this.tweenOptions = tweenOptions.default;
    this.toAnimate = tweenOptions.toAnimate;
  }

  async render() {
    await injectSVG({id: this.id, src: this.renderingOptions.src, withDivContainer: true}, {parentSelector: this.renderingOptions.parent});

    if (this.numeric) {
      let svgDiv = document.getElementById(this.id);
      let span = document.createElement("span");
      span.innerText = "0%";
      svgDiv.append(span);
    }
  }

  setProgress(newProgress) {
    this.progress = newProgress;
    this.animate();

    if (this.numeric) {
      let span = document.querySelector(`#${this.id} span`);
      span.innerText = `${newProgress * 100}%`;
    }
  }

  animate() {
    let options = this.tweenOptions;
    options[this.toAnimate] = this.progress;
    // console.log(options);
    gsap.to(`#${this.id} svg`, options);
  }
}


