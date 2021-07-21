//Fetches city coordinates from Openweather
function getCoordinates(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4493e550e9acf995029c8985968d6001")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            //Sends object to getForecast function
            getForecast(data);
        })
        .catch(function (error) {
            alert("Unable retrieve city from Openweather");
        });
};
//Fetches forecast data from Openweather
function getForecast(city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + city.coord.lat + "&lon=" + city.coord.lon + "&appid=4493e550e9acf995029c8985968d6001")
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                alert("ERROR");
            }
        })
        .then(function (data) {
            console.log(city);
            console.log(data);
        })
};

getCoordinates("phoenix");