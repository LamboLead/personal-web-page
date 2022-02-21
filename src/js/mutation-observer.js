/**
 * This is the Mutation Observer module.<br>
 * It stores all the required mutation observers related to DOM elements in whose values depend different components of the page.
 * @module MutationObserver
 */

// Observe mutations from language dropdown
import contactForm from "./contact/contact-new.js";

const langObserver = new MutationObserver((mutationsList) => {
  let mutation = mutationsList[0];
  contactForm.language = mutation.target.getAttribute(mutation.attributeName); // Contact form
  contactForm.updateMessages();
});
langObserver.observe(
  document.getElementById("drop-language"),
  {
  attributes: true,
  childList: false,
  subtree: false
});

// Observe mutations from theme switch