import React from 'react'
import Country from './Country'

const Countries = ({countries}) => {
  return (
    <ul>
    {countries.map((country) => 
      <Country key={country.alpha2Code} country={country} />
    )}
  </ul>
  )
}

export default Countries