// Select HTML elements
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

// Bogotá coordinates
const myKey = "621c016dfe1fc3e8b99189fd8957d5cb";
const myLat = "4.61";
const myLong = "-74.08";

// Build the API URL
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric&lang=es`;

// Get weather data
async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        myTown.textContent = "No se pudo obtener el clima";
    }
}

// Display JSON data on page
function displayResults(data) {
    myTown.textContent = data.name;
    myDescription.textContent = data.weather[0].description;
    myTemperature.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    myGraphic.setAttribute('src', iconsrc);
    myGraphic.setAttribute('alt', data.weather[0].description);
}

// Init call
apiFetch();