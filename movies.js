
// WeatherStack API details
const apiKey = "374dd1d3bac9bf73075bc172265d3294";
const baseUrl = 'http://api.weatherstack.com/current';

// Fetch weather data based on the city
async function getWeather(city) {
    const response = await fetch(`${baseUrl}?access_key=${apiKey}&query=${city}`);
    const data = await response.json();
    
    // Update the weather information in the UI
    updateUI(data);
}

// Update the UI with the fetched data
function updateUI(data) {
    if (!data || !data.current) {
        alert("Weather data not found for the specified location.");
        return;
    }

    const tempElement = document.getElementById('temperature');
    const locationElement = document.getElementById('location');
    const weatherDescriptionElement = document.getElementById('weather-description');
    const cloudinessElement = document.getElementById('cloudiness');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const rainChanceElement = document.getElementById('rain-chance');
    const dateTimeElement = document.getElementById('date-time');
    
    tempElement.textContent = `${Math.round(data.current.temperature)}°`;
    locationElement.textContent = data.location.name;
    weatherDescriptionElement.textContent = data.current.weather_descriptions[0];
    cloudinessElement.textContent = `${data.current.cloudcover}%`;
    humidityElement.textContent = `${data.current.humidity}%`;
    windSpeedElement.textContent = `${data.current.wind_speed} km/h`;
    rainChanceElement.textContent = `${data.current.precip} mm`;

    // Set the current date and time
    dateTimeElement.textContent = getCurrentDate();
}

// Handle search button click
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    }
});

// Initial weather data for London
getWeather('London');

// Function to get the current date in a specific format
function getCurrentDate() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${hour}:${minutes} - ${day}, ${date} ${month} '${year.toString().slice(-2)}`;
}
