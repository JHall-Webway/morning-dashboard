//Attempt to pull existing data from localStorage 
var savedCity = localStorage.getItem("city");
var userName = localStorage.getItem("name");

//Pulls up modal with the appropriate fields for input.
function modalMaker(type) {
    //Code to either display or dynamically create modal
    //
    //

    //Populates modal with forms/information according to type
    if (type === "both") {
        //Code to populate data and add listeners
        //
        //
        
        // displayInfo(savedCity, userName);
        // getCityData(savedCity, "startup");
        // localStorage.setItem("city", savedCity);
        // localStorage.setItem("name", userName);
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
    //Code that inserts user data into elements
    //
    //
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

$("form").on("submit", function (event) {
    event.preventDefault();
    var cityName = $("#city").val();
    var name = $("#name").val();
    localStorage.setItem('name', name);
    localStorage.setItem('city', cityName);
    if (cityName) {
        getCityData(cityName, "startup");
    }
    else {
        var entryInvalidParagraph = document.querySelector('#invalid-entry-p');
        if (!entryInvalidParagraph) {
            var entryInvalidParagraph = document.createElement('p');
            var formDiv = document.querySelector('#map');
            entryInvalidParagraph.id = 'invalid-entry-p';
            entryInvalidParagraph.textContent = 'Must fill out both forms';
            entryInvalidParagraph.className = 'non-fading';
            entryInvalidParagraph.className = 'fading';
            formDiv.appendChild(entryInvalidParagraph);
        }
        else {
            entryInvalidParagraph.innerHTML = '';
            var formDiv = document.querySelector('#map');
            entryInvalidParagraph.id = 'invalid-entry-p';
            entryInvalidParagraph.textContent = 'Must fill out both forms';
            entryInvalidParagraph.className = 'non-fading';
            entryInvalidParagraph.className = 'fading';
            formDiv.appendChild(entryInvalidParagraph);
        }
    }
});


var navigatePage = function() {
    var body = document.querySelector('body');
    body.innerHTMl = '';
    displayFromObject(startPage);
    $("form").on("submit", function (event) {
        event.preventDefault();
        var cityName = $("#city").val();
        var name = $("#name").val();
        localStorage.setItem('name', name);
        localStorage.setItem('city', cityName);
        if (cityName) {
            var body = document.querySelector('body');
            body.innerHTMl = '';
            displayFromObject(homePage);
            getCityData(cityName, "startup");
        }
        else {
            var entryInvalidParagraph = document.querySelector('#invalid-entry-p');
            if (!entryInvalidParagraph) {
                var entryInvalidParagraph = document.createElement('p');
                var formDiv = document.querySelector('#splash-div');
                entryInvalidParagraph.id = 'invalid-entry-p';
                entryInvalidParagraph.textContent = 'Must fill out both forms';
                entryInvalidParagraph.className = 'non-fading';
                entryInvalidParagraph.className = 'fading';
                formDiv.appendChild(entryInvalidParagraph);
            }
            else {
                entryInvalidParagraph.innerHTML = '';
                var formDiv = document.querySelector('#splash-div');
                entryInvalidParagraph.id = 'invalid-entry-p';
                entryInvalidParagraph.textContent = 'Must fill out both forms';
                entryInvalidParagraph.className = 'non-fading';
                entryInvalidParagraph.className = 'fading';
                formDiv.appendChild(entryInvalidParagraph);
            }
        }
    });
}


var displayFromObject = function(item) {
    var keys = Object.keys(item);
    for (i=0; i< keys.length; i++) {
        var el = item['object'+i];
        var parent = document.querySelector(el.parent);
        delete el.parent;
        var displayEl = document.createElement(el.element);
        delete el.element;
        elKeys = Object.keys(el);
        for (j=0; j<elKeys.length; j++) {
            var key = elKeys[j];
            if (key === 'textContent') {
                displayEl.textContent = el[key];
            }
            else {
                displayEl.setAttribute(key, el[key])
            }
        }
        parent.appendChild(displayEl)
    }
}

var homePage = {
    'object0': {
        parent: 'body',
        element: 'div',
        id: 'map',
    }
}

var startPage = {
    'object0': {
        parent: 'body',
        element: 'div',
        class: 'splash-container',
        id: 'splash-container'
    },
    'object1': {
        parent: '#splash-container',
        element: 'div',
        class: 'splash',
        id: 'splash-div',
    },
    'object2': {
        parent: '#splash-div',
        element: 'h1',
        class: 'splash-head',
        id: 'splash-head',
        textContent: 'WELCOME',
    },
    'object3': {
        parent: '#splash-div',
        element: 'p',
        class: 'splash-subhead',
        id: 'splash-subhead',
        textContent: 'Please Enter Your Name and City to Continue',
    },
    'object4': {
        parent: '#splash-div',
        element: 'form',
        class: 'pure-form pure-form-stacked',
        id: 'outer-form',
    },
    'object5': {
        parent: '#outer-form',
        element: 'fieldset',
        id: 'fieldset',
    },
    'object6': {
        parent: '#fieldset',
        element: 'form',
        class: 'pure-g',
        id: 'inner-form',
    },
    'object7': {
        parent: '#inner-form',
        element: 'span',
        class: 'pure-form-message',
        id: 'form-span',
        textContent: 'This is a required field',
    },
    'object8': {
        parent: '#inner-form',
        element: 'label',
        for: 'userName',
        id: 'form-label-name',
        textContent: 'Your Name',
    },
    'object9': {
        parent: '#inner-form',
        element: 'div',
        class: 'splash-form',
        id: 'form-div-name',
    },
    'object10': {
        parent: '#form-div-name',
        element: 'input',
        type: 'text',
        id: 'name',
        placeholder: 'Name',
    },
    'object11': {
        parent: '#inner-form',
        element: 'label',
        for: 'city',
        id: 'form-label-city',
        textContent: 'City',
    },
    'object12': {
        parent: '#inner-form',
        element: 'div',
        class: 'splash-form',
        id: 'form-div-city',
    },
    'object13': {
        parent: '#form-div-city',
        element: 'input',
        type: 'text',
        id: 'city',
        placeholder: 'City',
    },
    'object14': {
        parent: '#inner-form',
        element: 'button',
        type: 'submit',
        id: 'begin-button',
        class: 'pure-button pure-button-primary',
        textContent: 'Begin',
    },
}

navigatePage();





