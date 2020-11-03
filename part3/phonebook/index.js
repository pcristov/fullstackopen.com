const express = require('express')
const app = express()

let persons = [
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Ada Lovelace",
    "number": "1",
    "id": 5
  }
]

// ---

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// ---

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// ---
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// ---
  
app.get('/info', (request, response) => {
  const num = persons.length
  const people = num !== 0 && num > 1 ? 'people' : 'person'
  const text = num !== 0 ? `Phonebook has info for ${num} ${people}` : 'Phonebook is empty'
  const date = new Date();
  response.send(`${text}<br><br>${date}`)
})

// ---

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// ---

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.use(express.json())

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

// ---

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})