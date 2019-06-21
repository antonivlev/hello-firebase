//import {Node} from "/public/node.js";

// set up zoom
d3.select("svg")
  .call(
    // returns a function attaching click and drag listeners to svg
    d3.zoom().on("zoom", () => {
      // set group transform to d3 transform event which is
      // changed by mouse
      d3.select("#group-for-zooming").attr("transform", d3.event.transform);
    })
  );

function createNode() {
  let n1 = new Node();
}
