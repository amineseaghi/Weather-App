// import React, { useRef } from 'react'
// import img from '../images/img.png'
// import "./HourlyForecast.css"
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'


// const HourlyForecast = ({ hourlyData }) => {

//     const scrollRef = useRef(null)        // reference to the scrollbar container... 

//     // scroll function
//     const scrollLeft = () => {
//         scrollRef.current.scrollBy({left:-300, Behavior: 'smooth'})
//     }
//     const scrollRight = () => {
//         scrollRef.current.scrollBy({left: 300, Behavior:'smooth'})
//     }


//   return (
//     <div className='relative mt-6'>
//         <div ref={scrollRef}
//              className='flex gap-2 mx-10 py-2 overflow-x-auto scrollbar-hide' 
//              style={{scrollBehavior:'smooth'}} >

//                 {
//                     hourlyData.map((hour,index) => (
                        
//                         <div key={index} className='flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4'>
//                             <p>{new Date(hour.time).getHours()}:00</p>
//                             <img src={hour.condition.icon} 
//                                 alt="weather app" 
//                                 className='w-10 mx-auto' />
//                             <p>{hour.temp_c}°C</p>
                     
//                         </div>
//                     ))
//                 }
               

//         </div>
//         {/* Scroll Button */}
//         <button onClick={scrollLeft} 
//                 className='absolute left-0 top-1/4 bg-green-500 text-white transform translate-y-1/2
//                            rounded-full w-8 h-8 flex items-center justify-center'>
//             <FaChevronLeft className='w-4 w-4'/>
//         </button>
//         <button onClick={scrollRight} 
//                 className='absolute right-0 top-1/4 bg-green-500 text-white transform translate-y-1/2
//                            rounded-full w-8 h-8 flex items-center justify-center'>
//             <FaChevronRight className='w-4 w-4'/>
//         </button>
//     </div>
//   )
// }

// export default HourlyForecast



// //////////////////////////////////////////
// Version 2 :
// zd hna wla a3dad s7i7a

// 🔑 التغييرات:

// Math.round(hour.temp_c) → باش تبان الحرارة صحيحة.

// behavior: 'smooth' → تصحيح الكتابة.

// img تحيد.

// زدت min-w-[70px] للكارت باش يبقا العرض منظم حتى فـ scroll.




// import React, { useRef } from 'react'
// import "./HourlyForecast.css"
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// const HourlyForecast = ({ hourlyData }) => {
//   const scrollRef = useRef(null)

//   // scroll functions
//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
//   }
//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
//   }

//   return (
//     <div className='relative mt-6'>
//       <div
//         ref={scrollRef}
//         className='flex gap-2 mx-10 py-2 overflow-x-auto scrollbar-hide'
//         style={{ scrollBehavior: 'smooth' }}
//       >
//         {hourlyData.map((hour, index) => (
//           <div
//             key={index}
//             className='flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4 min-w-[70px]'
//           >
//             <p>{new Date(hour.time).getHours()}:00</p>
//             <img
//               src={hour.condition.icon}
//               alt='weather icon'
//               className='w-10 mx-auto'
//             />
//             {/* temperature as integer */}
//             <p>{Math.round(hour.temp_c)}°C</p>
//           </div>
//         ))}
//       </div>

//       {/* Scroll Buttons */}
//       <button
//         onClick={scrollLeft}
//         className='absolute left-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2
//                    rounded-full w-8 h-8 flex items-center justify-center shadow'
//       >
//         <FaChevronLeft className='w-4 h-4' />
//       </button>
//       <button
//         onClick={scrollRight}
//         className='absolute right-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2
//                    rounded-full w-8 h-8 flex items-center justify-center shadow'
//       >
//         <FaChevronRight className='w-4 h-4' />
//       </button>
//     </div>
//   )
// }

// export default HourlyForecast




// /////////////////////////////////////
// version 3 :
// ملاحظات سريعة

// العرض داير integers بفضل Math.round().

// الـ Toggle غير كيعرض بوحدة مختلفة، ما كيعاودش يطلب API، لأن WeatherAPI أصلاً كيرجع temp_c و temp_f.

// إذا بغيت توسّع التبديل (الرياح km/h ↔ mph، المسافة km ↔ miles)، نقترح نزيد state واحد للوحدة ونطبّق نفس الفكرة على باقي القيم.

// بغيتي نزيد Wind و Humidity و Feels like في الكارد؟ نكتب لك السطور الجاهزة ونحطها في App.jsx 😉



// import React, { useRef } from 'react'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import './HourlyForecast.css'

// const HourlyForecast = ({ hourlyData, unit = 'C' }) => {
//   const scrollRef = useRef(null)

//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
//   }
//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
//   }

//   const formatHour = (timeStr) => new Date(timeStr).getHours().toString().padStart(2, '0') + ':00'

//   const formatTemp = (hour) => {
//     const v = unit === 'C' ? hour.temp_c : hour.temp_f
//     return Math.round(Number(v))
//   }

//   return (
//     <div className='relative mt-6'>
//       <div
//         ref={scrollRef}
//         className='flex gap-2 mx-10 py-2 overflow-x-auto scrollbar-hide'
//         style={{ scrollBehavior: 'smooth' }}
//       >
//         {hourlyData.map((hour, index) => (
//           <div
//             key={index}
//             className='flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4 min-w-[70px]'
//             title={hour.condition.text}
//           >
//             <p className='text-xs'>{formatHour(hour.time)}</p>
//             <img src={hour.condition.icon} alt='weather icon' className='w-10 mx-auto' />
//             <p className='text-sm font-semibold'>
//               {formatTemp(hour)}°{unit}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Scroll Buttons */}
//       <button
//         onClick={scrollLeft}
//         className='absolute left-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2
//                    rounded-full w-8 h-8 flex items-center justify-center shadow'
//       >
//         <FaChevronLeft className='w-4 h-4' />
//       </button>
//       <button
//         onClick={scrollRight}
//         className='absolute right-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2
//                    rounded-full w-8 h-8 flex items-center justify-center shadow'
//       >
//         <FaChevronRight className='w-4 h-4' />
//       </button>
//     </div>
//   )
// }

// export default HourlyForecast

// //////////////////////////
// version 4
// ملاحظات سريعة

// دابا أول كارت ديال الساعات هي الساعة المقبلة حسب توقيت المدينة (من الـ API).

// إذا كنتِ فـ 23:xx → غادي تبدا بـ 00:00 (اليوم التالي) بشكل منطقي لأننا كنـدوّرو اللائحة.

// استعملت key={hour.time_epoch} باش يكون Stable Key إذا متوفر.

// إلا بغيت تعرض غير الساعات الجاية ديال اليوم بلا ما ندورو (يعني نحيد الساعات اللي دازت وما نرجعش 00:00)، نقترح لك نسخة بديلة كتـفلتر بدل ما كتـدوّر. قولّي ونديرها لك.


import React, { useEffect, useRef, useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './HourlyForecast.css'

const HourlyForecast = ({ hourlyData, unit = 'C', currentHour = null }) => {
  const scrollRef = useRef(null)

  // احسب منين نبدا: الساعة الجاية
  const startIndex = useMemo(() => {
    if (currentHour === null || Number.isNaN(currentHour)) return 0
    return (Number(currentHour) + 1) % 24
  }, [currentHour])

  // دوّر اللائحة باش تبدا من الساعة الجاية
  const rotatedData = useMemo(() => {
    if (!Array.isArray(hourlyData) || hourlyData.length === 0) return []
    return [...hourlyData.slice(startIndex), ...hourlyData.slice(0, startIndex)]
  }, [hourlyData, startIndex])

  // رجّع السكرول للبداية كلما تبدّلات البداية/المدينة
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0
  }, [startIndex, hourlyData])

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  // خُذ الساعة مباشرة من النص باش نتفادو مشكل التايمزون
  const formatHour = (timeStr) => {
    // timeStr example: "2025-08-16 06:00"
    const hh = timeStr.split(' ')[1]?.split(':')[0] ?? '00'
    return `${hh.padStart(2, '0')}:00`
  }

  const formatTemp = (hour) => {
    const v = unit === 'C' ? hour.temp_c : hour.temp_f
    return Math.round(Number(v))
  }

  return (
    <div className='relative mt-6'>
      <div
        ref={scrollRef}
        className='flex gap-2 mx-10 py-2 overflow-x-auto scrollbar-hide'
        style={{ scrollBehavior: 'smooth' }}
      >
        {rotatedData.map((hour) => (
          <div
            key={hour.time_epoch ?? hour.time}
            className='flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4 min-w-[70px]'
            title={hour.condition.text}
          >
            <p className='text-xs'>{formatHour(hour.time)}</p>
            <img src={hour.condition.icon} alt='weather icon' className='w-10 mx-auto' />
            <p className='text-sm font-semibold'>
              {formatTemp(hour)}°{unit}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className='absolute left-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2
                   rounded-full w-8 h-8 flex items-center justify-center shadow'
        aria-label='Scroll left'
      >
        <FaChevronLeft className='w-4 h-4' />
      </button>
      <button
        onClick={scrollRight}
        className='absolute right-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2
                   rounded-full w-8 h-8 flex items-center justify-center shadow'
        aria-label='Scroll right'
      >
        <FaChevronRight className='w-4 h-4' />
      </button>
    </div>
  )
}

export default HourlyForecast
