const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

const infoPeople = `<p>Phonebook has info for ${persons.length} people</p>`
const date = `<p>${Date()}</p>`

app.get('/api/info', (request, response) => {
	response.send(infoPeople + date)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if (person){
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const generateId = () => (Math.floor(Math.random() * 5000))

app.post('/api/persons', (request, response) => {
	const body = request.body

	if(!body.name){
		return response.status(400).json({error: 'name is missing'})
	} else if(!body.number) {
		return response.status(400).json({error: 'number is missing'})
	} else if(persons.find(person => person.name === body.name)){
		return response.status(400).json({error: 'name must be unique'})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId()
	}

	persons = persons.concat(person)
	response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
