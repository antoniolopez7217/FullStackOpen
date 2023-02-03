import { useState } from 'react'

const Filter = ({newFilter, handleFilterChange}) => (
  <div>
    filter shown with <input value={newFilter} onChange={handleFilterChange}/>
  </div>
  )

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange}/>
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)



const Persons = ({persons, newFilter}) => {
  const filterPersons = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    filterPersons.map((filterPerson) => 
    <p key={filterPerson.id}>
      {filterPerson.name} {filterPerson.number}
    </p>)
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, SetNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.find(({name}) => name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {SetNewFilter(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>      

      <h2>add a new</h2>

      <PersonForm addPerson={addPerson} 
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} newFilter={newFilter}/>
    </div>
  )
}

export default App