// placeSearch({
//   key: "1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL",
//   container: document.querySelector("#place-search-input"),
// });
// console.log(placeSearch);

var requestUrl =
  "https://www.mapquestapi.com/geocoding/v1/address?key=1zplhBsQEJyaGd98SGJ6HjcN66lVvSDL";

let searchLocation = ""// prompt("Where would you like to drink beer?");
let beerLocation = ""

console.log(searchLocation);
console.log(beerLocation);

// window.onload = 
function findBreweries() {

  searchLocation = document.getElementById("cityreq").value 
  beerLocation = searchLocation;
  console.log(beerLocation)
  
  getApi();

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
}};

document.getElementById("submit").addEventListener("click", findBreweries)

// var place = document.getElementById("#place-search-input");

console.log("./imgs/img-1.jpg")

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization

  brewUrl =
  "https://api.openbrewerydb.org/breweries?by_city=" + beerLocation + "&per_page=4"

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

    for (let i = 0; i < 4; i++) {

        let backgroundImages = Math.floor(Math.random() * 19) + 1

        document.getElementsByClassName("card-title")[i].textContent = data[i].name;
        // document.getElementsByClassName("card-imgs")[i].src = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw17UayflL5vNx0VPaxoqbDO&ust=1637295349984000&source=images&cd=vfe&ved=2ahUKEwicl4zPhqH0AhWCK6wKHQhNA6AQr4kDegUIARDMAQ" // "./imgs/img-" + backgroundImages + ".jpg"; 
        document.getElementsByClassName("card-text")[i].textContent = data[i].street, data[i].city, data[i].state;
        document.getElementById("card-url").textContent = data[i].website_url;

    }


    });
}
