// global dom stuff
var width = 300, height = 300
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

var info = d3.select('body').append('h3')
  .attr('id', 'id-info');

// global data stuff
var nodes = [];
var links = [];
var sim = setUpSim(svg, nodes, links);


document.addEventListener("DOMContentLoaded", event => {
  const db = firebase.firestore()

  db.collection('events').get()
    .then(querySnapshot => {
      querySnapshot.forEach(eventDoc => {
        let docData = eventDoc.data();
        nodes.push( {id: eventDoc.id, ...docData, event: true} );
        docData.attendees.forEach(
          ref => ref.get().then(
            personDoc => {
              //console.log(doc.id);
              links.push( {source: eventDoc.id, target: personDoc.id} )
              nodes.push( {id: personDoc.id, ...personDoc.data()} );
              sim.nodes(nodes);
              sim.alpha(1);
            }
          )
        );
      });
    })
})

// var {fnodes, flinks} = getData();
// setUpSim(svg, fnodes, flinks);
