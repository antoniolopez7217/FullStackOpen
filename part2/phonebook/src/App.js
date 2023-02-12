import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({person, deletePerson}) => (
    <p>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </p>
)

const Notification = ({message}) => {
  if (message === null){
    return null
  }
  const notifStyle = {
  color: 'green',
	background: 'lightgrey',
	fontSize: 20,
	borderStyle: 'solid',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10,
  }

  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, SetNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.find( x => x.name === newName)) {   
      if(window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`)){
        const person = persons.find(x => x.name === newName)
        const changedPerson = {...person, number: newNumber}
        let id = person.id

        personService
          .update({id, changedPerson})
          .then(() => {
            setPersons(persons.map(x => x.name !== newName ? x : changedPerson))
            setMessage(
              `Updated ${changedPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          })
      }
    }
    else{
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })

    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (filterPerson) => {
    if(window.confirm(`Delete ${filterPerson.name}`)){
    personService
      .remove(filterPerson.id)
      .then(() =>  setPersons(persons.filter(person => person.id !== filterPerson.id)))
      }}

  const filterPersons = newFilter ?
  persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) :
  persons

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {SetNewFilter(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>      

      <h2>add a new</h2>

      <PersonForm addPerson={addPerson} 
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {filterPersons.map(filterPerson =>
        <Person 
          key={filterPerson.name} 
          person={filterPerson} 
          deletePerson={() => deletePerson(filterPerson)} />
      )}
    </div>
  )
}

export default App
