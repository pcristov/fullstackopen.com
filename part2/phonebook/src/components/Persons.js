import React from 'react'

const Persons = ({persons, deletePerson}) => {
  const label = 'delete'

  return (
    <div>
    {persons.map(person =>
      <div key={`person-${person.id}`}>
        <div key={person.name}>{person.name} {person.number}
          <button onClick={deletePerson} name={person.name} id={person.id}>{label}</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default Persons