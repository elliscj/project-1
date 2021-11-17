// placeSearch({
//   key: "1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL",
//   container: document.querySelector("#place-search-input"),
// });
// console.log(placeSearch);
var requestUrl =
  "https://www.mapquestapi.com/geocoding/v1/address?key=1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL";

var searchLocation = prompt("where would you like to start your search?");

window.onload = function () {
  L.mapquest.key = "1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL";
  L.mapquest.geocoding().geocode(searchLocation, createMap);
  function createMap(error, response) {
    var location = response.results[0].locations[0];
    var latLng = location.displayLatLng;
    var map = L.mapquest.map("map", {
      center: latLng,
      layers: L.mapquest.tileLayer("map"),
      zoom: 14,
    });
  }
};

var place = document.getElementById("#place-search-input");

brewUrl =
  "https://api.openbrewerydb.org/breweries?per_page=4&by_city=" +
  searchLocation;

console.log(brewUrl);

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization

  //fetch returns us a promise object - promise obj have 3 states - pending resolved rejected
  fetch(brewUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getApi();
