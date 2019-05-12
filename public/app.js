// helper - array difference
let diff = (a1, a2) => a1.filter(x => !a2.includes(x))

function addTextToRow(row, text, cellType) {
  let cell = cellType ? document.createElement(cellType) : document.createElement('td')
  cell.innerText = text
  row.appendChild(cell)
}


// let eventsView = {
//   fields: ['name', 'description', 'attendees'],
//   linkFields: {
//     attendees: (doc) => {
//       let peopleView = {
//         fields: ['name', 'attended'],
//         whereArgs: ['attended', 'array-contains', doc.eventRef],
//         linkFields: {
//           attended: displayCollection('events', attendedConfig)
//         }
//       }
//       displayCollection('people', peopleView)
//     }
//   }
// }
//
// displayCollection('events', eventsView)


function displayCollection(collectionName, viewConfig) {
  console.log('Displaying ', collectionName, ' where: ', viewConfig.whereArgs)
  const db = firebase.firestore()
  let table = document.querySelector('#docs')
  table.innerHTML = ''

  let collectionPromise = viewConfig.whereArgs ?
    db.collection(collectionName).where(...viewConfig.whereArgs).get() :
    db.collection(collectionName).get()

  collectionPromise.then(function(querySnapshot) {
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
          viewConfig.specialFields[field](rawDoc, cell)
        } else addTextToRow(row, doc[field])
      })
    })
  })
}

document.addEventListener("DOMContentLoaded", event => {
  db = firebase.firestore()

  let eventsView = {
    fields: ['name', 'description', 'attendees'],
    specialFields: {
      attendees: (eventRawDoc, attendeesCell) => {
        //put data from doc into cell
        let seePeopleLink = document.createElement('a')
        seePeopleLink.innerText = 'See attendees'
        seePeopleLink.setAttribute('href', '#')
        seePeopleLink.addEventListener('click', () => {
          let peopleView = {
            whereArgs: ['attended', 'array-contains', eventRawDoc.ref],
            fields: ['name']
          }
          displayCollection('people', peopleView)
        })
        attendeesCell.appendChild(seePeopleLink)
      }
    }
  }
  displayCollection('events', eventsView)
})
