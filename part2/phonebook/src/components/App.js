import React, { useState, useEffect } from 'react'
import personService from '../services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  // executed immediately after rendering
  useEffect(hook, [])

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
    if(filterText !== 0) {
      setShowAll(false)
    }
    else {
      setShowAll(true)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.some(el => el.name === newName)

    if(found) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
  
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App