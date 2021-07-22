
function getCityData(city, module) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4493e550e9acf995029c8985968d6001")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
            if (module === "weather") {
                getForecast(data);
            } else if (module === "traffic") {
                initMap(data);
            }
        })
        .catch(function (error) {
            alert("Unable retrieve city from Openweather");
        });
};
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
            console.log("Forecast Object:")
            console.log(data);
        })
};

function initMap(city) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: city.coord.lat, lng: city.coord.lon },
    });
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }
