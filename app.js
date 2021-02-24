// Set appId
const appID='d7ccd62b17514d9b03b57d5eec0c695b';

//fetch weather info from openweathermap api
// const getWeatherForCity=city=>
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${appID}&units=metric`)
//     .then((response)=>response.json());

//createCardHtml function to render the weather info
const createCardHtml=(name, emoji, temp, description)=>`
<div class="card">
<div class="row no-gutters align-items-center">    
  <div class="col-2 h2 pl-1 pt-1 text-center">                
    ${emoji}
  </div>
  <div class="col-10">
    <div class="card-body">
      <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
        <h4>${name}</h4>
        <h6>${temp}c</h6>
      </div>
      <div class="row">
        <h5 class="card-subtitle text-muted">${description}</h5>
      </div>
    </div>
  </div>
</div>
</div>
`;

// create emojis object to find the right emoji from the icon code in API
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
const cityInput=document.querySelector('#city-input');
const goButton=document.querySelector('#go-button');
const weatherContainer=document.querySelector('#weather-container');

// add event listener on the go button
goButton.addEventListener('click', async()=>{
    //get the city from the input field
    //const city=cityInput.value;
    const inputValue=cityInput.value;

    //get the weather data for the city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${appID}&units=metric`);
    const data = await response.json();
    const name=data.name;
    const emoji = emojis[data.weather[0].icon];
    const temp=data.main.temp;
    const description=data.weather[0].description;

    //create card HTML
    const htmlCard=createCardHtml(name, emoji, temp, description);

    //render
    weatherContainer.innerHTML=htmlCard;
 
    // //get the weather data for the city
    // getWeatherForCity(city)
    //     .then(data=>{
    //         const name=data.name;
    //         const emoji = emojis[data.weather[0].icon];
    //         const temp = data.main.temp;
    //         const description = data.weather[0].description;

    //     //create card HTML
    //     const cardHtml = createCardHtml(name, emoji, temp, description);

    //     //render
    //     weatherContainer.innerHTML = cardHtml;
    //     });
})


