var cityName;
var currentDate = moment().format("MM/DD/YYYY");
var lat;
var lon;
var apiKey='1b0f67ad6e991cee1547bb977f88f694'
var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
var openWeatherOneUrl = 'https://api.openweathermap.org/data/2.5/onecall'
var submitEl = $("#button");
var cities = JSON.parse(localStorage.getItem("previousCities")) || [];

// create buttons for previous searches
var previousSearchesEl = $("#previousSearches");
previousSearchesEl.addClass("d-flex justify-content-center");
for (let i = 0; i < cities.length; i++){
    
    var previousCitiesEl = $("<button>");
    previousCitiesEl.addClass("searchCity cities btn btn-warning mt-3");
    previousCitiesEl.text(cities[i]);
    previousSearchesEl.append(previousCitiesEl);
}

//  this function gets the weather information for the city searched
function getWeather(lat, lon){

fetch(openWeatherOneUrl + "?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,&appid=" + apiKey + "&units=metric")
.then(function(response){
    return response.json();
})
.then(function(weatherData){
    displayWeather(weatherData);
})
}

function displayWeather(weatherData){

    //  clear out previous data
    $("#currentInfo").empty();
    $("#row").empty();

    var currentTemp =  weatherData.current.temp;
    var uvIndex =  weatherData.current.uvi;
    var humidity =  weatherData.current.humidity;
    var windSpeed = weatherData.current.wind_speed;
    var getIcon = weatherData.current.weather[0].icon;

    // create elements for displaying current data
    var currentInfoColEl = $("#currentInfo");
    var currentInfoEl = $("<div>");
    var cityNameEl = $("<div>");
    var currentIconDivEl = $("<div>");
    var currentIconEl = $("<img>");
    currentIconEl.attr("src", "http://openweathermap.org/img/w/" + getIcon + ".png")
    var currentTempEl = $("<div>");
    var uvIndexTextEl = $("<div>");
    var uvIndexEl = $("<span>");
    var windSpeedEl = $("<div>");
    var humidityEl = $("<div>");
    cityName = cityName.toUpperCase();
    currentTemp = currentTemp.toFixed(0);
    cityNameEl.text(cityName + " (" + currentDate + ")");
    cityNameEl.addClass("m-2 cityName")
    currentTempEl.text("Temp: " + currentTemp + "°C");
    currentTempEl.addClass("m-3")
    uvIndexTextEl.text("UV Index: ");
    uvIndexTextEl.addClass("m-3");
    uvIndexEl.text(uvIndex);
   
    // logic for UV index category
    if (uvIndex < 3) {
        uvIndexEl.addClass("green font-white");
    }
    else if (uvIndex > 3 && uvIndex < 8) {
        uvIndexEl.addClass("yellow font-white");
    }
    else if (uvIndex >= 8){
        uvIndexEl.addClass("red font-white");
    }
    windSpeed = (windSpeed*3.6).toFixed(1);
    windSpeedEl.text("Wind Speed: " + windSpeed + " km/hr");
    humidityEl.text("Humidity: "+ humidity + "%");
    windSpeedEl.addClass("m-3");
    humidityEl.addClass("m-3");
    currentInfoEl.addClass("card-body currentDay");
    currentInfoColEl.append(currentInfoEl);
    currentInfoEl.append(cityNameEl);
    currentIconDivEl.append(currentIconEl);
    cityNameEl.append(currentIconDivEl);
    currentInfoEl.append(currentTempEl);
    uvIndexTextEl.append(uvIndexEl);
    currentInfoEl.append(uvIndexTextEl);
    currentInfoEl.append(windSpeedEl);
    currentInfoEl.append(humidityEl);

    // 5-Day Forecast

    for (var i=1; i < 6; i++){
        showDate = moment().add(i,'days').format("MM/DD/YYYY");
        showTemp = weatherData.daily[i].temp.day;
        showTemp = showTemp.toFixed(0);
        showWindSpeed = weatherData.daily[i].wind_speed;
        showWindSpeed = (showWindSpeed*3.6).toFixed(1);
        showHumidity = weatherData.daily[i].humidity;
        var showIcon = weatherData.daily[i].weather[0].icon;

    // Create Elements
        var rowEl = $("#row");
        var colEl = $("<div>");
        var cardEl = $("<div>");
        var cardBodyEl = $("<div>");
        var showDateEl = $("<div>");
        var iconDivEl = $("<div>");
        var iconEl = $("<img>");
        var showTempEl = $("<div>");
        var showWindSpeedEl = $("<div>");
        var showHumidityEl = $("<div>");
        
        showDateEl.text(showDate);
        showDateEl.addClass("m-2");
        iconDivEl.attr("id", "icon");
        iconEl.attr("id", "wicon");
        iconEl.attr("src", "http://openweathermap.org/img/w/" + showIcon + ".png");

        showTempEl.addClass("m-2");
        showHumidityEl.addClass("m-2");
        showWindSpeedEl.addClass("m-2");
        showTempEl.text("Temp: " + showTemp + "°C");
        showWindSpeedEl.text("Wind: " + showWindSpeed + " km/hr");
        showHumidityEl.text("Humidity: " + showHumidity + " %");
        colEl.addClass("col col-md-2 days");
        cardEl.addClass("card days");
        cardBodyEl.attr("id", i);
        cardBodyEl.addClass("card-body")
        
        // append elements for display
        rowEl.append(colEl);
        colEl.append(cardEl);
        cardEl.append(cardBodyEl);
        cardBodyEl.append(showDateEl);
        iconDivEl.append(iconEl);
        cardBodyEl.append(iconDivEl);
        cardBodyEl.append(showTempEl);
        cardBodyEl.append(showWindSpeedEl);
        cardBodyEl.append(showHumidityEl);
    }
}

// this function gets the latitude and longitude of a city that are needed to get the weather 
function geoLocation(cityName) {
    
    fetch(openWeatherUrl + "?q=" + cityName + "&appid=" + apiKey)
    .then(function(response){
        if (response.ok){
        response.json()
    
    .then(function(data){  
            lon = data.coord.lon;
            lat = data.coord.lat;
            getWeather(lat, lon);
            var previousSearchesEl = $("#previousSearches");
            var previousCitiesEl = $("<button>");
            previousCitiesEl.addClass("searchCity cities btn btn-warning mt-3");
            cityName = cityName.toUpperCase();
            previousCitiesEl.text(cityName);
            const isInArray = cities.includes(cityName);

            // this checks if the city is already in previously searched list
            if (isInArray !== true) {
                cities.unshift(cityName);
                localStorage.setItem("previousCities",JSON.stringify(cities));
                previousSearchesEl.prepend(previousCitiesEl);
            }
            // this limits the number of cities to be displayed to 8
            if (cities.length > 8){
                cities.pop();
                previousSearchesEl.children().last().remove();
            }
        });
    }
        else {    
          var alertEl = $("<div>");
          alertEl.addClass("alert alert-danger w-75");
          alertEl.text("Please check the city name and try again");
          submitEl.after(alertEl);
          setTimeout(function(){
              alertEl.remove();}, 2000)
          }
        });           
};
    //  Event Listener - Coding for searching a city for weather
    $(document).on("click", ".searchCity", function(){
        if ($(this).parent().attr("id") === "previousSearches") {
            cityName = $(this).text();
        } else {
            var inputEl = $("#cityName");
            cityName = inputEl.val();
        }   
    geoLocation(cityName);
})

