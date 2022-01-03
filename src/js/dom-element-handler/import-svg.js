export default async function injectSVG(id, src, parentElementSelector) {
  // Fetch SVG document
  let svgText = await fetch(src, {method: "GET"})
    .then(async (response) => {
    return await response.text()
  });
  // Append SVG to new div
  let div = document.createElement("div");
  div.innerHTML = svgText;
  div.id = id;
  // Append div to parent element
  document.querySelector(parentElementSelector).append(div);
}