import React, { useState } from 'react'
import '../Styles/WeatherApp.css'
import Search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import Drizzel from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'

const WeatherApp = () => {

    let api_key= "2803d7df4b0bcdaac9371da4291c11fd"
    const [wicon,setWicon] = useState(cloud)

    const search= async()=>{
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value===""){
            return 0;        
        }
        let url= `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response =  await fetch(url);
        let data =await response.json()
        console.log(data)
        const humidity = document.getElementsByClassName('humidity-percent')
        const wind = document.getElementsByClassName('wind-rate')
        const temperature = document.getElementsByClassName('weather-temp')
        const location= document.getElementsByClassName('weather-location')

        humidity[0].innerHTML=data.main.humidity+" %";
        wind[0].innerHTML=Math.floor(data.wind.speed)+" km/hr";
        temperature[0].innerHTML=Math.floor(data.main.temp)+"°c";
        location[0].innerHTML=data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(clear)
        }else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloud)

        }else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(Drizzel)

        }else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain)

        }else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow)

        }else{
            setWicon(clear)
        }



    }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className='cityInput' placeholder='Search..' 
            />
            <div className="serch-icon" onClick={()=>{search()}}>
                <img src={Search} alt="" />
            </div>
        </div>

        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>

        <div className="weather-temp">32°c</div>
        <div className="weather-location">India</div>
        <div className="data-container">
            <div className="element">
                <img className='icon' src={humidity} alt="" />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humitidy</div>
                </div>
            </div>

            <div className="element">
                <img className='icon' src={wind} alt="" />
                <div className="data">
                    <div className="wind-rate">18Km/hr</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default WeatherApp