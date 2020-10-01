import React from 'react'

const Button = ({country, show, text}) => {
  return (
        <button onClick={() => show(country.name)}>{text}</button>
  )
}

export default Button