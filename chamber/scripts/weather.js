// scripts/weather.js

// API key and Bogotá latitude/longitude
const apiKey = "621c016dfe1fc3e8b99189fd8957d5cb";
const lat = 4.7110;
const lon = -74.0721;

// Fetch current weather for Bogotá
async function fetchCurrentWeather() {
    // Build the URL for current weather
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching current weather:", error);
        return null;
    }
}

// Fetch 3-day forecast for Bogotá
async function fetchForecast() {
    // Build the URL for forecast data
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching forecast:", error);
        return null;
    }
}

// Helper function to format the date label
function dateLabel(dt_txt) {
    const date = new Date(dt_txt);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Render the weather data on the page
function displayWeather(currentData, forecastData) {
    // Display current temperature and description
    if (currentData) {
        document.getElementById('weather-temp').textContent =
            `Temperature: ${Math.round(currentData.main.temp)}°C`;
        document.getElementById('weather-desc').textContent =
            `Condition: ${currentData.weather[0].description}`;
    }

    // Process and display three-day forecast
    if (forecastData && forecastData.list) {
        let forecastDays = [];
        // The API returns data every 3 hours, pick one for each day (e.g., at 12:00)
        const today = new Date().getDate();
        forecastData.list.forEach(item => {
            const date = new Date(item.dt_txt);
            if (date.getHours() === 12) {
                if (date.getDate() !== today && forecastDays.length < 3) {
                    forecastDays.push(item);
                }
            }
        });
        // Render forecast cards
        forecastDays.forEach((item, idx) => {
            const dayDiv = document.getElementById(`forecast-day${idx + 1}`);
            if (dayDiv) {
                dayDiv.textContent = `${dateLabel(item.dt_txt)}: ${Math.round(item.main.temp)}°C, ${item.weather[0].description}`;
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

// Run on page load
document.addEventListener("DOMContentLoaded", showWeather);
