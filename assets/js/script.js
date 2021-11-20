// Setting variables
var savedBrewery = JSON.parse(localStorage.getItem("breweries")) || [];
console.log(savedBrewery);
var requestUrl =
  "https://www.mapquestapi.com/geocoding/v1/address?key=1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL";
let searchLocation = "";
let beerLocation = "";
var breweries = [];

// Functions

// Main function to find breweries & display them on the map
function findBreweries() {
  // "map.remove()" clears out container to allow for more than one search without having to refresh the page
  map.remove();
  document.getElementById("map-container").innerHTML =
    "<div id='map' style='width: 80%; height: 400px;'></div>";
  searchLocation = document.getElementById("cityreq").value;
  // Replaces spaces in locations such as "Fort Collins" or "San Diego" with underscores i.e. "Fort_Collins", "San_Diego"
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

        breweries.splice(0, 4);

        // Pulls data retrieved from brewUrl query and displays it on the cards on the application
        for (let i = 0; i < data.length; i++) {
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
          document
            .querySelectorAll(".card-url")
            [i].setAttribute("href", data[i].website_url);
          var lat = parseFloat(data[i].latitude);
          var long = parseFloat(data[i].longitude);
          var name = data[i].name;
          var locationObject = { lat, long, name };
          breweries.push(locationObject);
        }
        // Creates map and pulls brewery information to use latitude/longitude coordinates to place markers at corresponding location
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
        }
        console.log(breweries);
      });
  }
}
// Localstorage function to save queries
document
  .querySelector(".brewresults")
  .addEventListener("click", function (event) {
    if (event.target.matches(".save")) {
      console.log("yes");
      var breweryName = event.target.dataset.name;
      console.log(breweryName);
      savedBrewery.push(breweryName);
      localStorage.setItem("breweries", JSON.stringify(savedBrewery));
    }
  });

  // Event listeners to attach functions to buttons
document.getElementById("submit").addEventListener("click", findBreweries);
document.getElementById("cityreq").addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});