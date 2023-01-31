var prevSearches = JSON.parse(localStorage.getItem("prevSearches")) || [];

$("#search-button").on("click", function() {

    $("#today").empty(); //Clears any existing forecast HTML.
     $("#forecast").empty();

    var userSearchInput = $("#search-input").val(); //Takes user input

    if (userSearchInput.length === 0){ //Validates if user entered an input
        return;
    }
    else{
        var histoyBtn = $("<button>").text(userSearchInput); //Creates a button with the user input
        histoyBtn.addClass("btn");
        histoyBtn.attr("id", "btnHistory");
        $("#history").prepend(histoyBtn);
        
        prevSearches = JSON.parse(localStorage.getItem('prevSearches')) || []; //Saves user search to local storage
        prevSearches.push(userSearchInput);
        localStorage.setItem("prevSearches", JSON.stringify(prevSearches));
    }

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+userSearchInput+ "&cnt=41&appid=5d69237f779c6ad1becd9e8ed5e67f08";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){

        console.log(response);

        var tempWeatherInfo = []; //Creates temp array to store all weather data
        var dailyWeather = {}; //Creates temp object to store weather data by day

        dailyWeather["cityname"] = response.city.name; //Takes relevant data from API response and appends to object
        dailyWeather["currentDate"] = response.list[0].dt;
        dailyWeather["iconID"] = response.list[0].weather[0].icon;
        dailyWeather["temperature"] = response.list[0].main.temp;
        dailyWeather["humidity"] = response.list[0].main.humidity;
        dailyWeather["windspeed"] = response.list[0].wind.speed;

        tempWeatherInfo.push(dailyWeather); //Adds weather data to temp array

        var forecastCount = 7;

        while (forecastCount < 40){ //Takes data every 24 hours
            var forecastedWeather = {};

            forecastedWeather["cityname"] = response.city.name; //Takes relevant data from API response and appends to object
            forecastedWeather["currentDate"] = response.list[forecastCount].dt;
            forecastedWeather["iconID"] = response.list[forecastCount].weather[0].icon;
            forecastedWeather["temperature"] = response.list[forecastCount].main.temp;
            forecastedWeather["humidity"] = response.list[forecastCount].main.humidity;
            forecastedWeather["windspeed"] = response.list[forecastCount].wind.speed;

            forecastCount += 7;

            tempWeatherInfo.push(forecastedWeather);
        }
        console.log(tempWeatherInfo);

        convertTemp = function(tempK){ //Converts temperature from Kelvin to Celcius
            var tempC = tempK - 273.15;
            return tempC.toFixed(1);
        }

        var dailyForecast = $("<div>").attr("class", "forecastCard"); //Creates current day forecast HTML
        var heading = $("<h3>").text(tempWeatherInfo[0].cityname+ " ("+ moment.unix(tempWeatherInfo[0].currentDate).format("DD/MM/YYYY")+ ")"); //Timestamp converted into date format
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ tempWeatherInfo[0].iconID+ "@2x.png")
        var temperature = $("<p>").text("Temperature: " + convertTemp(tempWeatherInfo[0].temperature)+ "℃");
        var humidity = $("<p>").text("Humidity: " + tempWeatherInfo[0].humidity+ "%");
        var windspeed = $("<p>").text("Wind Speed: " + tempWeatherInfo[0].windspeed+ "ms");

        dailyForecast.append(heading);
        dailyForecast.append(icon);
        dailyForecast.append(temperature);
        dailyForecast.append(humidity);
        dailyForecast.append(windspeed);

        $("#today").prepend(dailyForecast);

        for (var i = 1; i < tempWeatherInfo.length; i++){ //Creates 5 day forecast HTML

            var dailyForecast = $("<div>").attr("class", "forecastCard");
            var heading = $("<h3>").text(moment.unix(tempWeatherInfo[i].currentDate).format("DD/MM/YYYY"));
            var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ tempWeatherInfo[i].iconID+ "@2x.png")
            var temperature = $("<p>").text("Temperature: " + convertTemp(tempWeatherInfo[i].temperature)+ "℃");
            var humidity = $("<p>").text("Humidity: " + tempWeatherInfo[i].humidity+ "%");
            var windspeed = $("<p>").text("Wind Speed: " + tempWeatherInfo[i].windspeed+ "ms");
            
            dailyForecast.append(heading);
            dailyForecast.append(icon);
            dailyForecast.append(temperature);
            dailyForecast.append(humidity);
            dailyForecast.append(windspeed);

            $("#forecast").prepend(dailyForecast);

        }
    })
});

displayPreviousSearches = function(){
    for (var i = 0; i < prevSearches.length; i++){ //Checks local storage for saved search history
        
        var histoyBtn = $("<button>").text(prevSearches[i]);
        histoyBtn.addClass("btn");
        histoyBtn.attr("id", "btnHistory");
        $("#history").prepend(histoyBtn);
    }
}

if (prevSearches === undefined || prevSearches.length == 0){ //Checks if any previous search data exists in local storage
    console.log("No previous searches found.");
}
else{
    displayPreviousSearches();
}
