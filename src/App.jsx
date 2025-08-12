import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import './App.css'
import img from './images/img.png'
import HourlyForecast from './Components/HourlyForecast'
import axios from 'axios'
import { useState } from 'react'



function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('')
  const [error, setError] = useState("")


  const api_key = "f811092c12894443b30172447251108"
  const api_url = "http://api.weatherapi.com/v1/forecast.json"

  const fetchData = async(query) => {
    // fetch data from the API
    try{
      const response = await axios.get(`${api_url}?key=${api_key}&q=${query}&days=1`)
      console.log(response.data.forecast.forecastday[0].hour)
      setWeatherData(response.data)
      setError('')

    }catch(err){
      //console.log("There was an error or the city was not found.")
      setError("There was an error or the city was not found.")
      setWeatherData(null)
    }
  }

  const getCurrentLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords
        const query = `${latitude} ${longitude}`
        fetchData(query)
      },(error)=> {
        setError(error.message)
      })
    }else {
      console.log("geolocation is not supported by this Browser. !")
      setError("geolocation is not supported by this Browser !")
    }
  }

  const handleKeyPress = (event) => {
    if(event.key === "Enter"){
      fetchData(city)
    }
  }
  return (
    <div className='bg-green-100 min-h-screen flex justify-center items-center'>
      {/* -- Card container --*/}
       <div className='bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'>

        <div className='flex'>
          <div className='flex border rounded items-center px-2 py-2 w-full'>
            <FaSearch className='h-5 w-5' />
            <input 
            onKeyUp={handleKeyPress}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Entry City Name"
            className='pl-2 border-none focus:outline-none w-full'
            />
          </div>
          <button onClick={getCurrentLocation}
            className='px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600'>
            <FaMapMarkerAlt className='h-5 w-5'/>
          </button>

        </div>
        {/* display the error message */}
        {error && <p className='text-red-500 text-center mt-4'>{error}</p>}

        {/* Weather Data Display */}
        {weatherData && (
          <div className='mt-4 text-center'>
            <h2 className='text-xl font-semibold'>{weatherData.location.name}</h2>
            {/* Weather icon */}
            <img
            src={weatherData.current.condition.icon}
            alt='weather icon'
            className='mx-auto h-40'
            />
            <p className='text-lg font-semibold'>{weatherData.current.temp_c}</p>
            <p className='text-sm capitalize font-semibold'>{weatherData.current.condition.text}</p>

            {/*Hourly forecast */}
            <HourlyForecast  hourlyData={weatherData.forecast.forecastday[0].hour} />
          </div>
        )}
          

       </div>
    </div>
  )
}

export default App
