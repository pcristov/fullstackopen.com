import React, { useState, useEffect } from 'react'
import personService from '../services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

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

  const deletePerson = (event) => {
    event.preventDefault()
    if(window.confirm("Are you sure you want to delete this person?")) {
      personService
      .deletePerson(event.target.id)
      .then(returnedPeople => {
        hook()
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find(el => el.name === newName)

    if(found) {
      console.log(found)
      if(window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)) {
        const id = found.id
        const changedPerson = { ...found, number: newNumber }

        personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(
            `Updated ${found.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setErrorNotification(1)
          setNotification(
            `Information on ${found.name} has already been removed from server`
          )
          setTimeout(() => {
            setNotification(null)
            setErrorNotification(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
  
      personService
      .create(personObject)
      .then(returnedPeople => {
        setPersons(persons.concat(returnedPeople))
        setNewName('')
        setNewNumber('')
        setNotification(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
      <Notification message={notification} error={errorNotification} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App