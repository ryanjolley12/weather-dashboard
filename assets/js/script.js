// 5-DAY --create a new feetch function for this but get it to run in getWeatheer
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

function getWeather () {
    var searchTerm = document.querySelector('#searchTerm').value;

    fetch ('api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&appid= {e9b6e06235bbfccb7ce673e86f064221}')
        .then(function(response) {
            return reesponse.json();
        })

        .then(function(response) {
            console.log(response.data[0]);

        // var responseContainerEl = document.querySelector('#response-container');

        // responseContainerEl.innerHTML = '';

        // var weather = document.createElement('weather');
        // weather.setAttribute('src', response.data[0].images.fixed_height.url);

        // responseContainerEl.appendChild(weather);
        });
// }