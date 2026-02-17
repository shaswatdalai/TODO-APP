document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById("city-input")
  const getWeatherBtn = document.getElementById("get-weather-btn")
  const weatherInfo = document.getElementById("weather-info")
  const cityNameDisplay = document.getElementById("city-name")
  const temperatureDisplay = document.getElementById("temperature")
  const descriptionDisplay = document.getElementById("description")
  const errorMessage = document.getElementById("error-message")
  const windSpeed = document.getElementById("wind")

  const API_KEY = "f66dce5f7a8a8bfe294105437a9cdb00"

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim()
    if (!city) return ""

    //it may throw an error 
    //server/database is always in an another continent

    try {
      const weatherData = await fetchWeatherData(city)//since we are waiting to grab the server, we have to use async and await
      displayWeatherData(weatherData)
    } catch (error) {
      showError()
    }


  })

  async function fetchWeatherData(city) {//gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url)//ismei fetch kr rhe isslie async and await use kr rhe
    console.log(typeof response);
    console.log("RESPONSE", response);
    if (!response.ok) {
      throw new Error("city not found")
    }
    const data = await response.json()//convert to object
    return data

  }
  function displayWeatherData(data) {//display 
    console.log(data);
    const { name, main, weather, wind } = data//went to the console and decided which all data i want to display. always use console log before this to see everything in console. name here is just a strong , main is a complex object. so we have to use a dot property to extract it and weather is an array 
    cityNameDisplay.textContent = name


    //unlock the display
    weatherInfo.classList.remove('hidden')//remove the hidden id . what this does is it makes the text visible
    errorMessage.classList.add('hidden') // if theres an error previously , it shows that 
    temperatureDisplay.textContent = `TAPMAN : ${main.temp}`
    descriptionDisplay.textContent = `MAUSAM : ${weather[0].description}`
    windSpeed.textContent = `Wind Speed : ${wind.speed}`
  }

  function showError() {
    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')//html part ache se dekho iss code ka to understand better
  }
})