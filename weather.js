        const apiKey = '6d19fa8f5361a77abc758c2e776dbbdb'; // Replace with your OpenWeatherMap API key
const city = 'Wolverhampton'; // You can change this to any city

const fetchWeatherData = async () => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=52.5893&lon=-2.1311&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    // Process the weather data
    const temperature = data.list[0].main.temp;
      const temperatureFL = data.list[0].main.feels_like;
      console.log(temperature);
    const description = data.list[0].weather[0].description;
    const humidity = data.list[0].main.humidity;
//const description = "Wet"
      //const humidity = 40
    // Display data in the HTML
    document.getElementById('weather-data').innerHTML = `
      <p>City: ${city}</p>
      <p>Temperature: ${temperature}°C (Feels like ${temperatureFL}°C)</p>
      <p>Description: ${description}</p>
      <p>Humidity: ${humidity}%</p>
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);
updateTime();

// Call the function to fetch and display weather
fetchWeatherData();
