document.addEventListener("DOMContentLoaded", e => {
  console.log("populating db");
  const db = firebase.firestore();

  clearCollection(db, "events");
  clearCollection(db, "people").then(() => {
    var topics = ["bats", "clouds", "hedgehogs", "soy", "protein"]
    var peopleRef = db.collection("people");
    for (i=0;i<150;i++) {
      peopleRef.doc("person"+i).set(
        {
          name: "person"+i,
          description: "This is person"+i+" and he is great at :"+_.sample(topics, Math.floor(Math.random() * Math.floor(10))).join(),
        }
      );
    }
  }).then( () => {
    db.collection("people").get().then(snapshot => {
      let docRefs = snapshot.docs.map(d => d.ref);

      let eventsRef = db.collection("events");
      for (i=0;i<80;i++) {
        eventsRef.doc("event"+i).set(
          {
            name: "event"+i,
            attendees: _.sample(docRefs, Math.floor(Math.random() * Math.floor(10))),
          }
        );
      }
    });
  });


});

function clearCollection(db, name) {
  return db.collection(name).get().then(snapshot => {
    snapshot.docs.map( d => {
      if (d.data().name !== "control") d.ref.delete();
    });
  });
}
