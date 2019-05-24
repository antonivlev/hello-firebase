// global dom stuff
// laying out interface
var width = 300, height = 300
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .call(d3.zoom()
    .on("zoom", zoomed));

var g = svg.append('g');

function zoomed() {
  g.attr("transform", d3.event.transform);
}

var info = d3.select('body').append('h3')
  .attr('id', 'id-info');

var button = d3.select('body').append('button')
  .on('click', () => {
    nodes.push( {id: 'new-boi'} );
    links.push( {source: 'new-boi', target: 'emma'} );
    sim.nodes(nodes);
    sim.alpha(0.5);
    sim.restart();
  })
  .text('add node');

// global data stuff
var nodes = [];
var links = [];
var sim = setUpSim(g, nodes, links);


// fetch data
document.addEventListener("DOMContentLoaded", event => {
  const db = firebase.firestore()

  db.collection('events').get()
    .then(querySnapshot => {
      querySnapshot.forEach(eventDoc => {
        let docData = eventDoc.data();

        nodes.push( {id: eventDoc.id, ...docData, event: true} );
        sim.nodes(nodes);
        sim.alpha(1);
        sim.restart();

        docData.attendees.forEach(
          ref => ref.get().then(
            personDoc => {
              links.push( {source: eventDoc.id, target: personDoc.id} )
              nodes.push( {id: personDoc.id, ...personDoc.data()} );
              sim.nodes(nodes);
              sim.alpha(1);
              sim.restart();
            }
          )
        );
      });
    });
});
