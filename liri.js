
// grab keys
const keys = require("./keys");

var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

// Load the fs package to read and write
var Spotify = require('node-spotify-api');
// var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotify = new Spotify({
 id : spotifyKeys.clientId,
 secret : spotifyKeys.clientSecret
 });

var fs = require("fs");
var Twitter = require('twitter');
var request = require("request");
var action = process.argv[2];
var song = process.argv[3];

console.log(process.argv);
processCommand(action)


// create a switch-case statement 
// The switch-case will direct which function gets run.
function processCommand(action) {
  switch (action) {
      case "my-tweets":
      myTweets();
        break;
    
      case "spotify-this-song":
      spotifyThisSong();
        break;
    
      case "movie-this":
      movieThis();
        break;
    
      case "do-what-it-says":
      doWhatSays();
        break;
    }
}
// First function - myTweets()
function myTweets() {
   
  var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
  });

  var params = {SunLand76912242: 'nodejs', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

      for(i=0; i<tweets.length; i++) {
        console.log(tweets[i].created_at)
        console.log(tweets[i].text)
      }
      // console.log(tweets);
    }
  });
}

// Second function - spotifyThisSong()
function spotifyThisSong() {
  console.log(song)
  if (!song) {
    song = "The Sign"
    console.log(song)
}
  spotify.search({ type: 'track', query: song }, function(err, thisSong) {
   if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }else {
      console.log("Artists/Band name: " + thisSong.tracks.items[0].album.artists[0].name)
      console.log("Album name: " + thisSong.tracks.items[0].album.name)
      console.log("Song's name: " + thisSong.tracks.items[0].name)
      console.log("A preview link of the song: " + thisSong.tracks.items[0].external_urls.spotify)
    }
  });
};

function movieThis() {
  // Grab the movieName which will always be the third node argument.
  var movieName = process.argv[3];
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  if(movieName === "") {
    console.log("Mr. Nobody")
  }
  request(queryUrl, function(error, response, body) {
  // If the request is successful
    if (!error && response.statusCode === 200) {
      
      var bodyObject = JSON.parse(body);
      // console.log(bodyObject);
      console.log("Movie Title: " + bodyObject.Title);
      console.log("  Year: " + bodyObject.Year);
      console.log("  IMDB Rating: " + bodyObject.imdbRating);
      console.log("  Rotten Tomatoes Value: " + bodyObject.Ratings[1].Value);
      console.log("  Country: " + bodyObject.Country);
      console.log("  Language: " + bodyObject.Language);
      console.log("  Plot: " + bodyObject.Plot);
      console.log("  Actors: " + bodyObject.Actors);
   }
  });
}

// // last function
  function doWhatSays() {
      fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        } else {
          // split data into 2 arguments
          // argument 1 is command
          // argument 2 is song

          var args = data.split(',')
          song = args[1]
          action = args[0]

          // pass these arguments to processCommand
          processCommand(action)   

            }
      });
  }
