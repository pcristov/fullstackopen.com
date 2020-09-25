import React from 'react'

const WeatherDetails = ({temperature, icons, wind_speed, wind_dir}) => {
  return (
    <div>
        <b>temperature:</b> {temperature} Celsius
        <div>
            <img src={icons} alt="weather icon" />
        </div>
        <b>wind:</b> {wind_speed} mph direction {wind_dir}
    </div>
  )
}

export default WeatherDetails