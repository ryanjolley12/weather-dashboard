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


function getWeather() {

    var searchTerm = document.querySelector("#searchTerm").value;

    // fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=33.7490&lon=84.3880' + searchTerm + '&appid=e9b6e06235bbfccb7ce673e86f064221')

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchTerm + '&appid=e9b6e06235bbfccb7ce673e86f064221')


        .then(function (response) {
            //console.log(response.json());
            // var data = response.json().data;
            // console.log(data);
            return response.json();

        })

        .then(function (response) {
            var cityWeather = response.list[0].weather[0];
            console.log(cityWeather);

            var responseContainerEl = document.querySelector('#response-container-main');

            responseContainerEl.innerHTML = cityWeather.description;

            var weather = document.createElement("weather");
            weather.setAttribute('src', response.list[0]);

            responseContainerEl.appendChild(weather);
        });
}


function atlanta() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q="Atlanta"&appid=e9b6e06235bbfccb7ce673e86f064221')

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            var atlantaWeather = response.list[0].weather[0];
            console.log(atlantaWeather);

        });
}
