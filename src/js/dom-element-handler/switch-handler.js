/**
 * This is the Switch element handler module.<br>
 * It stores functions related to the set up and handling of switches in the webpage
 * @module SwitchHandler
 */

/**
 * Sets up the specified switch to do something when the user clicks it
 * @function setUpSwitch
 * @param {string} switchFrameSelector Selector of the switch frame
 * @param {string} switchInsideSelector Selector of the inside element of the switch
 * @param {{leftValue: *, rightValue: *, callback: function}} options Parameters to set the switch up
 * @example
 * setUpSwitch('.switch-container-div', '.inside-switch-div', {
 *  leftValue: "light",
 *  rightValue: "dark",
 *  callback: renderTheme
 * });
 */
export function setUpSwitch(switchFrameSelector, switchInsideSelector, {leftValue, rightValue, callback}) {
  let switchFrame = document.querySelector(switchFrameSelector);
  let insideSwitch = switchFrame.querySelector(switchInsideSelector);

  let correspondingValues = {left: ["-80%", leftValue], right: ["0%", rightValue]};
  let pickedValue;

  switchFrame.addEventListener("click", () => {
    switchFrame.removeEventListener("transitionend", afterTransition);
    let left = getComputedStyle(insideSwitch).left.match(/\d+/)[0];
    if (left === "0") {
      pickedValue = correspondingValues.left;
    } else {
      pickedValue = correspondingValues.right;
    }
    insideSwitch.style.setProperty("left", pickedValue[0]);

    switchFrame.addEventListener("transitionend", afterTransition);
  });
  
  function afterTransition(event) {
    if (event.propertyName === 'left') {
      callback(pickedValue[1]);
    }
  }
}

/**
 * Renders the state of the switch depending on the specified value
 * @param {string} switchFrameSelector Selector of the frame of the switch
 * @param {string} switchInsideSelector Selector of the inside of the switch
 * @param {{leftValue: *, rightValue: *}} options Parameters to work with
 * @param {*} selectedValue Value in which depends the position of the switch
 */
export function renderSwitch(switchFrameSelector, switchInsideSelector, {leftValue, rightValue},  selectedValue) {
  let switchFrame = document.querySelector(switchFrameSelector);
  let insideSwitch = switchFrame.querySelector(switchInsideSelector);
  let correspondingValues = {left: "-80%", right: "0%"};
  let pickedValue;

  if (selectedValue === leftValue) {
    pickedValue = correspondingValues.left
  } else if (selectedValue === rightValue) {
    pickedValue = correspondingValues.right;
  }
  insideSwitch.style.setProperty("left", pickedValue);
}