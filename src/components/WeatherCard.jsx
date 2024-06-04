import React, { useState } from 'react';
import './styles/weatherCard.css';

const WeatherCard = ({weather, temp}) => {

    const [isCell, setIsCell] = useState(true);

    const handleTemp = () => {
        setIsCell(!isCell)
    }

  return (
    <div className='weathercard'>
      <h1 className='weathercard__title'>weather app</h1>
      <h2 className='weathercard__city'>{weather?.name}, {weather?.sys.country}</h2>
      <section className='weathercard__body'>
        <figure className='weathercard__img'>
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt='weather image'/>
        </figure> 
      <article className='weathercard__data'> 
        <h3 className='weathercard__description'>"{weather?.weather[0].description}"</h3>
        <ul className='weathercard__list'>
            <li className='weathercard__item'>
                <span>wing speed</span>
                <span>{weather?.wind.speed} m/s</span>
            </li>
            <li className='weathercard__item'>
                <span>clouds</span>
                <span>{weather?.clouds.all} %</span>
            </li>
            <li className='weathercard__item'>
                <span>pressure</span>
                <span>{weather?.main.pressure} hPa</span>
            </li>
        </ul>
      </article>
      </section>
      <h2 className='weathercard__temp'>
        {
            isCell ? 
            temp?.cel + '°C'
            : temp.fah + '°F'
        } 
      </h2>
      <button className='weathercard__btn' onClick={handleTemp}>
        change to {isCell ? '°F' : '°C'}</button>
    </div>
  )
}

export default WeatherCard
