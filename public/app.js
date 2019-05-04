document.addEventListener("DOMContentLoaded", event => {
  const db = firebase.firestore()

  db.collection('events').get().then(function(querySnapshot) {
    let table = document.querySelector('#docs')
    let content = `
      <tr>
        <th>name</th>
        <th>description</th>
        <th>attendees</th>
      </tr>
    `
    table.innerHTML = content

    querySnapshot.forEach(function(doc) {
      let row = document.createElement('tr')
      table.appendChild(row)

      let nameCell = document.createElement('td')
      nameCell.innerText = doc.data().name
      row.appendChild(nameCell)

      let descrCell = document.createElement('td')
      descrCell.innerText = doc.data().description
      row.appendChild(descrCell)

      let attendeesCell = document.createElement('td')
      row.appendChild(attendeesCell)
      insertNameList(attendeesCell, db, doc.data().attendees)
    });
  });
})

function insertNameList(element, db, attendees) {
  attendees.forEach( ref => {
    let personDoc = db.collection('people').doc(ref.id)
    personDoc.get().then(person => {
      let personLink = document.createElement('a')
      personLink.setAttribute('href', '#')
      personLink.addEventListener('click', () => console.log('show '+person.data().name))
      personLink.innerText = person.data().name
      element.appendChild(personLink)
    })
  })
}
