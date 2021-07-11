// WORKED WITH PROJECT 1 GROUP __ ANIDINO AND SHANE 

var key = "e9b6e06235bbfccb7ce673e86f064221";
var searchButtonEl = document.getElementById("search-button")
var searchTerm = document.getElementById("searchTerm")
var city = document.getElementById("city");
var date = document.getElementById("date");
var cityTemp = document.getElementById("city-temp");
var cityWind = document.getElementById("city-wind");
var cityHumidity = document.getElementById("city-humidity");
var uvindex = document.getElementById("city-uv");
var fiveDayContainer = document.getElementById("fiveDay");
var recentlyViewed = $(".searchHistory");


function getWeather(searchTerm) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + key)

    .then(response => response.json())
    .then(data => {                                   /// get other pieces of data from JSON 
        var windValue = data["wind"]["speed"] + "MPH";
        var humidValue = data["main"]["humidity"];
        var nameValue = data["name"];
        var tempValue = Math.round(((parseFloat(data["main"]["temp"]) - 273.15) * 1.8) + 32) + "&deg";
        var currentHour = moment.unix(data.dt).format("MMMM Do YYYY");     // moment to format date

        city.innerHTML = nameValue;                               /// add new weather data to innerhtmls
        date.innerHTML = currentHour;
        cityTemp.innerHTML = "Temp: " + tempValue + "F";
        cityWind.innerHTML = "Wind Speed: " + windValue;
        cityHumidity.innerHTML = "Humidity: " + humidValue + "%";


// SECOND API CALL TO GATHER LONGITUDE AND LATITUDE 

            /// second api call to gather latitude, longitude 
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=e9b6e06235bbfccb7ce673e86f064221`)
                .then(response => response.json())             // format response to JSON
                .then(data => {

                    var uvValue = data.current.uvi;             //// get UVvalue from JSON data
                    uvindex.innerHTML = "UV Index: " + uvValue;

                    if (uvValue > 0 && uvValue <= 3.5) {          /// set colors accordingly to UV indexes
                        $(`#uv-color`).addClass("low");
                    } else if (uvValue > 3.5 && uvValue <= 6.5) {
                        $(`#uv-color`).addClass("moderate");
                    } else if (uvValue > 6.5 && uvValue <= 10) {
                        $(`#uv-color`).addClass("high");
                    }

                    // create array for the five days then loop through //
                    var fiveDay = [1, 2, 3, 4, 5];
                    for (var i = 0; i < fiveDay.length; i++) {
                        /// use moment to format date 
                        var cardDate = moment.unix(data.daily[i].dt).format('MM/DD/YY');
                        var dateEl = document.getElementById(`card-date-${fiveDay[i]}`);
                        dateEl.innerHTML = cardDate;   // insert date to card 

                    }

                    // Insert Data in Cards
                    var cardIndex = [1, 2, 3, 4, 5];

                    for (var i = 0; i < cardIndex.length; i++) {

                        var tempDay = Math.round(((parseFloat(data['hourly'][i]['temp']) - 273.15) * 1.8) + 32) + '&deg' + 'F';
                        var tempEl = document.getElementById(`card-temp-${cardIndex[i]}`);
                        tempEl.innerHTML = `Temp: ${tempDay}`;

                        var iconcode = data.daily[0].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $(`#wicon-${cardIndex[i]}`).attr('src', iconurl);

                        var windDay = data['daily'][i]['wind_speed'] + 'MPH';
                        var windEl = document.getElementById(`wind-${cardIndex[i]}`);
                        windEl.innerHTML = `Wind: ${windDay}`;

                        var humidDay = data['daily'][i]['humidity'];
                        var humidEl = document.getElementById(`humid-${cardIndex[i]}`);
                        humidEl.innerHTML = `Humidity: ${humidDay}%`;

                    }

                })
        });

}

// local storage for cities searched for 
if (window.localStorage) {
    var saveCity = document.getElementById("searchTerm");
    saveCity.value = localStorage.getItem("searchTerm");

    saveCity.addEventListener("input", function () {
        localStorage.setItem("searchBar", saveCity.value);
    }, false)
}

function getSearchHistory() {
    searchHistoryEl.empty();
    let searchHistoryArr = JSON.parse(localStorage.getItem("searchBar"));
    for (let i = 0; i < searchHistoryArr.length; i++) {
        // put newListItem in loop so we make new element for each array index 
        var newListItem = $("<li>").attr("class", "searchCity");
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(newListItem);
    }
}

searchButtonEl.addEventListener('click', function () {
    getWeather(searchTerm.value);

    var btn = document.createElement("button");
    btn.innerHTML = searchTerm.value;

    document.getElementById("fiveDay").appendChild(btn);
    btn.setAttribute('style', 'text-color: #f7f7f7');
    btn.setAttribute('style', 'background-color: #0275d8');
 


});