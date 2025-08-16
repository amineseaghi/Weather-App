// import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
// import './App.css'
// import img from './images/img.png'
// import HourlyForecast from './Components/HourlyForecast'
// import axios from 'axios'
// import { useState } from 'react'



// function App() {
//   const [weatherData, setWeatherData] = useState(null)
//   const [city, setCity] = useState('')
//   const [error, setError] = useState("")


//   const api_key = "f811092c12894443b30172447251108"
//   const api_url = "http://api.weatherapi.com/v1/forecast.json"

//   const fetchData = async(query) => {
//     // fetch data from the API
//     try{
//       const response = await axios.get(`${api_url}?key=${api_key}&q=${query}&days=1`)
//       console.log(response.data.forecast.forecastday[0].hour)
//       setWeatherData(response.data)
//       setError('')

//     }catch(err){
//       //console.log("There was an error or the city was not found.")
//       setError("There was an error or the city was not found.")
//       setWeatherData(null)
//     }
//   }

//   const getCurrentLocation = () => {
//     if(navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const {latitude, longitude} = position.coords
//         const query = `${latitude} ${longitude}`
//         fetchData(query)
//       },(error)=> {
//         setError(error.message)
//       })
//     }else {
//       console.log("geolocation is not supported by this Browser. !")
//       setError("geolocation is not supported by this Browser !")
//     }
//   }

//   const handleKeyPress = (event) => {
//     if(event.key === "Enter"){
//       fetchData(city)
//     }
//   }
//   return (
//     <div className='bg-green-100 min-h-screen flex justify-center items-center'>
//       {/* -- Card container --*/}
//        <div className='bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'>

//         <div className='flex'>
//           <div className='flex border rounded items-center px-2 py-2 w-full'>
//             <FaSearch className='h-5 w-5' />
//             <input 
//             onKeyUp={handleKeyPress}
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             type="text"
//             placeholder="Entry City Name"
//             className='pl-2 border-none focus:outline-none w-full'
//             />
//           </div>
//           <button onClick={getCurrentLocation}
//             className='px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600'>
//             <FaMapMarkerAlt className='h-5 w-5'/>
//           </button>

//         </div>
//         {/* display the error message */}
//         {error && <p className='text-red-500 text-center mt-4'>{error}</p>}

//         {/* Weather Data Display */}
//         {weatherData && (
//           <div className='mt-4 text-center'>
//             <h2 className='text-xl font-semibold'>{weatherData.location.name}</h2>
//             {/* Weather icon */}
//             <img
//             src={weatherData.current.condition.icon}
//             alt='weather icon'
//             className='mx-auto h-40'
//             />
//             <p className='text-lg font-semibold'>{weatherData.current.temp_c}</p>
//             <p className='text-sm capitalize font-semibold'>{weatherData.current.condition.text}</p>

//             {/*Hourly forecast */}
//             <HourlyForecast  hourlyData={weatherData.forecast.forecastday[0].hour} />
//           </div>
//         )}
          

//        </div>
//     </div>
//   )
// }

// export default App
// //////////////////////////////////
// Version V1
// import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
// import './App.css'
// import HourlyForecast from './Components/HourlyForecast'
// import axios from 'axios'
// import { useEffect, useRef, useState } from 'react'

// function App() {
//   // ------------------ State ------------------
//   const [weatherData, setWeatherData] = useState(null)
//   const [city, setCity] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   // Autocomplete
//   const [suggestions, setSuggestions] = useState([])
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const debounceRef = useRef(null)
//   const inputRef = useRef(null)

//   // ------------------ API Config ------------------
//   const api_key = 'f811092c12894443b30172447251108' // OK for learning
//   const api_url = 'https://api.weatherapi.com/v1/forecast.json'
//   const search_url = 'https://api.weatherapi.com/v1/search.json'

//   // ------------------ Helpers ------------------
//   const fetchData = async (query) => {
//     if (!query || !query.trim()) {
//       setError('Please enter a city name.')
//       setWeatherData(null)
//       return
//     }
//     try {
//       setLoading(true)
//       setError('')
//       const response = await axios.get(
//         `${api_url}?key=${api_key}&q=${encodeURIComponent(query)}&days=1&aqi=no&alerts=no`
//       )
//       setWeatherData(response.data)
//     } catch (err) {
//       setWeatherData(null)
//       setError('There was an error or the city was not found.')
//     } finally {
//       setLoading(false)
//       setShowSuggestions(false)
//     }
//   }

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords
//           const query = `${latitude},${longitude}` // comma also works
//           fetchData(query)
//         },
//         (err) => setError(err.message)
//       )
//     } else {
//       setError('Geolocation is not supported by this browser!')
//     }
//   }

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault()
//       // لو عندي اقتراحات، خذ أول واحد
//       if (suggestions.length > 0) {
//         const first = suggestions[0]
//         const q = `${first.name}${first.region ? ', ' + first.region : ''}, ${first.country}`
//         setCity(q)
//         fetchData(q)
//       } else {
//         fetchData(city)
//       }
//     } else if (event.key === 'Escape') {
//       setShowSuggestions(false)
//     }
//   }

//   const handleSelectSuggestion = (sug) => {
//     const q = `${sug.name}${sug.region ? ', ' + sug.region : ''}, ${sug.country}`
//     setCity(q)
//     setShowSuggestions(false)
//     fetchData(q)
//     inputRef.current?.blur()
//   }

//   // ------------------ Autocomplete effect ------------------
//   useEffect(() => {
//     // نجيب اقتراحات فقط إذا كاين 2 حروف أو أكثر
//     if (city.trim().length < 2) {
//       setSuggestions([])
//       return
//     }

//     // debounce 300ms
//     if (debounceRef.current) clearTimeout(debounceRef.current)
//     debounceRef.current = setTimeout(async () => {
//       try {
//         const res = await axios.get(
//           `${search_url}?key=${api_key}&q=${encodeURIComponent(city.trim())}`
//         )
//         setSuggestions(res.data || [])
//         setShowSuggestions(true)
//       } catch {
//         // نجهل خطأ الاقتراحات باش ما نزعجش المستخدم
//         setSuggestions([])
//       }
//     }, 300)

//     return () => clearTimeout(debounceRef.current)
//   }, [city])

//   // ------------------ UI ------------------
//   return (
//     <div className='bg-green-100 min-h-screen flex justify-center items-center'>
//       {/* Card container */}
//       <div className='relative bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'>

//         {/* Search row */}
//         <div className='flex'>
//           <div className='relative flex border rounded items-center px-2 py-2 w-full'>
//             <FaSearch className='h-5 w-5 shrink-0' />
//             <input
//               ref={inputRef}
//               onKeyDown={handleKeyDown}
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               onFocus={() => city.trim().length >= 2 && setShowSuggestions(true)}
//               type='text'
//               placeholder='Enter city name'
//               className='pl-2 border-none focus:outline-none w-full'
//               autoComplete='off'
//             />

//             {/* Suggestions dropdown */}
//             {showSuggestions && suggestions.length > 0 && (
//               <ul className='absolute left-0 right-0 top-full mt-2 bg-white border rounded shadow z-10 max-h-60 overflow-auto'>
//                 {suggestions.map((s) => {
//                   const key = `${s.id || s.name}-${s.lat}-${s.lon}`
//                   const label = `${s.name}${s.region ? ', ' + s.region : ''}, ${s.country}`
//                   return (
//                     <li
//                       key={key}
//                       className='px-3 py-2 hover:bg-green-50 cursor-pointer text-sm'
//                       onMouseDown={(e) => {
//                         // onMouseDown باش مايضيعش focus قبل onClick
//                         e.preventDefault()
//                         handleSelectSuggestion(s)
//                       }}
//                     >
//                       {label}
//                     </li>
//                   )
//                 })}
//               </ul>
//             )}
//           </div>

//           <button
//             onClick={getCurrentLocation}
//             className='px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600'
//             title='Use my location'
//           >
//             <FaMapMarkerAlt className='h-5 w-5' />
//           </button>
//         </div>

//         {/* Loading / Error */}
//         {loading && <p className='text-center mt-4'>Loading…</p>}
//         {!loading && error && <p className='text-red-500 text-center mt-4'>{error}</p>}

//         {/* Weather Data Display */}
//         {!loading && weatherData && (
//           <div className='mt-4 text-center'>
//             <h2 className='text-xl font-semibold'>{weatherData.location.name}</h2>

//             {/* Weather icon */}
//             <img
//               src={weatherData.current.condition.icon}
//               alt='weather icon'
//               className='mx-auto h-40'
//             />

//             {/* Temperature with one decimal */}
//             <p className='text-lg font-semibold'>
//               {Number(weatherData.current.temp_c).toFixed(1)}°C
//             </p>

//             <p className='text-sm capitalize font-semibold'>
//               {weatherData.current.condition.text}
//             </p>

//             {/* Hourly forecast */}
//             <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default App



// /////////////////////////////////////
// Version 2
// import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
// import './App.css'
// import HourlyForecast from './Components/HourlyForecast'
// import axios from 'axios'
// import { useEffect, useRef, useState } from 'react'

// function App() {
//   // ------------------ State ------------------
//   const [weatherData, setWeatherData] = useState(null)
//   const [city, setCity] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   // Autocomplete
//   const [suggestions, setSuggestions] = useState([])
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const debounceRef = useRef(null)
//   const inputRef = useRef(null)

//   // ------------------ API Config ------------------
//   const api_key = 'f811092c12894443b30172447251108' // للتجربة فقط
//   const api_url = 'https://api.weatherapi.com/v1/forecast.json'
//   const search_url = 'https://api.weatherapi.com/v1/search.json'

//   // ------------------ Helpers ------------------
//   const fetchData = async (query) => {
//     if (!query || !query.trim()) {
//       setError('Please enter a city name.')
//       setWeatherData(null)
//       return
//     }
//     try {
//       setLoading(true)
//       setError('')
//       const response = await axios.get(
//         `${api_url}?key=${api_key}&q=${encodeURIComponent(query)}&days=1&aqi=no&alerts=no`
//       )
//       setWeatherData(response.data)
//     } catch (err) {
//       setWeatherData(null)
//       setError('There was an error or the city was not found.')
//     } finally {
//       setLoading(false)
//       setShowSuggestions(false)
//     }
//   }

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords
//           const query = `${latitude},${longitude}`
//           fetchData(query)
//         },
//         (err) => setError(err.message)
//       )
//     } else {
//       setError('Geolocation is not supported by this browser!')
//     }
//   }

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault()
//       // لو عندي اقتراحات، خذ أول واحد
//       if (suggestions.length > 0) {
//         const first = suggestions[0]
//         const q = `${first.name}${first.region ? ', ' + first.region : ''}, ${first.country}`
//         setCity(q)
//         fetchData(q)
//       } else {
//         fetchData(city)
//       }
//     } else if (event.key === 'Escape') {
//       setShowSuggestions(false)
//     }
//   }

//   const handleSelectSuggestion = (sug) => {
//     const q = `${sug.name}${sug.region ? ', ' + sug.region : ''}, ${sug.country}`
//     setCity(q)
//     setShowSuggestions(false)
//     fetchData(q)
//     inputRef.current?.blur()
//   }

//   // ------------------ Autocomplete effect ------------------
//   useEffect(() => {
//     if (city.trim().length < 2) {
//       setSuggestions([])
//       return
//     }

//     if (debounceRef.current) clearTimeout(debounceRef.current)
//     debounceRef.current = setTimeout(async () => {
//       try {
//         const res = await axios.get(
//           `${search_url}?key=${api_key}&q=${encodeURIComponent(city.trim())}`
//         )
//         setSuggestions(res.data || [])
//         setShowSuggestions(true)
//       } catch {
//         setSuggestions([])
//       }
//     }, 300)

//     return () => clearTimeout(debounceRef.current)
//   }, [city])

//   // ------------------ UI ------------------
//   return (
//     <div className='bg-green-100 min-h-screen flex justify-center items-center'>
//       <div className='relative bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'>
//         {/* Search row */}
//         <div className='flex'>
//           <div className='relative flex border rounded items-center px-2 py-2 w-full'>
//             <FaSearch className='h-5 w-5 shrink-0' />
//             <input
//               ref={inputRef}
//               onKeyDown={handleKeyDown}
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               onFocus={() => city.trim().length >= 2 && setShowSuggestions(true)}
//               type='text'
//               placeholder='Enter city name'
//               className='pl-2 border-none focus:outline-none w-full'
//               autoComplete='off'
//             />

//             {/* Suggestions dropdown */}
//             {showSuggestions && suggestions.length > 0 && (
//               <ul className='absolute left-0 right-0 top-full mt-2 bg-white border rounded shadow z-10 max-h-60 overflow-auto'>
//                 {suggestions.map((s) => {
//                   const key = `${s.id || s.name}-${s.lat}-${s.lon}`
//                   const label = `${s.name}${s.region ? ', ' + s.region : ''}, ${s.country}`
//                   return (
//                     <li
//                       key={key}
//                       className='px-3 py-2 hover:bg-green-50 cursor-pointer text-sm'
//                       onMouseDown={(e) => {
//                         e.preventDefault()
//                         handleSelectSuggestion(s)
//                       }}
//                     >
//                       {label}
//                     </li>
//                   )
//                 })}
//               </ul>
//             )}
//           </div>

//           <button
//             onClick={getCurrentLocation}
//             className='px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600'
//             title='Use my location'
//           >
//             <FaMapMarkerAlt className='h-5 w-5' />
//           </button>
//         </div>

//         {/* Loading / Error */}
//         {loading && <p className='text-center mt-4'>Loading…</p>}
//         {!loading && error && <p className='text-red-500 text-center mt-4'>{error}</p>}

//         {/* Weather Data Display */}
//         {!loading && weatherData && (
//           <div className='mt-4 text-center'>
//             <h2 className='text-xl font-semibold'>{weatherData.location.name}</h2>

//             <img
//               src={weatherData.current.condition.icon}
//               alt='weather icon'
//               className='mx-auto h-40'
//             />

//             {/* Temperature as integer */}
//             <p className='text-lg font-semibold'>
//               {Math.round(weatherData.current.temp_c)}°C
//             </p>

//             <p className='text-sm capitalize font-semibold'>
//               {weatherData.current.condition.text}
//             </p>

//             <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default App



// /////////////////////////////////////////
// version 3 
// ملاحظات سريعة

// العرض داير integers بفضل Math.round().

// الـ Toggle غير كيعرض بوحدة مختلفة، ما كيعاودش يطلب API، لأن WeatherAPI أصلاً كيرجع temp_c و temp_f.

// إذا بغيت توسّع التبديل (الرياح km/h ↔ mph، المسافة km ↔ miles)، نقترح نزيد state واحد للوحدة ونطبّق نفس الفكرة على باقي القيم.

// بغيتي نزيد Wind و Humidity و Feels like في الكارد؟ نكتب لك السطور الجاهزة ونحطها في App.jsx 😉



// import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
// import './App.css'
// import HourlyForecast from './Components/HourlyForecast'
// import axios from 'axios'
// import { useEffect, useRef, useState } from 'react'

// function App() {
//   // ------------------ State ------------------
//   const [weatherData, setWeatherData] = useState(null)
//   const [city, setCity] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   // Autocomplete
//   const [suggestions, setSuggestions] = useState([])
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const debounceRef = useRef(null)
//   const inputRef = useRef(null)

//   // Unit toggle: 'C' or 'F'
//   const [unit, setUnit] = useState('C')

//   // ------------------ API Config ------------------
//   const api_key = 'f811092c12894443b30172447251108' // للتجربة فقط
//   const api_url = 'https://api.weatherapi.com/v1/forecast.json'
//   const search_url = 'https://api.weatherapi.com/v1/search.json'

//   // ------------------ Helpers ------------------
//   const fetchData = async (query) => {
//     if (!query || !query.trim()) {
//       setError('Please enter a city name.')
//       setWeatherData(null)
//       return
//     }
//     try {
//       setLoading(true)
//       setError('')
//       const response = await axios.get(
//         `${api_url}?key=${api_key}&q=${encodeURIComponent(query)}&days=1&aqi=no&alerts=no`
//       )
//       setWeatherData(response.data)
//     } catch (err) {
//       setWeatherData(null)
//       setError('There was an error or the city was not found.')
//     } finally {
//       setLoading(false)
//       setShowSuggestions(false)
//     }
//   }

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords
//           const query = `${latitude},${longitude}`
//           fetchData(query)
//         },
//         (err) => setError(err.message)
//       )
//     } else {
//       setError('Geolocation is not supported by this browser!')
//     }
//   }

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault()
//       if (suggestions.length > 0) {
//         const first = suggestions[0]
//         const q = `${first.name}${first.region ? ', ' + first.region : ''}, ${first.country}`
//         setCity(q)
//         fetchData(q)
//       } else {
//         fetchData(city)
//       }
//     } else if (event.key === 'Escape') {
//       setShowSuggestions(false)
//     }
//   }

//   const handleSelectSuggestion = (sug) => {
//     const q = `${sug.name}${sug.region ? ', ' + sug.region : ''}, ${sug.country}`
//     setCity(q)
//     setShowSuggestions(false)
//     fetchData(q)
//     inputRef.current?.blur()
//   }

//   // ------------------ Autocomplete effect ------------------
//   useEffect(() => {
//     if (city.trim().length < 2) {
//       setSuggestions([])
//       return
//     }
//     if (debounceRef.current) clearTimeout(debounceRef.current)
//     debounceRef.current = setTimeout(async () => {
//       try {
//         const res = await axios.get(
//           `${search_url}?key=${api_key}&q=${encodeURIComponent(city.trim())}`
//         )
//         setSuggestions(res.data || [])
//         setShowSuggestions(true)
//       } catch {
//         setSuggestions([])
//       }
//     }, 300)
//     return () => clearTimeout(debounceRef.current)
//   }, [city])

//   // Helper: اختار الحرارة حسب الوحدة
//   const currentTemp = () => {
//     if (!weatherData) return ''
//     const v = unit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f
//     return Math.round(Number(v))
//   }

//   // ------------------ UI ------------------
//   return (
//     <div className='bg-green-100 min-h-screen flex justify-center items-center'>
//       <div className='relative bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'>
//         {/* Search row */}
//         <div className='flex'>
//           <div className='relative flex border rounded items-center px-2 py-2 w-full'>
//             <FaSearch className='h-5 w-5 shrink-0' />
//             <input
//               ref={inputRef}
//               onKeyDown={handleKeyDown}
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               onFocus={() => city.trim().length >= 2 && setShowSuggestions(true)}
//               type='text'
//               placeholder='Enter city name'
//               className='pl-2 border-none focus:outline-none w-full'
//               autoComplete='off'
//             />

//             {/* Suggestions dropdown */}
//             {showSuggestions && suggestions.length > 0 && (
//               <ul className='absolute left-0 right-0 top-full mt-2 bg-white border rounded shadow z-10 max-h-60 overflow-auto'>
//                 {suggestions.map((s) => {
//                   const key = `${s.id || s.name}-${s.lat}-${s.lon}`
//                   const label = `${s.name}${s.region ? ', ' + s.region : ''}, ${s.country}`
//                   return (
//                     <li
//                       key={key}
//                       className='px-3 py-2 hover:bg-green-50 cursor-pointer text-sm'
//                       onMouseDown={(e) => {
//                         e.preventDefault()
//                         handleSelectSuggestion(s)
//                       }}
//                     >
//                       {label}
//                     </li>
//                   )
//                 })}
//               </ul>
//             )}
//           </div>

//           <button
//             onClick={getCurrentLocation}
//             className='px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600'
//             title='Use my location'
//           >
//             <FaMapMarkerAlt className='h-5 w-5' />
//           </button>
//         </div>

//         {/* Unit toggle */}
//         <div className='mt-3 flex justify-end'>
//           <button
//             onClick={() => setUnit((u) => (u === 'C' ? 'F' : 'C'))}
//             className='text-xs border rounded px-2 py-1 hover:bg-green-50'
//             title='Toggle °C / °F'
//           >
//             {unit === 'C' ? 'Show in °F' : 'Show in °C'}
//           </button>
//         </div>

//         {/* Loading / Error */}
//         {loading && <p className='text-center mt-4'>Loading…</p>}
//         {!loading && error && <p className='text-red-500 text-center mt-4'>{error}</p>}

//         {/* Weather Data Display */}
//         {!loading && weatherData && (
//           <div className='mt-4 text-center'>
//             <h2 className='text-xl font-semibold'>{weatherData.location.name}</h2>

//             <img
//               src={weatherData.current.condition.icon}
//               alt='weather icon'
//               className='mx-auto h-40'
//             />

//             {/* Temperature as integer based on unit */}
//             <p className='text-lg font-semibold'>
//               {currentTemp()}°{unit}
//             </p>

//             <p className='text-sm capitalize font-semibold'>
//               {weatherData.current.condition.text}
//             </p>

//             <HourlyForecast
//               hourlyData={weatherData.forecast.forecastday[0].hour}
//               unit={unit}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default App


// //////////////////////////////////////////
// Version 4 
// Add time and date
// import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
// import './App.css'
// import HourlyForecast from './Components/HourlyForecast'
// import axios from 'axios'
// import { useEffect, useRef, useState } from 'react'

// function App() {
//   // ------------------ State ------------------
//   const [weatherData, setWeatherData] = useState(null)
//   const [city, setCity] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   // Autocomplete
//   const [suggestions, setSuggestions] = useState([])
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const debounceRef = useRef(null)
//   const inputRef = useRef(null)

//   // Unit toggle: 'C' or 'F'
//   const [unit, setUnit] = useState('C')

//   // Live clock
//   const [now, setNow] = useState(new Date())

//   // ------------------ API Config ------------------
//   const api_key = 'f811092c12894443b30172447251108' // للتجربة فقط
//   const api_url = 'https://api.weatherapi.com/v1/forecast.json'
//   const search_url = 'https://api.weatherapi.com/v1/search.json'

//   // ------------------ Effects ------------------
//   // Live clock tick each second
//   useEffect(() => {
//     const id = setInterval(() => setNow(new Date()), 1000)
//     return () => clearInterval(id)
//   }, [])

//   // Autocomplete effect
//   useEffect(() => {
//     if (city.trim().length < 2) {
//       setSuggestions([])
//       return
//     }
//     if (debounceRef.current) clearTimeout(debounceRef.current)
//     debounceRef.current = setTimeout(async () => {
//       try {
//         const res = await axios.get(
//           `${search_url}?key=${api_key}&q=${encodeURIComponent(city.trim())}`
//         )
//         setSuggestions(res.data || [])
//         setShowSuggestions(true)
//       } catch {
//         setSuggestions([])
//       }
//     }, 300)
//     return () => clearTimeout(debounceRef.current)
//   }, [city])

//   // ------------------ Helpers ------------------
//   const fetchData = async (query) => {
//     if (!query || !query.trim()) {
//       setError('Please enter a city name.')
//       setWeatherData(null)
//       return
//     }
//     try {
//       setLoading(true)
//       setError('')
//       const response = await axios.get(
//         `${api_url}?key=${api_key}&q=${encodeURIComponent(query)}&days=1&aqi=no&alerts=no`
//       )
//       setWeatherData(response.data)
//     } catch (err) {
//       setWeatherData(null)
//       setError('There was an error or the city was not found.')
//     } finally {
//       setLoading(false)
//       setShowSuggestions(false)
//     }
//   }

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords
//           const query = `${latitude},${longitude}`
//           fetchData(query)
//         },
//         (err) => setError(err.message)
//       )
//     } else {
//       setError('Geolocation is not supported by this browser!')
//     }
//   }

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault()
//       if (suggestions.length > 0) {
//         const first = suggestions[0]
//         const q = `${first.name}${first.region ? ', ' + first.region : ''}, ${first.country}`
//         setCity(q)
//         fetchData(q)
//       } else {
//         fetchData(city)
//       }
//     } else if (event.key === 'Escape') {
//       setShowSuggestions(false)
//     }
//   }

//   const handleSelectSuggestion = (sug) => {
//     const q = `${sug.name}${sug.region ? ', ' + sug.region : ''}, ${sug.country}`
//     setCity(q)
//     setShowSuggestions(false)
//     fetchData(q)
//     inputRef.current?.blur()
//   }

//   // اختر التوقيت: توقيت المدينة إن وُجد وإلا توقيت جهازك
//   const activeTimeZone =
//     weatherData?.location?.tz_id || Intl.DateTimeFormat().resolvedOptions().timeZone

//   // Formatter للتاريخ والساعة الحيّة
//   const formatDateTime = (date, timeZone) => {
//     try {
//       return new Intl.DateTimeFormat('en-GB', {
//         weekday: 'short',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: false,
//         timeZone,
//       }).format(date)
//     } catch {
//       // fallback
//       return date.toLocaleString()
//     }
//   }

//   // Helper: اختار الحرارة حسب الوحدة
//   const currentTemp = () => {
//     if (!weatherData) return ''
//     const v = unit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f
//     return Math.round(Number(v))
//   }

//   // ⬅️ هنا السطر الجديد: استخرج الساعة المحلية (0..23)
//   const currentLocalHour = weatherData?.location?.localtime
//     ? Number(weatherData.location.localtime.split(' ')[1].split(':')[0])
//     : null

//   // ------------------ UI ------------------
//   return (
//     <div className='bg-green-100 min-h-screen flex justify-center items-center'>
//       <div className='relative bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'>
//         {/* Search row */}
//         <div className='flex'>
//           <div className='relative flex border rounded items-center px-2 py-2 w-full'>
//             <FaSearch className='h-5 w-5 shrink-0' />
//             <input
//               ref={inputRef}
//               onKeyDown={handleKeyDown}
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               onFocus={() => city.trim().length >= 2 && setShowSuggestions(true)}
//               type='text'
//               placeholder='Enter city name'
//               className='pl-2 border-none focus:outline-none w-full'
//               autoComplete='off'
//             />

//             {/* Suggestions dropdown */}
//             {showSuggestions && suggestions.length > 0 && (
//               <ul className='absolute left-0 right-0 top-full mt-2 bg-white border rounded shadow z-10 max-h-60 overflow-auto'>
//                 {suggestions.map((s) => {
//                   const key = `${s.id || s.name}-${s.lat}-${s.lon}`
//                   const label = `${s.name}${s.region ? ', ' + s.region : ''}, ${s.country}`
//                   return (
//                     <li
//                       key={key}
//                       className='px-3 py-2 hover:bg-green-50 cursor-pointer text-sm'
//                       onMouseDown={(e) => {
//                         e.preventDefault()
//                         handleSelectSuggestion(s)
//                       }}
//                     >
//                       {label}
//                     </li>
//                   )
//                 })}
//               </ul>
//             )}
//           </div>

//           <button
//             onClick={getCurrentLocation}
//             className='px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600'
//             title='Use my location'
//           >
//             <FaMapMarkerAlt className='h-5 w-5' />
//           </button>
//         </div>

//         {/* Live Date & Time */}
//         <div className='mt-3 text-right text-xs text-gray-600'>
//           <span className='font-medium'>Time:</span>{' '}
//           {formatDateTime(now, activeTimeZone)}
//           {weatherData?.location?.tz_id ? ` (${weatherData.location.tz_id})` : ''}
//         </div>

//         {/* Unit toggle */}
//         <div className='mt-2 flex justify-end'>
//           <button
//             onClick={() => setUnit((u) => (u === 'C' ? 'F' : 'C'))}
//             className='text-xs border rounded px-2 py-1 hover:bg-green-50'
//             title='Toggle °C / °F'
//           >
//             {unit === 'C' ? 'Show in °F' : 'Show in °C'}
//           </button>
//         </div>

//         {/* Loading / Error */}
//         {loading && <p className='text-center mt-4'>Loading…</p>}
//         {!loading && error && <p className='text-red-500 text-center mt-4'>{error}</p>}

//         {/* Weather Data Display */}
//         {!loading && weatherData && (
//           <div className='mt-4 text-center'>
//             <h2 className='text-xl font-semibold'>{weatherData.location.name}</h2>

//             <img
//               src={weatherData.current.condition.icon}
//               alt='weather icon'
//               className='mx-auto h-40'
//             />

//             {/* Temperature as integer based on unit */}
//             <p className='text-lg font-semibold'>
//               {currentTemp()}°{unit}
//             </p>

//             <p className='text-sm capitalize font-semibold'>
//               {weatherData.current.condition.text}
//             </p>

//             {/* ⬇️ هنا زدنا currentHour */}
//             <HourlyForecast
//               hourlyData={weatherData.forecast.forecastday[0].hour}
//               unit={unit}
//               currentHour={currentLocalHour}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default App


// ////////////////////////////////////////////////////
// Version 5
// تصليح ظهور/إغلاق لائحة الاقتراحات (click outside + onBlur)
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import './App.css'
import HourlyForecast from './Components/HourlyForecast'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

function App() {
  // ------------------ State ------------------
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Autocomplete
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Unit toggle: 'C' or 'F'
  const [unit, setUnit] = useState('C')

  // Live clock
  const [now, setNow] = useState(new Date())

  // ------------------ Refs ------------------
  const debounceRef = useRef(null)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  // ------------------ API Config ------------------
  const api_key = 'f811092c12894443b30172447251108' // للتجربة فقط
  const api_url = 'https://api.weatherapi.com/v1/forecast.json'
  const search_url = 'https://api.weatherapi.com/v1/search.json'

  // ------------------ Effects ------------------
  // Live clock tick each second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Autocomplete effect
  useEffect(() => {
    if (city.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${search_url}?key=${api_key}&q=${encodeURIComponent(city.trim())}`
        )
        const list = res.data || []
        setSuggestions(list)
        setShowSuggestions(list.length > 0)
      } catch {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [city])

  // Close suggestions on outside click
  useEffect(() => {
    const handleDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleDocClick)
    return () => document.removeEventListener('mousedown', handleDocClick)
  }, [])

  // ------------------ Helpers ------------------
  const fetchData = async (query) => {
    if (!query || !query.trim()) {
      setError('Please enter a city name.')
      setWeatherData(null)
      return
    }
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(
        `${api_url}?key=${api_key}&q=${encodeURIComponent(query)}&days=1&aqi=no&alerts=no`
      )
      setWeatherData(response.data)
    } catch (err) {
      setWeatherData(null)
      setError('There was an error or the city was not found.')
    } finally {
      setLoading(false)
      setShowSuggestions(false)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const query = `${latitude},${longitude}`
          fetchData(query)
        },
        (err) => setError(err.message)
      )
    } else {
      setError('Geolocation is not supported by this browser!')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (suggestions.length > 0) {
        const first = suggestions[0]
        const q = `${first.name}${first.region ? ', ' + first.region : ''}, ${first.country}`
        setCity(q)
        fetchData(q)
      } else {
        fetchData(city)
      }
    } else if (event.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSelectSuggestion = (sug) => {
    const q = `${sug.name}${sug.region ? ', ' + sug.region : ''}, ${sug.country}`
    setCity(q)
    setShowSuggestions(false)
    fetchData(q)
    inputRef.current?.blur()
  }

  // Timezone to display clock
  const activeTimeZone =
    weatherData?.location?.tz_id || Intl.DateTimeFormat().resolvedOptions().timeZone

  const formatDateTime = (date, timeZone) => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone,
      }).format(date)
    } catch {
      return date.toLocaleString()
    }
  }

  const currentTemp = () => {
    if (!weatherData) return ''
    const v = unit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f
    return Math.round(Number(v))
  }

  // Extract local hour (0..23) from API localtime
  const currentLocalHour = weatherData?.location?.localtime
    ? Number(weatherData.location.localtime.split(' ')[1].split(':')[0])
    : null

  // ------------------ UI ------------------
  return (
    <div className='bg-green-100 min-h-screen flex justify-center items-center'>
      <div className='relative bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'>
        {/* Search row */}
        <div className='flex'>
          {/* Wrapper to handle outside clicks */}
          <div
            ref={dropdownRef}
            className='relative flex border rounded items-center px-2 py-2 w-full'
          >
            <FaSearch className='h-5 w-5 shrink-0' />
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              // no auto-open on focus; close on blur (delay to allow click)
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              type='text'
              placeholder='Enter city name'
              className='pl-2 border-none focus:outline-none w-full'
              autoComplete='off'
              aria-expanded={showSuggestions}
              aria-haspopup='listbox'
            />

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                role='listbox'
                className='absolute left-0 right-0 top-full mt-2 bg-white border rounded shadow z-10 max-h-60 overflow-auto'
              >
                {suggestions.map((s) => {
                  const key = `${s.id || s.name}-${s.lat}-${s.lon}`
                  const label = `${s.name}${s.region ? ', ' + s.region : ''}, ${s.country}`
                  return (
                    <li
                      key={key}
                      role='option'
                      className='px-3 py-2 hover:bg-green-50 cursor-pointer text-sm'
                      onMouseDown={(e) => {
                        e.preventDefault() // keep focus to allow selection
                        handleSelectSuggestion(s)
                      }}
                    >
                      {label}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <button
            onClick={getCurrentLocation}
            className='px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600'
            title='Use my location'
          >
            <FaMapMarkerAlt className='h-5 w-5' />
          </button>
        </div>

        {/* Live Date & Time */}
        <div className='mt-3 text-right text-xs text-gray-600'>
          <span className='font-medium'>Time:</span>{' '}
          {formatDateTime(now, activeTimeZone)}
          {weatherData?.location?.tz_id ? ` (${weatherData.location.tz_id})` : ''}
        </div>

        {/* Unit toggle */}
        <div className='mt-2 flex justify-end'>
          <button
            onClick={() => setUnit((u) => (u === 'C' ? 'F' : 'C'))}
            className='text-xs border rounded px-2 py-1 hover:bg-green-50'
            title='Toggle °C / °F'
          >
            {unit === 'C' ? 'Show in °F' : 'Show in °C'}
          </button>
        </div>

        {/* Loading / Error */}
        {loading && <p className='text-center mt-4'>Loading…</p>}
        {!loading && error && <p className='text-red-500 text-center mt-4'>{error}</p>}

        {/* Weather Data Display */}
        {!loading && weatherData && (
          <div className='mt-4 text-center'>
            <h2 className='text-xl font-semibold'>{weatherData.location.name}</h2>

            <img
              src={weatherData.current.condition.icon}
              alt='weather icon'
              className='mx-auto h-40'
            />

            {/* Temperature as integer based on unit */}
            <p className='text-lg font-semibold'>
              {currentTemp()}°{unit}
            </p>

            <p className='text-sm capitalize font-semibold'>
              {weatherData.current.condition.text}
            </p>

            <HourlyForecast
              hourlyData={weatherData.forecast.forecastday[0].hour}
              unit={unit}
              currentHour={currentLocalHour}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App



