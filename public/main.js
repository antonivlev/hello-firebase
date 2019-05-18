// global dom stuff
var width = 300, height = 300
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

var info = d3.select('body').append('h3')
  .attr('id', 'id-info');

var button = d3.select('body').append('button')
  .on('click', () => {
    console.log('adding');
    nodes.push( {id: 'new-boi'} );
    links.push( {source: 'new-boi', target: 'dave'} );
    simulation.nodes(nodes);
    simulation.alpha(1);
    //simulation.restart();
    //simulation.alpha()
    // simulation.restart();
  })
  .text('add node');


// global data stuff
var {nodes, links} = getData();

var simulation = d3.forceSimulation(nodes)
  // ^ adds x, y, vx, vy, to each obj in people. These update according to forces below.
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width/2, height/2))
  .force('link', d3.forceLink(links).id(d => d.id))
  // adds x, y to source and target in links
  .on('tick', ticked);

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
