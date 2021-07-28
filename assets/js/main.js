var cityName;
var currentDate = moment().format("MM/DD/YYYY");
var lat;
var lon;
var apiKey='1b0f67ad6e991cee1547bb977f88f694'
var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
var openWeatherOneUrl = 'https://api.openweathermap.org/data/2.5/onecall'
var submitEl = $("#button");
// var inputEl = $("#cityName");

function geoLocation(cityName) {
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
     getWeather(lat, lon);
})
}
function getWeather(lat, lon){

console.log("out-longitude=", lon);
console.log("out-latitude=", lat);
fetch(openWeatherOneUrl + "?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,&appid=" + apiKey + "&units=metric")
.then(function(response){
    return response.json();
})
.then(function(weatherData){
    displayWeather(weatherData);
})
}

function displayWeather(weatherData){
    var currentTemp =  weatherData.current.temp;
    var uvIndex =  weatherData.current.uvi;
    var humidity =  weatherData.current.humidity;
    var windSpeed = weatherData.current.wind_speed;

    var currentInfoColEl = $("#currentInfo");
    var currentInfoEl = $("<div>");
    var cityNameEl = $("<div>");
    var currentTempEl = $("<div>");
        
    var uvIndexTextEl = $("<div>");
    var uvIndexEl = $("<span>");

    var windSpeedEl = $("<div>");
    var humidityEl = $("<div>");
    
    currentTemp = currentTemp.toFixed(0);
    console.log("City name before printing=", cityName);
    cityNameEl.text(cityName + "(" + currentDate + ")");
    cityNameEl.addClass("m-2 display-6")
    currentTempEl.text("Temp: " + currentTemp + "°C");
    currentTempEl.addClass("m-3")
    uvIndexTextEl.text("UV Index: ");
    uvIndexTextEl.addClass("m-3");
    uvIndexEl.text(uvIndex);
    // console.log("uvIndex=", parseInt(uvIndex));
    // logic for UV index category
    if (uvIndex < 3) {
        uvIndexEl.addClass("green");
    }
    else if (uvIndex > 3 && uvIndex < 8) {
        uvIndexEl.addClass("yellow");
    }
    else if (uvIndex >= 8){
        uvIndexEl.addClass("red");
    }
    windSpeed = (windSpeed*3.6).toFixed(1);
    windSpeedEl.text("Wind Speed: " + windSpeed + " km/hr");
    humidityEl.text("Humidity: "+ humidity + "%");
    windSpeedEl.addClass("m-3");
    humidityEl.addClass("m-3");
    currentInfoEl.addClass("card-body currentDay");
    currentInfoColEl.append(currentInfoEl);
    currentInfoEl.append(cityNameEl);
    currentInfoEl.append(currentTempEl);
    uvIndexTextEl.append(uvIndexEl);
    currentInfoEl.append(uvIndexTextEl);
    currentInfoEl.append(windSpeedEl);
    currentInfoEl.append(humidityEl);

    // 5-Day Forecast

    for (var i=1; i < 6; i++){
        showDate = moment().add(i,'days').format("MM/DD/YYYY");
        console.log("Next date=", showDate);
        showTemp = weatherData.daily[i].temp.day;
        showWindSpeed = weatherData.daily[i].wind_speed;
        showWindSpeed = (showWindSpeed*3.6).toFixed(1);
        showHumidity = weatherData.daily[i].humidity;
        showIcon = weatherData.daily[i].weather[0].icon;
        console.log("showIcon=", showIcon);

    // Create Elements
        var rowEl = $("#row");
        var colEl = $("<div>");
        var cardEl = $("<div>");
        var cardBodyEl = $("<div>");
        var showDateEl = $("<div>");
        var showTempEl = $("<div>");
        var showWindSpeedEl = $("<div>");
        var showHumidityEl = $("<div>");
        showDateEl.text(showDate);
        showTempEl.text("Temp: " + showTemp + "°C");
        showWindSpeedEl.text("Wind: " + showWindSpeed + " km/hr");
        showHumidityEl.text("Humidity: " + showHumidity + " %");
        colEl.addClass("col col-md-2 days");
        cardEl.addClass("card days");
        cardBodyEl.attr("id", i);
        cardBodyEl.addClass("card-body")
        

        rowEl.append(colEl);
        colEl.append(cardEl);
        cardEl.append(cardBodyEl);
        cardBodyEl.append(showDateEl);
        cardBodyEl.append(showTempEl);
        cardBodyEl.append(showWindSpeedEl);
        cardBodyEl.append(showHumidityEl);

    }


}
submitEl.click(function(){
    // var inputEl = $("#cityName");
    // currentInfoEl.remove();
    var cities = [];
    var inputEl = document.getElementById("cityName");
    cityName = inputEl.value;
    var previousSearchesEl = $("#previousSearches");
    var previousCitiesEl = $("<button>");
    previousCitiesEl.addClass("cities btn btn-warning m-2");
    previousCitiesEl.text(cityName);
    cities.push(cityName);
    
    previousSearchesEl.append(previousCitiesEl);
    // cityName = "Toronto";
    console.log("city-name entered=", cityName);
    geoLocation(cityName);
    
})

