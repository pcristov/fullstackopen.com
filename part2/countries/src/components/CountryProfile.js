import React from 'react'

const CountryProfile = ({country}) => {
  return (
    <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
        {country.languages.map(language =>
            <li key={country.alpha2Code + '-' + language.name} >{language.name}</li>    
        )}
        </ul>
        <img src={country.flag} alt={`flag ${country.name}`} style={{width: '150px'}} />
    </div>
  )
}

export default CountryProfile