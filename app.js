/*eslint-env es6*/
"use strict";
/*
  Title: app.js
  Author: Brittny Eaddy
  Date: 1/26/21
  Purpose: To provide functionality to Weather App; links
    OpenWeatherMap API to app to display current weather stats.
*/

// Stores API key
const api = {
    key: "db48336fc222619ad2d3e7a20d8ab7dc",
    base: "http://api.openweathermap.org/data/2.5/"
}

// Allows user to search weather by city
const searchbar = document.querySelector('.searchbar');
searchbar.addEventListener('keypress', setQuery);

// Retrieves weather info after user enters city in searchbar
function setQuery(e) {
  if (e.keyCode == 13) {
    getWeather(searchbar.value);  
  }
}

function getWeather(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
  }).then(displayWeather);
}

// Displays results
function displayWeather(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
    
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
    
  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
    
  let desc = document.querySelector('.desc');
  desc.innerText = weather.weather[0].main;
    
  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`;
    
}

// Formats date
function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
    
  // Returns date in Day, Month Date, Year format
  return `${day}, ${month} ${date}, ${year}`;
}