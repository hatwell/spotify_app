var base_url = "https://api.spotify.com/v1/search?query=";


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var artistRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myObject = JSON.parse(jsonString);
  var countrySelector = document.querySelector("#market-selecter");
  console.log(countrySelector);
  var marketSearch = countrySelector.value;
  console.log(marketSearch);
  var artistId = myObject["artists"]["items"][0]["id"]
  var artistUrl = "https://api.spotify.com/v1/artists/"
  var searchUrl = artistUrl + artistId;

  //this bit makes the country list populate
  var availableMarkets
  var countryList = document.querySelector("#test");


  makeRequest(searchUrl, idRequestComplete);
  return myObject;
}




var idRequestComplete = function(){
  console.log("request complete");
}


var buttonClickHandler = function(){
  console.log("i have been clicked");
  var searchBox = document.getElementById("search-query")
  var query = searchBox.value;
  var searchUrl = base_url + query + "&type=artist";

  makeRequest(searchUrl, artistRequestComplete);

}

var populateList = function(artistObject){
  var ul = document.querySelector("ul");
  var li = document.createElement("li");
  var info = artistObject["artists"]["items"][0]["name"];
  li.innerText = info;
  console.log(artistObject);
  ul.appendChild(li);
}



var app = function(){


  // var search_url = base_url + searchQuery;

  var button = document.getElementById("search-button");
  button.addEventListener('click', buttonClickHandler)
  // makeRequest(search_url, requestComplete);


}

window.addEventListener('load', app);
