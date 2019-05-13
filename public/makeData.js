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
    {source: 'josh', target: 'dave'},
  ]

  return {nodes: events.concat(people), links: links}
}