// Fetch weather data using OpenWeatherMap API
const apiKey = "enter-your-api-key"; // The API key received from OpenWeatherMap
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const errorMessage = document.getElementById("error-message");
const loadingMessage = document.getElementById("loading-message");
const temperatureElement = document.getElementById("temperature");
const conditionElement = document.getElementById("condition");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");

// Add event listener for search button click
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim(); // Get the user input and trim whitespace
    if (city) {
        fetchWeather(city).catch(error => console.error("Unexpected error:", error)); // Fetch weather and handle errors
        cityInput.value = ""; // Clear input field after search
        hideError(); // Hide error message when the user starts a new search
        showLoading(); // Show loading message while fetching data
    } else {
        showError("Please enter a city name!"); // Show alert if input is empty
    }
});

// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeather(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // Construct API URL
    try {
        // Make the API request
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) throw new Error("City not found!"); // Handle invalid response

        const data = await response.json(); // Parse the response JSON
        displayCurrentWeather(data); // Update UI with fetched data
    } catch (error) {
        showError(error.message); // Show error message to user
        console.error("Error fetching weather data:", error); // Log error for debugging
    } finally {
        hideLoading(); // Hide loading message once the data is fetched or an error occurs
    }
}

// Function to display the fetched weather data on the page
function displayCurrentWeather(data) {
    const { temp, humidity } = data.main; // Extract temperature and humidity
    const { description } = data.weather[0]; // Extract weather condition description
    const { speed } = data.wind; // Extract wind speed

    // Update DOM elements with the fetched weather details
    temperatureElement.textContent = `Temperature: ${temp}°C`;
    conditionElement.textContent = `Condition: ${description}`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${speed} km/h`;
}

// Error handling function to show error messages
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block"; // Show the error message
}

// Function to hide error messages
function hideError() {
    errorMessage.style.display = "none"; // Hide the error message
}

// Show the loading message
function showLoading() {
    loadingMessage.style.display = "block"; // Show the loading message
}

// Hide the loading message
function hideLoading() {
    loadingMessage.style.display = "none"; // Hide the loading message
}
