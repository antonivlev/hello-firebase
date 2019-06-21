Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

class Node {
  constructor() {
    // assign node data from input first
    this.id = "node"+Math.random().toFixed(4)*1000;
    this.name = nodeData.name === undefined ? nodeData.id : nodeData.name;
    // for all the other properties...
    Object.keys(nodeData).diff(["name", "id", "x", "y"]).map(property => {
      if (Array.isArray(nodeData[property])) {
        // if its a list of links
      } else {
        this[property] = nodeData[property];
      };
    });


    // construct node dom elements
    let g = d3.select("#group-for-zooming")
    let nodeGroup = g.append("g")
      .attr("id", nodeData.id)
      .attr("class", "node");
    nodeGroup.append("circle")
      .attr("class", "person");
    nodeGroup.append("text")
      .attr("transform", "translate(-10, 15)")
      .text(this.name);

    // how dom elements relate to node data
    this.updatePosition = () => {
      nodeGroup.attr("transform", "translate("+this.x+","+this.y+")");
    }
    this.x = nodeData.x === undefined ? 100 : nodeData.x;
    this.y = nodeData.y === undefined ? 100 : nodeData.y;

    // add drag behaviour
    nodeGroup.call(d3.drag()
      .on("drag", () => {
        this.x += d3.event.dx;
        this.y += d3.event.dy;
      })
    );
    nodeGroup.on("click", () => {
      let nodeInfo = document.querySelector("#node-info");
      nodeInfo.innerHTML = "";
      Object.keys(this).diff(["updatePosition"]).map( (attrName) => {
        let attrNameElement = document.createElement("span");
        attrNameElement.innerText = attrName + " : ";

        let attrValueElement = document.createElement("input");
        attrValueElement.setAttribute("placeholder", this[attrName]);

        nodeInfo.appendChild(attrNameElement);
        nodeInfo.appendChild(attrValueElement);
      });
    });
  }

  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this.updatePosition();
  }

  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this.updatePosition();
  }
}
