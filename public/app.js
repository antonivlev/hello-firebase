// helper
let diff = (a1, a2) => a1.filter(x => !a2.includes(x))

function addTextToRow(row, text, cellType) {
  let cell = cellType ? document.createElement(cellType) : document.createElement('td')
  cell.innerText = text
  row.appendChild(cell)
}

function displayCollection(collectionName, viewConfig) {
  const db = firebase.firestore()
  let table = document.querySelector('#docs')
  table.innerHTML = ''

  db.collection(collectionName).get().then(function(querySnapshot) {
    let fields = viewConfig.fields
    let hrow = document.createElement('tr')
    table.appendChild(hrow)
    fields.map( field => addTextToRow(hrow, field, 'th'))

    let specialFields = viewConfig.specialFields ? Object.keys(viewConfig.specialFields) : []
    querySnapshot.forEach(function(rawDoc) {
      let doc = rawDoc.data()
      let row = document.createElement('tr')
      table.appendChild(row)
      fields.map( field => {
        if (specialFields.includes(field)) {
          let cell = document.createElement('td')
          row.appendChild(cell)
          viewConfig.specialFields[field](doc, cell)
        } else addTextToRow(row, doc[field])
      })
    })
  })
}


document.addEventListener("DOMContentLoaded", event => {
  let eventsView = {
    fields: ['name', 'description', 'attendees'],
    specialFields: {
      attendees: (eventDoc, attendeesCell) => {
        //put data from doc into cell
        let seePeopleLink = document.createElement('a')
        seePeopleLink.innerText = 'See attendees'
        seePeopleLink.setAttribute('href', '#')
        seePeopleLink.addEventListener('click', () => {
          console.log('show attendees for '+eventDoc.name)
          displayCollection('people', peopleView)
        })
        attendeesCell.appendChild(seePeopleLink)
        let peopleView = {
          fields: ['name']
        }
      }
    }
  }
  displayCollection('events', eventsView)
})
