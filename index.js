// Set up the header
const header = document.getElementById("navbar");
header.innerHTML = "WEATHER.NOW";
header.style.color = "white";
header.style.fontSize = "1.8rem";
header.style.backgroundColor = "aqua";
header.style.textAlign = "center";
header.style.boxShadow = "2px 2px 5px black";
header.style.textShadow = "2px 2px 5px black";
header.style.fontFamily = "verdana";

function changeText(id) {
  id.innerHTML =
    " WEATHER.NOW provides accurate and up-to-date weather information for cities around the globe.";
  header.style.color = "gray";
  header.style.fontSize = "1.1rem";
  header.style.textShadow = "none";
  header.style.fontFamily = "'Montserrat', sans-serif";
}

// My WeatherStack API
const apiKey = "374dd1d3bac9bf73075bc172265d3294";
const baseUrl = "http://api.weatherstack.com/current";

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

  const tempElement = document.getElementById("temperature");
  const locationElement = document.getElementById("location");
  const weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  const cloudinessElement = document.getElementById("cloudiness");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("wind-speed");
  const rainChanceElement = document.getElementById("rain-chance");
  const dateTimeElement = document.getElementById("date-time");

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
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    getWeather(city);
  }
});

// Initial weather data for London
getWeather("London");

// Function to get the current date in a specific format
function getCurrentDate() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hour}:${minutes} - ${day}, ${date} ${month} '${year
    .toString()
    .slice(-2)}`;
}

// Autocomplete Function
function autocomplete(input, locations) {
  let currentFocus;

  input.addEventListener("input", function () {
    let val = this.value;
    closeAllLists();
    if (!val) return false;
    currentFocus = -1;

    const listDiv = document.createElement("div");
    listDiv.setAttribute("id", this.id + "autocomplete-list");
    listDiv.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(listDiv);

    locations.forEach((location) => {
      if (location.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML =
          "<strong>" + location.substr(0, val.length) + "</strong>";
        itemDiv.innerHTML += location.substr(val.length);
        itemDiv.innerHTML += "<input type='hidden' value='" + location + "'>";
        itemDiv.addEventListener("click", function () {
          input.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        listDiv.appendChild(itemDiv);
      }
    });
  });

  input.addEventListener("keydown", function (e) {
    let list = document.getElementById(this.id + "autocomplete-list");
    if (list) list = list.getElementsByTagName("div");
    if (e.keyCode == 40) {
      // Down arrow
      currentFocus++;
      addActive(list);
    } else if (e.keyCode == 38) {
      // Up arrow
      currentFocus--;
      addActive(list);
    } else if (e.keyCode == 13) {
      // Enter key
      e.preventDefault();
      if (currentFocus > -1 && list) {
        list[currentFocus].click();
      }
    }
  });

  function addActive(list) {
    if (!list) return false;
    removeActive(list);
    if (currentFocus >= list.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = list.length - 1;
    list[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(list) {
    for (let i = 0; i < list.length; i++) {
      list[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    const items = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < items.length; i++) {
      if (elmnt !== items[i] && elmnt !== input) {
        items[i].parentNode.removeChild(items[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

// List of major countries and cities including Africa
const locations = [
  "United States",
  "New York",
  "Los Angeles",
  "Chicago",
  "Canada",
  "Toronto",
  "Vancouver",
  "Montreal",
  "United Kingdom",
  "London",
  "Manchester",
  "Birmingham",
  "Australia",
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Germany",
  "Berlin",
  "Munich",
  "Frankfurt",
  "France",
  "Paris",
  "Marseille",
  "Lyon",
  "India",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "China",
  "Beijing",
  "Shanghai",
  "Hong Kong",
  "Japan",
  "Tokyo",
  "Osaka",
  "Kyoto",
  "Brazil",
  "São Paulo",
  "Rio de Janeiro",
  "Brasília",
  "South Africa",
  "Johannesburg",
  "Cape Town",
  "Durban",
  "Nigeria",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kenya",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Egypt",
  "Cairo",
  "Alexandria",
  "Giza",
  "Ethiopia",
  "Addis Ababa",
  "Gondar",
  "Mekelle",
  "Ghana",
  "Accra",
  "Kumasi",
  "Tamale",
  "Tanzania",
  "Dodoma",
  "Dar es Salaam",
  "Arusha",
  "Uganda",
  "Kampala",
  "Entebbe",
  "Jinja",
  "Algeria",
  "Algiers",
  "Oran",
  "Constantine",
  "Morocco",
  "Casablanca",
  "Rabat",
  "Marrakesh",
];

// Apply autocomplete to the search input
autocomplete(document.getElementById("city-input"), locations);
