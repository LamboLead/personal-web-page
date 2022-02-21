import injectSVG from "./import-svg.js";

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
  container.setAttribute("data-selected-value", "undefined");

  // Set up dropdown display
  let displayContainer = document.createElement("div");
  displayContainer.classList = "drop-display";
  displayContainer.addEventListener("click", () => {
    openDropdown(id);
  });

  // Set up dropdown options
  let optionContainer = document.createElement("div");
  optionContainer.classList = "drop-option-container-div is-dropdown-closed";

  options.forEach((option) => {
    let optionDiv = document.createElement("div");
    optionDiv.setAttribute("data-value", option.id);
    let optionText = document.createElement("span");
    optionText.innerText = option.display;
    
    optionDiv.append(optionText);
    optionContainer.append(optionDiv);

    optionDiv.addEventListener("click", () => {
      callback(option.id);
      updateDisplay(id, option.id);
      closeDropdown(id);
    });
  });
  // Append all containers
  let parent = document.querySelector(parentElementSelector);
  container.append(displayContainer, optionContainer);
  parent.appendChild(container);

  // Append SVGs
  options.forEach(async (option) => {
    if (option.svg) {
      await injectSVG({src: option.svg}, {parentSelector: `#${id} .drop-option-container-div [data-value=${option.id}]`});
    }
  });

  // Set up all closing events
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") closeDropdown(id);
  });
}

export function updateDisplay(id, optionId) {
  let dropdown = document.getElementById(id);
  let display = dropdown.querySelector(".drop-display");
  display.innerHTML = "";
  // display.querySelectorAll("*").forEach((child) => display.remove(child));

  dropdown.querySelectorAll(".drop-option-container-div div").forEach((option) => {
    if (option.getAttribute("data-value") === optionId) {
      let clone = option.cloneNode(true);
      console.log("clone:", clone);
      display.appendChild(clone);
    }
  });

  // dropdown.setAttribute("data-selected-value", string.toLowerCase());
  dropdown.setAttribute("data-selected-value", optionId);
}

function closeDropdown(id) {
  let optionContainer = document.getElementById(id).querySelector(".drop-option-container-div");
  optionContainer.classList.add("is-dropdown-closed");
}

function openDropdown(id) {
  let optionContainer = document.getElementById(id).querySelector(".drop-option-container-div");
  optionContainer.classList.remove("is-dropdown-closed");
}