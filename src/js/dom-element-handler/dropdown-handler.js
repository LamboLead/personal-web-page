/**
 * This is the Dropdown element handler module.<br>
 * It stores functions related to the set up and handling of custom dropdown in the webpage
 * @module DropdownHandler
 */

/**
 * 
 * @param {string} parentElementSelector Selector of the parent element to insert the dropdown into
 * @param {Array<String>} options Options to render into the dropdown
 * @param {Function} callback Function to call when an option is selected
 */
export function createDropdown(id, parentElementSelector, options, callback) {

  // Create all elements and set up event listeners
  let container = document.createElement("div");
  container.id = id;
  container.classList = "drop-container-div";

  let displayContainer = document.createElement("div");
  displayContainer.classList = "drop-display-container-div";
  let display = document.createElement("span");
  display.classList = "drop-display";
  let arrow = document.createElement("div");
  arrow.classList = "drop-arrow";
  displayContainer.addEventListener("click", () => {
    openDropdown(id);
  });

  let optionContainer = document.createElement("div");
  optionContainer.classList = "drop-option-container-div is-dropdown-closed";
  options.forEach((option) => {
    let optionText = document.createElement("span");
    optionText.innerText = option.display;
    // optionText.setAttribute(option.attribute.name, option.attribute.value)
    optionContainer.appendChild(optionText);
    optionText.addEventListener("click", () => {
      callback(option.id);
      updateDisplay(id, option.display);
      closeDropdown(id);
    })
  });

  // Append all elements
  let parent = document.querySelector(parentElementSelector);
  displayContainer.append(display, arrow);
  container.append(displayContainer, optionContainer);
  parent.appendChild(container);

  // Set up all closing events
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") closeDropdown(id);
  });
}

export function updateDisplay(id, string) {
  let display = document.getElementById(id).querySelector(".drop-display");
  display.innerText = string;
}

function closeDropdown(id) {
  let optionContainer = document.getElementById(id).querySelector(".drop-option-container-div");
  optionContainer.classList.add("is-dropdown-closed");
}

function openDropdown(id) {
  let optionContainer = document.getElementById(id).querySelector(".drop-option-container-div");
  optionContainer.classList.remove("is-dropdown-closed");
}