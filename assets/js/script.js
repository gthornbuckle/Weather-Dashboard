$("#search-button").on("click", function() {

     $("#forecast").empty(); //Clears any existing forecast HTML.

    var userSearchInput = $("#search-input").val(); //Takes user input

    if (userSearchInput.length === 0){ //Validates if user entered an input
        return;
    }
    else{
        var histoyBtn = $("<button>").text(userSearchInput); //Creates a button with the user input
        histoyBtn.addClass("btn");
        histoyBtn.attr("id", "btnHistory");
        $("#history").prepend(histoyBtn);
    }

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+userSearchInput+ "&appid=5d69237f779c6ad1becd9e8ed5e67f08";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){

        console.log(response);

        // var weatherInfo = [];
        var dailyWeather = {}; //Creates temp object to store weather data

        dailyWeather["cityname"] = response.city.name; //Takes relevant data from API response and appends to object
        dailyWeather["currentDate"] = moment.unix(response.list[0].dt).format("MM/DD/YYYY");
        dailyWeather["iconID"] = response.list[0].weather[0].icon;
        dailyWeather["temperature"] = response.list[0].main.temp;
        dailyWeather["humidity"] = response.list[0].main.humidity;
        dailyWeather["windspeed"] = response.list[0].wind.speed;

        console.log(dailyWeather);
        
      })

    var dailyForecast = $("<div>"); //Creates current day forecast HTML
    var heading = $("<h3>").text(weatherInfo[0].city+ " ("+ moment.unix(weatherInfo[0].date).format("MM/DD/YYYY")+ ")"+ weatherInfo[0].icon); //Timestamp converted into date format
    var temperature = $("<p>").text("Temperature: " + weatherInfo[0].temperature);
    var humidity = $("<p>").text("Humidity: " + weatherInfo[0].humidity);
    var windspeed = $("<p>").text("Wind Speed: " + weatherInfo[0].windspeed);

    dailyForecast.append(heading);
    dailyForecast.append(temperature);
    dailyForecast.append(humidity);
    dailyForecast.append(windspeed);

    $("#today").prepend(dailyForecast);

    for (var i = 1; i < weatherInfo.length; i++){ //Creates 5 day forecast HTML

        var dailyForecast = $("<div>");
        var heading = $("<h3>").text(weatherInfo[i].city+ " ("+ moment.unix(weatherInfo[0].date).format("MM/DD/YYYY")+ ")"+ weatherInfo[i].icon);
        var temperature = $("<p>").text("Temperature: " + weatherInfo[i].temperature);
        var humidity = $("<p>").text("Humidity: " + weatherInfo[i].humidity);
        var windspeed = $("<p>").text("Wind Speed: " + weatherInfo[i].windspeed);
        
        dailyForecast.append(heading);
        dailyForecast.append(temperature);
        dailyForecast.append(humidity);
        dailyForecast.append(windspeed);

        $("#forecast").prepend(dailyForecast);

    }
});