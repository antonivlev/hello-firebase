Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

class Node {
  constructor(nodeData) {
    if (nodeData === undefined) {
      // initial node data
      this.id = "node"+(Math.random()*10000).toFixed(0);
      this.name = "name";
      this._x = 100;
      this._y = 100;
    } else {
      this.id = nodeData.id;
      this.name = nodeData.name;
      this._x = nodeData._x;
      this._y = nodeData._y;
    }
    console.log(this);

    // construct node dom elements
    let g = d3.select("#group-for-zooming")
    let nodeGroup = g.append("g")
      .attr("id", this.id)
      .attr("class", "node")
      .attr("transform", "translate("+this._x+","+this._y+")");
    nodeGroup.append("circle")
      .attr("class", "person");
    nodeGroup.append("text")
      .attr("transform", "translate(-10, 15)")
      .text(this.name);
    
    // add drag behaviour
    nodeGroup.call(d3.drag()
      .on("drag", () => {
        this.x += d3.event.dx;
        this.y += d3.event.dy;
      })
      .on("end", () => {
        updateDb(this);
      })
    );
    nodeGroup.on("click", () => {
      // populate #node-info with field editors
      let nodeInfo = document.querySelector("#node-info");
      nodeInfo.innerHTML = "";
      Object.keys(this).diff(["updatePosition"]).map( (attrName) => {
        let attrNameElement = document.createElement("span");
        attrNameElement.innerText = attrName + " : ";

        let attrValueElement = document.createElement("input");
        attrValueElement.id = this.id + attrName;
        attrValueElement.setAttribute("placeholder", this[attrName]);
        // must not edit these with fields, display for debugging 
        if (["id", "_x", "_y"].includes(attrName)) {
          attrValueElement.setAttribute("readonly", false);
        }
        attrValueElement.onchange = (e) => {
          this[attrName] = e.target.value;
          nodeGroup.select("text").text(this.name);
          updateDb(this);
        }

        nodeInfo.appendChild(attrNameElement);
        nodeInfo.appendChild(attrValueElement);
      });
    });

    updateDb(this);
    console.log(this);
  }

  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    // update attribute editor
    d3.select("#"+this.id+"_x").attr("placeholder", value);
    // update position of node group
    d3.select("#"+this.id).attr("transform", "translate("+this._x+","+this._y+")")
  }

  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    d3.select("#"+this.id+"_y").attr("placeholder", value);
    d3.select("#"+this.id).attr("transform", "translate("+this._x+","+this._y+")")
  }
}

function updateDb(node) {
  const db = firebase.firestore();
  db.collection("people").doc(node.id).set({
    name: node.name,
    _x: node._x,
    _y: node._y,
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });  
}
