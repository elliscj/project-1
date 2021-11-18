// placeSearch({
//   key: "1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL",
//   container: document.querySelector("#place-search-input"),
// });
// console.log(placeSearch);
var requestUrl =
  "https://www.mapquestapi.com/geocoding/v1/address?key=1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL";

var searchLocation = prompt("Where would you like to drink beer?");

var beerLocation = searchLocation.replaceAll(" ", "_");

console.log(searchLocation);
console.log(beerLocation);

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

// var place = document.getElementById("#place-search-input");

brewUrl =
  "https://api.openbrewerydb.org/breweries?per_page=4&by_city=" + beerLocation;

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
      console.log(data[0].website_url);
      console.log(data[0].street, data[0].city, ",", data[0].state);
      console.log(data[0].name);
      document.getElementById("name-1").textContent = data[0].name;
      document.getElementById("name-2").textContent = data[1].name;
      document.getElementById("name-3").textContent = data[2].name;
      document.getElementById("name-4").textContent = data[3].name;
      (document.getElementById("address-1").textContent = data[0].street),
        data[0].city,
        data[0].state;
      (document.getElementById("address-2").textContent = data[1].street),
        data[1].city,
        data[1].state;
      (document.getElementById("address-3").textContent = data[2].street),
        data[2].city,
        data[2].state;
      (document.getElementById("address-4").textContent = data[3].street),
        data[3].city,
        data[3].state;
      document.getElementById("url-1").textContent = data[0].website_url;
      document.getElementById("url-2").textContent = data[1].website_url;
      document.getElementById("url-3").textContent = data[2].website_url;
      document.getElementById("url-4").textContent = data[3].website_url;
    });
}
getApi();
