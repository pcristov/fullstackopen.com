import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherDetails from './WeatherDetails'

const Weather = ({city}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherDetails, setWeatherDetails] = useState({})
    const hook = () => {
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: api_key,
                    query: city
                }
            })
            .then(response => {
            setWeatherDetails(response.data)
            })
        }

    // executed immediately after rendering
    useEffect(hook, [city])

    return (
        <div>
            <h2>Weather in {city}</h2>
            {weatherDetails.current !== undefined
                ?  <WeatherDetails temperature={weatherDetails.current.temperature} icons={weatherDetails.current.weather_icons} wind_speed={weatherDetails.current.wind_speed} wind_dir={weatherDetails.current.wind_dir} />
                : ''
            }
        </div>
    )
}

export default Weather