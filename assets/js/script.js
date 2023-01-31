$("#search-button").on("click", function() {
    var userSearchInput = $("#search-input").val();
    
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+userSearchInput+ "&appid=5d69237f779c6ad1becd9e8ed5e67f08";
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=5d69237f779c6ad1becd9e8ed5e67f08";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){

        console.log(response);
      })
});