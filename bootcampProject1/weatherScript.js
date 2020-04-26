// BangkokDangerus- scrapped all NYT code in favor of simple ajax to get api working will build URL builder next 
$(document).ready(function(){
var input = document.getElementById('autocomplete');
      var autocomplete = new google.maps.places.Autocomplete(input,{types: ['(cities)']});
      google.maps.event.addListener(autocomplete, 'place_changed', function(){
         var place = autocomplete.getPlace();
      });

//Pull user input and transfer to ajax url
$("#run-search").on("click", function(){
  event.preventDefault();
  var finalLoc = $("#autocomplete").val();
  $("#weatherGif").removeClass("invisible");
  $("#anid").removeClass("invisible");
  console.log(finalLoc);
  loadLocation(finalLoc);
});

console.log($("#result").text());
function loadLocation(Location) {
  
    

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=67f7b70a57885cc5e9a93ac4280e436f`,
      }).done(function(theWeather) {
        var data = theWeather;
        // Sets result div text to the city name
        $("#result").text(data.name + " ");
        // Sets the weather result div text to the weather description
        $("#resultWeather").text(data.weather[0].description + " ");
        // Sets main result text to the temperature
        $("#resultTemp").text(((data.main.temp - 273.15) * 9/5 + 32).toFixed(2) + " °F ");
        // Sets wind result text to the wind speed
        $("#resultWind").text(data.wind.speed + " MPH ");
        // Shows response
        console.log(data);
      });
      // Set one second delay on second API to give the first API time to update after the search
      setTimeout(() => {  
        $.ajax({
          url: "https://api.giphy.com/v1/gifs/search?api_key=fbIf1ckwS6OC3tiJr1DgcpOH3SHQcgT1&limit=1&offset=0&rating=G&lang=en&q=" + $("#resultWeather").text().trim().replace(/\s+/g, '-'),
        }).done(function(gifTest) {
          var gifData = gifTest;
          // Setting weather gif source to gif url
          $("#weatherGif").attr("src", gifData.data[0].images.original.url);
          // Setting alt to Weather-image
          $("#weatherGif").attr("alt", "Weather-image");
          // Can check the source here
          console.log(gifData.data[0].images.original.url);
          // Can check the url request here
          console.log("https://api.giphy.com/v1/gifs/search?api_key=fbIf1ckwS6OC3tiJr1DgcpOH3SHQcgT1&limit=1&offset=0&rating=G&lang=en&q=" + $("#resultWeather").text().trim().replace(/\s+/g, '-'));
        });
      }, 
      1000);
      
             
};

//this.loadLocation();
});