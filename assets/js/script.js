// placeSearch({
//   key: "1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL",
//   container: document.querySelector("#place-search-input"),
// });
// console.log(placeSearch);

var savedBrewery = JSON.parse(localStorage.getItem("breweries")) || [];
console.log(savedBrewery);

var requestUrl =
  "https://www.mapquestapi.com/geocoding/v1/address?key=1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL";

let searchLocation = ""; // prompt("Where would you like to drink beer?");
let beerLocation = "";

console.log(searchLocation);
console.log(beerLocation);

var breweries = [];

// window.onload =
function findBreweries() {
  map.remove();
  document.getElementById("map-container").innerHTML =
    "<div id='map' style='width: 80%; height: 400px;'></div>";
  searchLocation = document.getElementById("cityreq").value;
  beerLocation = searchLocation.trim().replaceAll(" ", "_");

  getApi();

  function getApi() {
    // fetch request gets a list of all the repos for the node.js organization

    brewUrl =
      "https://api.openbrewerydb.org/breweries?per_page=4&by_city=" +
      beerLocation;

    console.log(brewUrl);

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

        // console.log(lat, long);
        // console.log(data[0].latitude, data[0].longitude);
        breweries.splice(0, 4);
        for (let i = 0; i < 4; i++) {
          document
            .querySelectorAll(".save")
            [i].setAttribute("data-name", data[i].name);
          document.getElementsByClassName("card-title")[i].textContent =
            data[i].name;
          (document.getElementsByClassName("card-text")[i].textContent =
            data[i].street),
            data[i].city,
            data[i].state;
          document.querySelectorAll(".card-url")[i].textContent =
            data[i].website_url;
          var lat = parseFloat(data[i].latitude);
          var long = parseFloat(data[i].longitude);
          var name = data[i].name;
          var locationObject = { lat, long, name };
          breweries.push(locationObject);
        }
        L.mapquest.key = "1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL";
        L.mapquest.geocoding().geocode(searchLocation, createMap);
        function createMap(error, response) {
          var location = response.results[0].locations[0];
          var latLng = location.displayLatLng;
          var map = L.mapquest.map("map", {
            center: latLng,
            layers: L.mapquest.tileLayer("map"),
            zoom: 12,
          });
          for (let i = 0; i < breweries.length; i++) {
            if (!breweries[i].lat) {
              return;
            }

            L.marker([breweries[i].lat, breweries[i].long], {
              icon: L.mapquest.icons.marker(),
              draggable: false,
            })
              .bindPopup(breweries[i].name)
              .addTo(map);
          }
          // L.marker([39.7392, -104.9903], {
          //   icon: L.mapquest.icons.marker(),
          //   draggable: false,
          // })
          //   .bindPopup("Denver, CO")
          //   .addTo(map);
        }
        console.log(breweries);
      });
  }
}
document
  .querySelector(".brewresults")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.matches(".save")) {
      console.log("yes");
      var breweryName = event.target.dataset.name;
      console.log(breweryName);
      savedBrewery.push(breweryName);
      localStorage.setItem("breweries", JSON.stringify(savedBrewery));
    }
  });

document.getElementById("submit").addEventListener("click", findBreweries);
document.getElementById("cityreq").addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});

// var place = document.getElementById("#place-search-input");

console.log("./imgs/img-1.jpg");
