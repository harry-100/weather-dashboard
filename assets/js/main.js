var cityName = 'Toronto,Canada';
var lat;
var lon;
var apiKey='1b0f67ad6e991cee1547bb977f88f694'
var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
var openWeatherOneUrl = 'https://api.openweathermap.org/data/2.5/onecall'


//  Geocoding - getting latitude and longitude, given city name
fetch(openWeatherUrl + "?q=" + cityName + "&appid=" + apiKey)
.then(function(response){
    return response.json();
})
.then(function(data){

     lon = data.coord.lon;
     lat = data.coord.lat;
     console.log("longitude=", lon);
     console.log("latitude=", lat);
})

console.log("out-longitude=", lon);
console.log("out-latitude=", lat);
// fetch(openWeatherOneUrl + "?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,&appid=" + apiKey + "&units=metric")
// .then(function(response){
//     return response.json();
// })
// .then(function(weatherData){
//     console.log("weatherData= ", weatherData);
// })
