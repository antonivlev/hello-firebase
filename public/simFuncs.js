function setUpSim(g, nodes, links) {
  // update rule: data -> elements
  function ticked() {
    d3.select("#edges").selectAll("line")
      .data(links)
      .join("line")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    // append group containing (circle, text) for each data point
    // NOTE: would be nice to define node markup and behaviour in a separate html file
    let node = g.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
        .attr("class", "node")
        // basic interactivity
        .on("mouseover", (_, i, groups) => groups[i].classList.add("highlighted"))
        .on("mouseout", (_, i, groups) => groups[i].classList.remove("highlighted"))
        .on("click", d => d3.select("#id-info").text("name: "+d.name) );

    // construct node
    node.append("circle")
      .attr("id", d => d.id)
      .attr("class", d => d.event ? "event" : "person");
    node.append("text")
      .attr("transform", "translate(-10, 15)")
      .text(d => d.name);


    // update selections and links
    g.selectAll(".node")
      .data(nodes)
        .attr("transform", d => "translate(" + d.x + "," + d.y + ")");
  }

  var simulation = d3.forceSimulation(nodes)
    // ^ adds x, y, vx, vy, to each obj in nodes. These update according to forces below.
    .force("charge", d3.forceManyBody().strength(() => -200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    // adds x, y to source and target in links
    .force("links", d3.forceLink().id(d => d.id).links(links).distance(200))
    .on("tick", ticked)
    // ^ say what to do on internal tick of the sim

  return simulation;
}
