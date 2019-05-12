var events = [
  {
    id: 'lunch',
    attendees: ['dave', 'sam', 'bob']
  },
  {
    id: 'dinner',
    attendees: ['josh', 'bob']
  }
]

var people = [
  {
    id: 'dave',
    attended: ['lunch']
  },
  {
    id: 'sam',
    attended: ['lunch']
  },
  {
    id: 'bob',
    attended: ['lunch', 'dinner']
  },
  {
    id: 'josh',
    attended: ['dinner']
  },
]

var width = 300, height = 300
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);


var simulation = d3.forceSimulation(people)
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2))
  // ^ added x, y, vx, vy, to each obj in people. These update according to forces. 
  .on('tick', () => {})
  .on('end', draw);
  // ^ say what to do in various parts of the sim

function draw() {
  console.log('drawing');
  svg.selectAll('circle')
    .data(people)
    .enter().append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('id', d => d.id)
      .attr('r', 3);
}
