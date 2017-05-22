
var id;
var artistsNames;

var artists = [
  "Nick Cave and the Bad Seeds",
  "Drake",
  "Prince",
  "Britney Spears",
  "Lorde",
  "The Arctic Monkeys",
  "Roy Orbison",
  "Skrillex",
  "Metallica",
  "Adele",
  "Pavement",
  "Chas N Dave",
  "Warren G",
  "Kendrick Lamar",
  "Kanye West",
  "David Bowie",
  "Fugazi",
  "The Replacements",
  "Rihanna"
]
//shuffle helper function
var shuffle = function(array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
};

//make request

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

//get an artists id from their name
var getId = function(name){
  var name = name.replace(" ", "+")
  var urlToSearch = "https://api.spotify.com/v1/search?query=" + name + "&type=artist";
  console.log("url to search is", urlToSearch);
  makeRequest(urlToSearch, function(){
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var myObject = JSON.parse(jsonString);
      id = myObject["artists"]["items"][0]["id"];
      console.log(id);
      return id;
  })
}

//gets an artists related artists

var getRelatedArtists = function(id){
  var url = "https://api.spotify.com/v1/artists/" + id + "/related-artists";
  makeRequest(url, function(){
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var myObject = JSON.parse(jsonString);
    var artistsArray = myObject["artists"];
    artistsNames = [];
    for (artist of artistsArray){
      artistsNames.push(artist.name);
    }
    console.log("related artists names", artistsNames);
  })
}


var populateArtists = function() {
  console.log("the play button has been clicked");
  var div = document.getElementById("related-artists");
  div.innerText = ""
  for (name of artistsNames){
    var p = document.createElement("p")
    p.classList.add("artist");
    p.innerText = name;
    div.appendChild(p);
  }
}

//this looks after the play button click and setting up the options.

var playButtonClickHandler = function(){
  console.log("the play button has been clicked")
  artists = shuffle(artists);
  artistToGuess = shuffle(artists)[0];
  console.log("the artist you need to guess", artistToGuess)
  getId(artistToGuess);
  console.log("the id is", id);
  getRelatedArtists(id);
  populateArtists();
}

var guessButtonClickHandler = function(){
  var result = document.getElementById("result");
  var playerGuess = document.getElementById("guess").value;
  console.log("your guess", playerGuess);
  console.log('artist to guess', artistToGuess);
  if (playerGuess == artistToGuess){
    result.innerHTML = "<p>you win!!!</p>"
  } else {
    result.innerHTML = "<p>maybe try again</p>"
  }
}


var requestComplete = function(){
  console.log("your request is complete");
}

var app = function(){
  var playButton = document.getElementById("play-game");
  playButton.addEventListener('click', playButtonClickHandler);
  var guessButton = document.querySelector("#guess-button");
  guessButton.addEventListener('click', guessButtonClickHandler);

}

window.addEventListener('load', app);
