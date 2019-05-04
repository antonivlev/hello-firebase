document.addEventListener("DOMContentLoaded", event => {
  const db = firebase.firestore()

  db.collection('events').get().then(function(querySnapshot) {
    let table = document.querySelector('#docs')
    // let firstDoc = querySnapshot.docs[0].data()
    // console.log(Object.keys(firstDoc))
    let content = `
      <tr>
        <th>name</th>
        <th>description</th>
        <th>attendees</th>
      </tr>
    `

    querySnapshot.forEach(function(doc) {
        content += `
          <tr>
            <td>${doc.data().name}</td>
            <td>${doc.data().description}</td>
            <td></td>
          </tr>`
        // insertNameList(db, doc.data().attendees, 'attendees')
    });
    table.innerHTML = content
  });
})

function insertNameList(db, attendees, elementID) {
  let firstAttendee = db.collection('people').doc(attendees[0].id)

  let name = firstAttendee.get().then(person => {
    document.querySelector('#'+id).innerText( person.data().name )
  })
  // let reducer = (names, ref) => {
  //   let personDoc = db.collection('people').doc(ref.id)
  //   let s = ' eh '
  //   personDoc.get().then(person => {
  //     s = person.data().name
  //     console.log(person.data().name)
  //   })
  //   return names + s + ref.id
  // }
  // let personDoc = db.collection('people').doc(ref.id)
  // personDoc.get().then(person => {
  //   namesString += person.data().name
  //   console.log(namesString)
  // })

  // console.log(attendees.reduce(reducer, ''))
  console.log(name)
  return name
}
