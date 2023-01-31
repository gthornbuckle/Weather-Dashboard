$("#search-button").on("click", function() {

     $("#forecast").empty(); //Clears any existing forecast HTML.

    var userSearchInput = $("#search-input").val(); //Takes user input
    
    var histoyBtn = $("<button>").text(userSearchInput); //Creates a button with the user input
    histoyBtn.addClass("btn");
    histoyBtn.attr("id", "btnHistory");
    $("#history").prepend(histoyBtn);

    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+userSearchInput+ "&appid=5d69237f779c6ad1becd9e8ed5e67f08";

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   }).then(function(response){

    //     console.log(response);
    //   })

    for (var i = 0; i < weatherInfo.length; i++){ //Creates 5 day forecast HTML

        var currentWeather = $("<div>");
        var heading = $("<h3>").text(weatherInfo[i].city+ " ("+ weatherInfo[i].date+ ")"+ weatherInfo[i].icon);
        var temperature = $("<p>").text("Temperature: " + weatherInfo[i].temperature);
        var humidity = $("<p>").text("Humidity: " + weatherInfo[i].humidity);
        var windspeed = $("<p>").text("Wind Speed: " + weatherInfo[i].windspeed);
        
        currentWeather.append(heading);
        currentWeather.append(temperature);
        currentWeather.append(humidity);
        currentWeather.append(windspeed);

        $("#forecast").prepend(currentWeather);

    }
});