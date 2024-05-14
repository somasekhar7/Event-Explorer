import React from 'react';
import './Weather.css';
import moment from 'moment';

const WeatherAppCardExplorer = ({ weatherData, date, location }) => (
    <div className="main">
        <p className="header">{location}</p>
        <div className="flex">
            <p className="day">{moment(date).format('dddd')}, <span>{moment(date).format('LL')}</span></p>
            <p className="description">{weatherData.weather[0].main}</p>
        </div>

        <div className="flex">
            <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
            <p className="temp">Humidity: {weatherData.main.humidity} %</p>
        </div>

        <div className="flex">
            <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
            <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        </div>

    </div>
);

export default WeatherAppCardExplorer;
