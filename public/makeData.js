var stuff = [];
document.addEventListener("DOMContentLoaded", event => {
  const db = firebase.firestore()

  db.collection('events').get()
    .then(querySnapshot => {
      console.log('stuff: ', stuff);
      querySnapshot.forEach(doc => {
        stuff.push(doc.data());
      });
    })
    .then(() => console.log('stuff: ', stuff));
})

function getData() {
  var events = [
    {
      id: 'e_lunch',
      attendees: ['dave', 'sam', 'bob']
    },
    {
      id: 'e_dinner',
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

  var links = [
    {source: 'bob', target: 'dave'},
    {source: 'bob', target: 'josh'},
    {source: 'josh', target: 'sam'},
  ]

  return {nodes: events.concat(people), links: links}
}
