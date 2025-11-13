// weather.js

// API key and Bogotá latitude/longitude
const apiKey = "621c016dfe1fc3e8b99189fd8957d5cb";
const lat = 4.7110;
const lon = -74.0721;

// Personal icons for contrast and dynamism
const weatherIcons = {
  '01d': { icon: '☀️', name: 'Clear sky' },
  '02d': { icon: '🌤️', name: 'Partly cloudy' },
  '03d': { icon: '☁️', name: 'Cloudy' },
  '04d': { icon: '☁️', name: 'Overcast' },
  '09d': { icon: '🌧️', name: 'Light rain' },
  '10d': { icon: '🌦️', name: 'Rain' },
  '11d': { icon: '⛈️', name: 'Thunderstorm' },
  '13d': { icon: '🌨️', name: 'Snow' },
  '50d': { icon: '🌫️', name: 'Fog' },
  // Night
  '01n': { icon: '🌙', name: 'Clear sky' },
  '02n': { icon: '☁️', name: 'Partly cloudy' },
  '03n': { icon: '☁️', name: 'Cloudy' },
  '04n': { icon: '☁️', name: 'Overcast' },
  '09n': { icon: '🌧️', name: 'Light rain' },
  '10n': { icon: '🌧️', name: 'Rain' },
  '11n': { icon: '⛈️', name: 'Thunderstorm' },
  '13n': { icon: '🌨️', name: 'Snow' },
  '50n': { icon: '🌫️', name: 'Fog' }
};

function dateLabel(dt_txt) {
  const date = new Date(dt_txt);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
function getWeatherInfo(iconCode) {
  return weatherIcons[iconCode] || weatherIcons['01d'];
}

// Fetch current weather
async function fetchCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching current weather:", error);
    return null;
  }
}

// Fetch forecast
async function fetchForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return null;
  }
}

// Render main weather info (ONLY emoji icons, no PNG)
function displayWeather(currentData, forecastData) {
  // Actual Weather
  if (currentData) {
    const iconCode = currentData.weather[0].icon;
    const weatherInfo = getWeatherInfo(iconCode);
    document.getElementById('weather-temp').innerHTML =
      `Temperature: ${Math.round(currentData.main.temp)}°C`;
    document.getElementById('weather-desc').innerHTML =
      `Condition: ${currentData.weather[0].description} <span style="font-size:2.1em;vertical-align:middle;">${weatherInfo.icon}</span>`;
  }

  // 3-Day Forecast
  if (forecastData && forecastData.list) {
    let forecastDays = [];
    const today = new Date().getDate();
    forecastData.list.forEach(item => {
      const date = new Date(item.dt_txt);
      if (date.getHours() === 12) {
        if (date.getDate() !== today && forecastDays.length < 3) {
          forecastDays.push(item);
        }
      }
    });
    forecastDays.forEach((item, idx) => {
      const iconCode = item.weather[0].icon;
      const weatherInfo = getWeatherInfo(iconCode);
      const forecastDiv = document.getElementById(`forecast-day${idx + 1}`);
      if (forecastDiv) {
        forecastDiv.innerHTML = `
          <div style="text-align:center;">
            <strong style="color:#b00028;">${dateLabel(item.dt_txt)}</strong>: ${Math.round(item.main.temp)}°C
            <div style="margin:12px auto 10px;font-size:2.5em">${weatherInfo.icon}</div>
            <div style="font-size:1.07em;font-weight:400;">${item.weather[0].description}</div>
          </div>
        `;
      }
    });
  }
}

// Main orchestrator
async function showWeather() {
  const current = await fetchCurrentWeather();
  const forecast = await fetchForecast();
  displayWeather(current, forecast);
}

document.addEventListener("DOMContentLoaded", showWeather);
