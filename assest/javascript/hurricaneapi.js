


//--------------------API for Displaying Forecast---------------------------------------------------------------------------------
var forecast ="https://api.aerisapi.com/observations/:auto?&format=json&filter=allstations&limit=1&client_id=5MQ1RvB0ZRonDrmxEfyPq&client_secret=tvg7OeULoGZ8zMJhKD6MimPUerXrY2gli9EjtMT4";
console.log(forecast);


$.ajax({
    url: forecast,
    method: "GET"
})

    // After data comes back from the request
    .then(function (forecastResponse) {

        //console.log(queryURL);

        // console.log(response);
        // storing the data from the AJAX request in the results variable
        var displayForecast = forecastResponse.response;
        console.log(displayForecast);

        
        var country = displayForecast.place.country;
        var city = displayForecast.place.city;
        var state = displayForecast.place.state;
        var dewPoint = displayForecast.ob.dewpointF;
        var humidity = displayForecast.ob.humidity;
        var sunrise = displayForecast.ob.sunriseISO;
        var sunset = displayForecast.ob.sunsetISO;
        var celsius = displayForecast.ob.tempC;
        var fahrenheit = displayForecast.ob.tempF;
        var weather = displayForecast.ob.weather;
        var windGust = displayForecast.ob.windGustSpeedMPH;
        var windSpeed= displayForecast.ob.windSpeedMPH;
        var windDirection = displayForecast.ob.windDir;
        var icon = displayForecast.ob.icon;
        
        console.log(country);
        console.log(icon);
        console.log(windSpeed);
        console.log(city);

        $("#city").text(city);
        $("#state").text(state);
        $("#country").text(country);
        $("#dewPoint").text(dewPoint);
        $("#humidity").text(humidity);
        $("#sunrise").text(sunrise);
        $("#sunset").text(sunset);
        $("#celsius").text(celsius);
        $("#fahrenheit").text(fahrenheit);
        $("#weather").html(weather);
        $("#windGust").text(windGust);
        $("#windSpeed").text(windSpeed);
        $("#windDirection").text(windDirection);
        
//weather animiation
var animation = new AerisMaps.Visualizer("#animation",{
    loc: "seattle,wa",
    keys: {
        id: '5MQ1RvB0ZRonDrmxEfyPq',
        secret: 'tvg7OeULoGZ8zMJhKD6MimPUerXrY2gli9EjtMT4'
    },
    map: {
        zoom: 7,
        size: {
            width: 500,
            height: 300
        },
        layers: ["flat","ftemps-hrrr","water","counties","admin"]
    },
    animation: {
        from: 0 * 3600,
        to: 12 * 3600,
        intervals: 10,
        duration: 2
    },
    overlays: {
        title: "Forecast Temps",
        branding: {
            img: "https://www.aerisweather.com/img/logos/watermark-small.png"
        }
    }

   
});

   
    });

//--------------------API for Storm Tracker---------------------------------------------------------------------------------
// Adding click event listen listener to all buttons
$(document).on("click", "#track", function () {
    // Grabbing and storing the data from Hurricane tracking


    //const searchType = 'random';

    // Constructing a queryURL using the animal name
    // var queryURL = "https://api.aerisapi.com/tropicalcyclones/closest?p=chanhassen,mn&radius=50000mi&filter=all&limit=1&format=json&client_id=5MQ1RvB0ZRonDrmxEfyPq&client_secret=tvg7OeULoGZ8zMJhKD6MimPUerXrY2gli9EjtMT4";
    var queryURL = "https://api.aerisapi.com/tropicalcyclones/?&filter=all&fields=id,profile,position,track,forecast&limit=2&format=json&client_id=5MQ1RvB0ZRonDrmxEfyPq&client_secret=tvg7OeULoGZ8zMJhKD6MimPUerXrY2gli9EjtMT4";
    console.log(queryURL);

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // After data comes back from the request
        .then(function (response) {

            //console.log(queryURL);

            // console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.response;
            console.log(results);

            

            // Creating a paragraph tag with the result item's rating


            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                var stormType1 = results[i].position.details.stormType;
                var stormName1 = results[i].position.details.stormName;
                var stormDirection = results[i].position.details.movement;
                var stormSpeed1 = results[i].position.details.windSpeedMPH;
                var long1 = results[i].position.location.coordinates[0];
                var lat1 = results[i].position.location.coordinates[1];


                console.log(results[i].profile.name);

            // Create the new row
  var newRow = $("<tr>").append(
    $("<td class='tblType'>").text(stormType1),
    $("<td class='tblName'>").text(stormName1),
    $("<td class='tblMove'>").text(stormDirection.direction),
    $("<td class='tblSpeed'>").text(stormSpeed1),
    $("<td class='tblLong'>").text(long1),
    $("<td class='tblLat'>").text(lat1),
  );

  // Append the new row to the table
  $("#storm-table > tbody").append(newRow);


                
            }



        });
});
  // end hurricane Tracker API