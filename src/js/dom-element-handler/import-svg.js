
/**
 * Injects the specified SVG document into the specified parent
 * @function injectSVG
 * @param {Object} SVGOptions Options of the SVG document
 * @param {string} appendingOptions Vital options to append the SVG document into
 */
export default async function injectSVG({id = undefined, classList = undefined, src, withDivContainer = false}, {parentSelector, beforeSelector = undefined}) {
  // Fetch SVG document
  let svgText = await fetch(`/public/svg/${src}`, {method: "GET"})
    .then(async (response) => {
    return await response.text()
  });
  // Append SVG to new div
  let div = document.createElement("div");
  div.innerHTML = svgText;
  // Append div or svg to parent
  if (withDivContainer) {
    appendElement(id, classList, parentSelector, beforeSelector, div);
    return;
  }
  let svg = div.querySelector("svg");
  appendElement(id, classList, parentSelector, beforeSelector, svg);
  
  function appendElement(id, classList, parentSelector, beforeSelector, element) {
    let parent = document.querySelector(parentSelector);
    if (id) element.id = id;
    if (classList) element.classList = classList;
    if (beforeSelector) {
      let childBefore = document.querySelector(beforeSelector);
      parent.insertBefore(element, childBefore);
    } else {
      parent.append(element);
    }
  }
}