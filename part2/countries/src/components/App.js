import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Countries'
import CountryProfile from './CountryProfile'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  const [showAll, setShowAll] = useState(true)

  const countriesToShow = showAll
  ? countries
  : countries.filter(countries => countries.name.toLowerCase().includes(filterText.toLowerCase()))

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
    if(filterText !== 0) {
      setShowAll(false)
    }
    else {
      setShowAll(true)
    }
  }

  const handleShow = (countryName) => {
    setFilterText(countryName)
  }

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  // executed immediately after rendering
  useEffect(hook, [])

  return (
    <div>
      <div>
        find countries <input value={filterText} onChange={handleFilterChange} />
      </div>
      {countriesToShow.length > 10
        ? 'Too many matches, specify another filter'
        : countriesToShow.length === 1
          ? <CountryProfile country={countriesToShow[0]} />
          : <Countries countries={countriesToShow} show={handleShow} />
      }
    </div>
  )
}

export default App