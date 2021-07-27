// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      'Content-Type': 'application/json',
      'Authorization': '5b3ce3597851110001cf624822a021e023d6442c86c9d2e3384eccb4',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return(response);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var locationsObject = {};
locationsObject.reset = function() {
  locationsObject.states = ['start', 'end', 'start', 'end', 'duration']
  locationsObject.startLocation = {}
  locationsObject.endLocation = {}
  locationsObject.functions = ['getLocations', 'getLocations', 'getCoordinates', 'getCoordinates', 'getDuration']
  locationsObject.progressState = function() {
    locationsObject.states.splice(0, 1);
    locationsObject.functions.splice(0, 1);
  }
  locationsObject.coordinates = [];
}

locationsObject.getDuration = function() {
  postData('https://api.openrouteservice.org/v2/directions/driving-car/geojson', 
      {coordinates: locationsObject.coordinates
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      else {
          alert("ERROR");
      }
    })
    .then(function (data) {
      if ($('#travel-time-p').text()) {
        $('#travel-time-p')
          .text('Drive Time: ' + Math.floor(data.features[0].properties.summary.duration/60) + ' min');
      }
      else {
        $("<p>")
          .text('Drive Time: ' + Math.floor(data.features[0].properties.summary.duration/60) + ' min')
          .attr('id', 'travel-time-p')
          .appendTo($("#travel-time-div"));
      }
    });
}

locationsObject.getCoordinates = function() {

  var request = new XMLHttpRequest();

  var location = locationsObject[locationsObject.states[0]+'Location'];

  request.open('GET', 'https://api.openrouteservice.org/geocode/search/structured?'
                      + 'api_key=5b3ce3597851110001cf624822a021e023d6442c86c9d2e3384eccb4'
                      + '&address=' + location.address
                      + '&country=' + location.country
                      + '&postalcode=' + location.postalcode
                      + '&region=' + location.region
                      + '&locality=' + location.locality
  );

  request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      locationsObject.coordinates.push(JSON.parse(this.response).features[0].geometry.coordinates);
      locationsObject.progressState();
      var fn = locationsObject[locationsObject.functions[0]];
      if (typeof fn === "function") fn();
    }
  };

  request.send();
}

locationsObject.getLocations = function() {
  $(".modal").show();

  var inputs = ['address', 'locality', 'region', 'country', 'postalCode'];
  var inputsObject = {}
  
  var modalForm = $("<form>")
    .attr("id", "modal-form")

  modalForm.append($('<label>')
    .text(capitalizeFirstLetter(locationsObject.states[0]) + ' Location'))
    .append('<br>')
    .append('<br>');

  for (i=0; i<inputs.length; i++) {
    inputName = inputs[i]
    inputsObject[inputName+'Label'] = $("<label>")
    .text(capitalizeFirstLetter(inputName) + ":")

    inputsObject[inputName+'Input'] = $("<input>")
      .attr("type", "text")
      .attr("id", inputName + '-input')
      .attr("name", inputName)
  }

  var submitButton = $("<input>")
  .attr("type", "submit");

  for (i=0; i<inputs.length; i++) {
    inputName = inputs[i];
    modalForm.append(inputsObject[inputName+'Label']);
    modalForm.append($('<br>'));
    modalForm.append(inputsObject[inputName+'Input']);
    modalForm.append($('<br>'));
  }

  modalForm.append($('<br>'))
    .append(submitButton)
  $('.modal-content').append(modalForm)

  $("form").on("submit", function (event) {
    event.preventDefault();
    var formFilled = true;
    for (i=0; i<inputs.length; i++) {
      inputName = inputs[i];
      var item = inputsObject[inputName+'Input'].val().trim();
      if (!item) {
        formFilled = false;
      }
    }
    if (formFilled) {
      var addressString = '';
      for (i=0; i<inputs.length; i++) {
        inputName = inputs[i];
        var item = inputsObject[inputName+'Input'].val().trim();
        locationsObject[locationsObject.states[0]+'Location'][inputName] = item;
        addressString += item + ' ';
      }
      if ($('#' + locationsObject.states[0] + '-location-p').text()) {
        $('#' + locationsObject.states[0] + '-location-p')
          .text(capitalizeFirstLetter(locationsObject.states[0]) + ' Location: ' + addressString.trim());
      }
      else {
        $("<p>")
          .text(capitalizeFirstLetter(locationsObject.states[0]) + ' Location: ' + addressString.trim())
          .attr('id', locationsObject.states[0] + '-location-p')
          .appendTo($("#travel-time-div"));
      }
      $(".modal-content").empty();
      $(".modal").hide();
      locationsObject.progressState();
      var fn = locationsObject[locationsObject.functions[0]];
      if (typeof fn === "function") fn();
    }
    else {
      if ($('#fill-out-form-p').text()) {
        $('#fill-out-form-p')
          .text("Please fill out all inputs.");
      }
      else {
        $("<p>")
          .text("Please fill out all inputs.")
          .attr('id', 'fill-out-form-p')
          .appendTo($("#modal-form"));
      }
    }
  })
}

$("#commute-button").on("click", function (event) {
  event.preventDefault();
  locationsObject.reset();
  var fn = locationsObject[locationsObject.functions[0]];
  if (typeof fn === "function") fn();
});
