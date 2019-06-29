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

document.addEventListener("DOMContentLoaded", e => {
  // load all the nodes from db
  const db = firebase.firestore();
  db.collection("people").get().then(snapshot => {
    snapshot.forEach( doc => {
      let n = new Node( {id: doc.id, ...doc.data()} );
    });
  });
});

function createNode() {
  let n1 = new Node();
}


// utility debug func
function clearCollection(db, name) {
  return db.collection(name).get().then(snapshot => {
    snapshot.docs.map( d => {
      if (d.data().name !== "control") d.ref.delete();
    });
  });
}
