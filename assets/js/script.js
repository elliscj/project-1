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

// function getApi(requestUrl) {
//   fetch(requestUrl)
//     .then(function (response) {
//       console.log(response);
//       if (response.status === 200) {
//         responseText.textContent = response.status;
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// }
