//Attempt to pull existing data from localStorage 
var savedCity = localStorage.getItem("city");
var userName = localStorage.getItem("name");

//Pulls up modal with the appropriate fields for input.
function modalMaker(type) {
    $(".modal").show();
    //Populates modal with forms/information according to type
    if (type === "both") {
        $("<form>")
            .append($("<label>")
                .attr("for", "name")
                .text("Name:"))
            .append($("<br>"))
            .append($("<input>")
                .attr("type", "text")
                .attr("id", "nameInput")
                .attr("name", "name"))
            .append($("<br>"))
            .append($("<br>"))
            .append($("<label>")
                .attr("for", "city")
                .text("City:"))
            .append($("<br>"))
            .append($("<input>")
                .attr("type", "text")
                .attr("id", "cityInput")
                .attr("name", "city"))
            .append($("<br>"))
            .append($("<br>"))
            .append($("<input>")
                .attr("type", "submit"))
            .appendTo($(".modal-content"));

        $("form").on("submit", function (event) {
            event.preventDefault();
            var cityName = $("#cityInput").val();
            var name = $("#nameInput").val();
            localStorage.setItem('name', name);
            localStorage.setItem('city', cityName);
            if (cityName && name) {
                getCityData(cityName, "startup");
                $(".modal").hide();
                $(".userName").text(name);
            }

        });
    } else if (type === "city") {
        //Code to populate data and add listeners
        //
        //

        // getCityData(savedCity, "startup");
        // displayInfo(savedCity, userName);
        // localStorage.setItem("city", savedCity);
    } else if (type === "name") {
        //Code to populate data and add listeners
        //
        //

        displayInfo(savedCity, userName);
        localStorage.setItem("name", userName);
    } else if (type === "error") {
        //Code to populate error
        //
        //
    }
};

//Displays user name and city in element
function displayInfo(city, name) {
    $(".userName").text(name);
}

//Fetches immediate data for chosen city, including coordinates and current weather.
function getCityData(city, module) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4493e550e9acf995029c8985968d6001")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
            //Sends data according to fed parameter to the appropriate function
            if (module === "startup") {
                getForecast(data);
                initMap(data);
            } else if (module === "weather") {
                getForecast(data);
            } else if (module === "traffic") {
                initMap(data);
            }
        })
};

//Uses coordinates to get 5-day forecast data
function getForecast(city) {
    fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        city.coord.lat +
        "&lon=" +
        city.coord.lon +
        "&appid=4493e550e9acf995029c8985968d6001"
    )
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                alert("ERROR");
            }
        })
        .then(function (data) {
            console.log("Forecast Object:");
            console.log(data);
        });
}

//Uses coordiates to display google map with traffic overlay
function initMap(city) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: city.coord.lat, lng: city.coord.lon },
    });
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
};

//startup process basied on parameters
if (savedCity && userName) {
    displayInfo(savedCity, userName);
    getCityData(savedCity, "startup");
} else if (!savedCity && !userName) {
    savedCity = "";
    userName = "";
    modalMaker("both");
} else if (!savedCity && userName) {
    savedCity = "";
    modalMaker("city");
} else if (savedCity && !userName) {
    userName = "";
    modalMaker("name");
    getCityData(savedCity, "startup");
};

// $("form").on("submit", function (event) {
//     event.preventDefault();
//     var cityName = $("#cityInput").val();
//     var name = $("#nameInput").val();
//     localStorage.setItem('name', name);
//     localStorage.setItem('city', cityName);
//     if (cityName) {
//         getCityData(cityName, "startup");
//     }
//     else {
//         var entryInvalidParagraph = document.querySelector('#invalid-entry-p');
//         if (!entryInvalidParagraph) {
//             var entryInvalidParagraph = document.createElement('p');
//             var formDiv = document.querySelector('#map');
//             entryInvalidParagraph.id = 'invalid-entry-p';
//             entryInvalidParagraph.textContent = 'Must fill out both forms';
//             entryInvalidParagraph.className = 'non-fading';
//             entryInvalidParagraph.className = 'fading';
//             formDiv.appendChild(entryInvalidParagraph);
//         }
//         else {
//             entryInvalidParagraph.innerHTML = '';
//             var formDiv = document.querySelector('#map');
//             entryInvalidParagraph.id = 'invalid-entry-p';
//             entryInvalidParagraph.textContent = 'Must fill out both forms';
//             entryInvalidParagraph.className = 'non-fading';
//             entryInvalidParagraph.className = 'fading';
//             formDiv.appendChild(entryInvalidParagraph);
//         }
//     }
// });

