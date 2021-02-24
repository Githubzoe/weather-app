// Set appId
const appid='d7ccd62b17514d9b03b57d5eec0c695b';
function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    getWether(latitude,longitude);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

// createCardHtml function used to render the weather info 
const createCardHtml = (name, emoji, temp, feelsLike, description) => `
  <div class="card">
    <div class="row no-gutters align-items-center">    
      <div class="col-2 h2 pl-1 pt-1 text-center">                
        ${emoji}
      </div>
      <div class="col-10">
        <div class="card-body">
          <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
            <h4>${name}</h4>
            <h6>${temp}c, feels like ${feelsLike}c</h6>
          </div>
          <div class="row">
            <h5 class="card-subtitle text-muted">${description}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// emojis object used to find the right emoji from the icon code sent from the api
const emojis = {
  '01d': '☀️',
  '02d': '⛅️',
  '03d': '☁️',
  '04d': '☁️',
  '09d': '🌧',
  '10d': '🌦',
  '11d': '⛈',
  '13d': '❄️',
  '50d': '💨',
  '01n': '☀️',
  '02n': '⛅️',
  '03n': '☁️',
  '04n': '☁️',
  '09n': '🌧',
  '10n': '🌦',
  '11n': '⛈',
  '13n': '❄️',
  '50n': '💨',
};

// selecting elements
const goButton = document.querySelector('#go-button');
const cityInput = document.querySelector('#city-input');
const weatherContainer = document.querySelector('#weather-container');
const weatherContainer2 = document.querySelector('#weather-container2');

const errorContainer = document.querySelector('#error-message')

// add event listener on the go button
goButton.addEventListener('click',  async () => {
  // get the city from the input field
  const city = cityInput.value;
  try {
    const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`)
    const data = await response.json()

    const name = data.name;
    const emoji = emojis[data.weather[0].icon];
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const description = data.weather[0].description;
    
    //create card HTML
    const cardHtml = createCardHtml(name, emoji, temp, feelsLike, description);
    //hide error message
    weatherContainer.classList.remove('invisible');
    errorContainer.classList.add('invisible');
    //render
    weatherContainer.innerHTML=cardHtml;
  } catch (error) {
      //unhide error message
      errorContainer.classList.remove('invisible');
      weatherContainer.classList.add('invisible');
  }
});

function getWether(latitude, longitude){
  const api =   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}&units=metric`
  fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
          const name = data.name;
          const emoji = emojis[data.weather[0].icon];
          const temp = data.main.temp;
          const feelsLike = data.main.feels_like;
          const description = data.weather[0].description;

          const cardHtml = createCardHtml(name, emoji, temp, feelsLike, description);
          weatherContainer2.innerHTML = cardHtml;
        });
      
}
document.querySelector('#find-me').addEventListener('click', geoFindMe())

