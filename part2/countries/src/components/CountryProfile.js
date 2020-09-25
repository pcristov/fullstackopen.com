import React from 'react'
import Weather from './Weather'

const CountryProfile = ({country}) => {
  return (
    <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>Spoken languages</h2>
        <ul>
        {country.languages.map((language, index) =>
            <li key={index}>{language.name}</li>    
        )}
        </ul>
        <img src={country.flag} alt={`flag ${country.name}`} style={{width: '150px'}} />
        <Weather city={country.capital}  />
    </div>
  )
}

export default CountryProfile