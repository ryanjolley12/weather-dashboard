// 5-DAY --create a new feetch function for this but get it to run in getWeatheer
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

function searchFunction() {
    document.querySelector('.search-term').value = '';
}
searchFunction()


var searchButton = document.getElementById("search-button");

searchButton.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
});

var city = document.querySelector('.city')
var population = document.querySelector('.population')
var sunrise = document.querySelector('.sunrise')
var sunset = document.querySelector('sunset')
var timezone = document.querySelector('.timezone')




function getWeather() {

    var searchTerm = document.querySelector("#searchTerm").value;

    // fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=33.7490&lon=84.3880' + searchTerm + '&appid=e9b6e06235bbfccb7ce673e86f064221')



    // Make a fetch request using the city name --- gives back a data. log that data, traverse through it, and see how to find lat and lon
    // data.coord.lat/lon
    // In the response of that fetch request, grab lat and lon, and make once call api fetch request
    // in the data that comes back from one call api request, you have all the information that you need
    // traverse the data, grab temp, humidity, uvi index and display appropriately
    // make a for loop, to go through daily array and grab all thei infromation 



    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchTerm + '&appid=e9b6e06235bbfccb7ce673e86f064221')


        .then(function (response) {
           //console.log(response.json());
            //var data = response.json().data;

            return response.json();


        })

        .then(function (response) {
            //console.log(response)

            var cityWeather = response.list[0].weather[0];
          //console.log(cityWeather);

            var responseContainerEl = document.querySelector('#response-container-main');

            responseContainerEl.innerHTML = cityWeather.description;

            var weather = document.createElement("weather");
            weather.setAttribute('src', response.list[0]);

            responseContainerEl.appendChild(weather);
        
    });



//FETCH USING ONECALL FOR THE FIVE DAY FORECAST 
function fiveDay () {

    fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${response.city.coord.lat}&lon=${response.city.coord.lon}&appid=&appid=e9b6e06235bbfccb7ce673e86f064221`)

    .then(function(response) {
        //console.log(response.json());
        return response.json();

    })

    .then(function(response) {
        console.log(response)
    }) 

}



function atlanta() {

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=e9b6e06235bbfccb7ce673e86f064221')

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            var atlantaWeather = response.list[0].weather[0];
            console.log(atlantaWeather);

            var responseContainerEl = document.querySelector('#atlResponse');
            responseContainerEl.innterHTML = atlantaWeather.main;

            var atl = document.createElement("text");
            atl.setAttribute('src', response.list[0]);
            console.log(atl);

            responseContainerEl.appendChild(atl);

        });
    }}
