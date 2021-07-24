  
//Attempt to pull existing data from localStorage 
var savedCity = localStorage.getItem("city");
var userName = localStorage.getItem("name");

//Pulls up modal with the appropriate fields for input.
function modalMaker(type) {
    $(".modal").show();
    $(".modal-content").html('');
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
            var cityName = $("#cityInput").val().trim();
            var name = $("#nameInput").val().trim();
            localStorage.setItem('name', name);
            localStorage.setItem('city', cityName);
            if (cityName && name) {
                displayInfo(cityName, name);
                getCityData(cityName, "startup");
                $(".modal").hide();
            } else {
                $("<p>")
                    .text("Please fill out both fields!")
                    .prependTo($(".modal-content"));
            };
        });
    } else if (type === "name") {
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
            .append($("<input>")
                .attr("type", "submit"))
            .appendTo($(".modal-content"));

        $("form").on("submit", function (event) {
            event.preventDefault();
            var name = $("#nameInput").val().trim();
            localStorage.setItem('name', name);
            if (name) {
                displayInfo(null, name);
                $(".modal").hide();
            } else {
                $("<p>")
                    .text("Please fill out your name!")
                    .appendTo($(".modal-content"));
            };
        });
    } else if (type === "city") {
        $("<form>")
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
            var cityName = $("#cityInput").val().trim();
            localStorage.setItem('city', cityName);
            if (cityName) {
                displayInfo(cityName, null);
                getCityData(cityName, "startup");
                $(".modal").hide();
            } else {
                $("<p>")
                    .text("Please fill your city!")
                    .appendTo($(".modal-content"));
            };
        });
    } else if (type === "error") {
        //Code to populate error
        $("<form>")
            .append($("<label>")
                .attr("for", "error")
                .text("Error!"))
    }
};

//Displays user name and city in element
function displayInfo(city, name) {
    if (city && name) {
        $(".userName").text(name);
    } else if (!city && name) {
        $(".userName").text(name);
    }
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
    displayInfo(null, userName);
    modalMaker("city");
} else if (savedCity && !userName) {
    userName = "";
    modalMaker("name");
    getCityData(savedCity, "startup");
};

$('#username-button').on('click', function(event) {
    event.preventDefault();
    modalMaker('both');
});
