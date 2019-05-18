function setUpSim(svg, nodes, links) {
  // update rule: data -> elements
  function ticked() {
    // ENTER
    svg.selectAll('line')
      .data(links)
      .join('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    // append circle for each data point
    svg.selectAll('circle')
      .data(nodes)
      .join('circle')
        .attr('id', d => d.id)
        .attr('class', d => d.event ? 'event' : 'person')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        // basic interactivity
        .on('mouseover', (_, i, circles) => circles[i].classList.add('selected'))
        .on('mouseout', (_, i, circles) => circles[i].classList.remove('selected'))
        .on('click', d => d3.select('#id-info').text('name: '+d.name) );
  }

  var simulation = d3.forceSimulation(nodes)
    // ^ adds x, y, vx, vy, to each obj in people. These update according to forces below.
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    // adds x, y to source and target in links
    .force('links', d3.forceLink().id(d => d.id).links(links).distance(70))
    .on('tick', ticked);
    // ^ say what to do on internal tick of the sim

  return simulation;
}
