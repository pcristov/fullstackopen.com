import React from 'react'
import Country from './Country'

const Countries = ({countries, show}) => {
  return (
    <div>
    {countries.map((country) => 
        <Country key={country.alpha2Code} country={country} show={show} />
    )}
    </div>
  )
}

export default Countries