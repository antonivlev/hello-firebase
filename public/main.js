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

document.addEventListener("DOMContentLoaded", event => {
  const db = firebase.firestore()

  db.collection('events').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let docData = doc.data();
        nodes.push( {...docData, event: true} );
        docData.attendees.forEach( ref => {
          ref.get().then( (doc) => console.log('---',doc.data()) );
        });
      });
    })
    .then(() => {
      console.log('drawing now');
      setUpSim(svg, nodes, links);
    });
})

// var {fnodes, flinks} = getData();
// setUpSim(svg, fnodes, flinks);
