import React from 'react'
import Button from './Button'

const Country = ({country, show}) => {
  return (
    <div>
      {country.name} <Button country={country} show={show} text="show" />
    </div>
  )
}

export default Country