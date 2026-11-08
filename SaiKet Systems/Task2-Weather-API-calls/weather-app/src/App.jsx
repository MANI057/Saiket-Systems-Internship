
import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const getWeather = async () => {
    if (city === '') {
      alert('Enter a city name')
      return
    }

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      )

      const data = await response.json()

      if (!data.results) {
        alert('City not found')
        return
      }

      const latitude = data.results[0].latitude
      const longitude = data.results[0].longitude
      const cityName = data.results[0].name

      const result = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
      )

      const weatherData = await result.json()

      setWeather({
        city: cityName,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m
      })

    } catch (error) {
      alert('Unable to fetch weather data')
    }
  }

  return (
    <div className="container">
      <div className="box">

        <h1>Weather App</h1>
        <p>Check the weather of any city</p>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Get Weather</button>

        {weather && (
          <div className="result">
            <h2>{weather.city}</h2>
            <h1>{weather.temperature} °C</h1>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.wind} km/h</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
