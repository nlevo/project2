$(document).ready(function () {
  console.log("ready!");

  //toggle hours of operatiosn
  $("#btn-hours").click(function () {
    $("#hours-of-operation").toggle("slow");
  });

  //toggle address
  $("#btn-address").click(function () {
    $("#address").toggle("slow");
  });

  //toggle map search
  $("#btn-search").click(function () {
    $("#search-box").toggle("slow", "swing");
    $(".search").toggle("slow");
  });

  //toggle map search
  $(".search").click(function () {
    $("#search-box").toggle("slow", "swing");
    $(".search").toggle("slow");
  });

});

//prevents form submittion when user presses "enter" key inside google autocomplete inputrs tag
$(document).on("keypress", ":input:not(textarea):not([type=submit])", function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
    { types: ['address'] });

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log('Place is --- :' , autocomplete);

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}