var brewlist = document.querySelector("#brewlist");
var clear = document.querySelector("#clear");

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

var breweries = localStorage.getItem("breweries");
breweries = JSON.parse(breweries);
var data = breweries;

if (breweries !== null) {
  for (let i = 0; i < data.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = data[i];
    brewlist.appendChild(createLi);
  }
}

goBack.addEventListener("click", function () {
  window.location.replace("./index.html");
});
