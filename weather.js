
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
    const weatherIcon = data.list[0].weather[0].icon
    const humidity = data.list[0].main.humidity;
    const iconLink = "https://openweathermap.org/img/wn/"+weatherIcon+"@4x.png"
//const description = "Wet"
      //const humidity = 40
    // Display data in the HTML
    document.getElementById('weather-data').innerHTML = `
    <table class="dataTable">
      <tr>
        <td class="tableHeader">Temperature</td>
        <td class="tableInfo">${temperature}°C</td> 
      </tr>
      <tr>
        <td class="tableHeader">
          Feels Like
        </td>
        <td class="tableInfo">
          ${temperatureFL}°C
        </td>
      </tr>
      <tr>
        <td class="tableHeader">
          Humidity
        </td>
        <td class="tableInfo">
          ${humidity}%
        </td>
      </tr>
      <tr>
        <td>  </td>
      </tr>
    </table>
    <p></p>
    <table>
      <tr>
        <td class="description" colspan = 2><b>${description}</b>
        </td>
      </tr>
      <tr>
        <td class="descriptionIconBox" colspan = 2><img class="descriptionIcon" src=${iconLink} width=300px></p>
        </td>
      </tr>
    </table>
      
      
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

function updateTime() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('time').innerHTML = `<table><tr><td class="clock">${hours}:${minutes}:${seconds}</td></tr></table>`;
}



        const fetchBusTimesSB = async () => {
          const busAppId = '878ee5d9'; // Replace with your TransportAPI App ID
          const busAppKey = 'b6a36e6064bbed825ca723f0b0da8ced'; // Replace with your TransportAPI App Key
          const atcoCode = '43000730402'; // ATCO code for the bus stop (example)
            const busApiUrl = `https://transportapi.com/v3/uk/bus/stop/${atcoCode}/live.json?app_id=${busAppId}&app_key=${busAppKey}&group=route&limit=5`;

            try {
                const response = await fetch(busApiUrl);
                const busData = await response.json();
                
                // Check if arrivals data exists
                if (busData.departures) {
                    const departures = Object.values(busData.departures).flat();
                    console.log(departures);
                    let output = '<table class=busses><tr><td class = "busRoute" colspan = 3>Southbound</td></tr>';
                    var lastBusLine = "000"
                    departures.forEach(bus => {
                        const busLine = bus.line_name;
                        console.log(busLine);
                        if (busLine !== lastBusLine)
                          {
                        output += ` 
                          <tr>
                            <td class="busRoute">
                              ${bus.line_name}
                            </td>
                            <td class="busDestination">
                              <marquee>${bus.direction}</marquee>
                            </td>

                            <td class="busTime">
                              ${bus.best_departure_estimate}
                            </td>
                          </tr>`;
                          }
                      lastBusLine = busLine;
                    });
                    
                    output += '</table>';
                    
                    document.getElementById('bus-timesSB').innerHTML = output;
                } else {
                    document.getElementById('bus-timesSB').innerHTML = '<p>No live bus times available.</p>';
                }
            } catch (error) {
                console.error('Error fetching bus times:', error);
                document.getElementById('bus-timesSB').innerHTML = '<p>Could not fetch bus times. Please try again later.</p>';
            }
        };
        const fetchBusTimesNB = async () => {
          const busAppId = '878ee5d9'; // Replace with your TransportAPI App ID
          const busAppKey = 'b6a36e6064bbed825ca723f0b0da8ced'; // Replace with your TransportAPI App Key
          const atcoCode = '43000730401'; // ATCO code for the bus stop (example)
            const busApiUrl = `https://transportapi.com/v3/uk/bus/stop/${atcoCode}/live.json?app_id=${busAppId}&app_key=${busAppKey}&group=route&limit=5`;

            try {
                const response = await fetch(busApiUrl);
                const busData = await response.json();
                
                // Check if arrivals data exists
                if (busData.departures) {
                    const departures = Object.values(busData.departures).flat();
                    console.log(departures);
                    let output = '<table class=busses><tr><td class = "busRoute" colspan = 3>Northbound</td></tr>';
                    var lastBusLine = "000"
                    departures.forEach(bus => {
                        const busLine = bus.line_name;
                        console.log(busLine);
                        if (busLine !== lastBusLine)
                          {
                        output += ` 
                          <tr>
                            <td class="busRoute">
                              ${bus.line_name}
                            </td>
                            <td class="busDestination">
                              <marquee>${bus.direction}</marquee>
                            </td>

                            <td class="busTime">
                              ${bus.best_departure_estimate}
                            </td>
                          </tr>`;
                          }
                      lastBusLine = busLine;
                    });
                    
                    output += '</table>';
                    
                    document.getElementById('bus-timesNB').innerHTML = output;
                } else {
                    document.getElementById('bus-timesNB').innerHTML = '<p>No live bus times available.</p>';
                }
            } catch (error) {
                console.error('Error fetching bus times:', error);
                document.getElementById('bus-timesNB').innerHTML = '<p>Could not fetch bus times. Please try again later.</p>';
            }
        };
        // Fetch bus times on page load, then refresh every 30 seconds
        fetchBusTimesSB();
        fetchBusTimesNB();
        //setInterval(fetchBusTimes, 500000);



setInterval(updateTime, 1000);
updateTime();

// Call the function to fetch and display weather
fetchWeatherData();
