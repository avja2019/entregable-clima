
import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
const key = '7dcd6aee5579c6cfc4ceadc0a6baffd9';

function App() {
  
  const [weather, setWeather] = useState();
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
 
  const success = (post) => {
    
    setCoords({
      lat: post.coords.latitude,
      lon: post.coords.longitude,
    });
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    
  }, [])

  useEffect(() => {
    if(coords){
      const {lat, lon} = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      axios.get(url)
      .then(res =>{
        const kel = res.data.main.temp;
        const cel = (kel - 273.15).toFixed(2);
        const fah = (cel * 9/5 + 32).toFixed(2);
        setTemp({cel: cel, fah: fah})
        setWeather(res.data);
      })
      .catch(err => console.log(err))

      .finally(() => {
       setTimeout(()=> {
        setIsLoading(false);
       }, 500)
      });
    }
    
  }, [coords])
  
  
  return (
    <div className='app'>
      {
        isLoading ? 
        <figure className='app__img'>
          <img src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' alt='is loading'></img>
        </figure> :
        <h1>
        <WeatherCard
          weather = {weather}
          temp={temp}
        />
      </h1>  
      }
      
    </div>
  )
}

export default App
