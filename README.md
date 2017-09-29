# liri-node-app
Using Twitter API, Spotify API, and OMDB API Liri.js takes in one of the following commands:

 - my-tweets
 
 - spotify-this-song
 
 - movie-this
 
 - do-what-it-says
 
 and retrives certain data upon request.
 
Each Command Does:

1. node liri.js my-tweets

    This shows your last 20 tweets and when they were created at in your terminal/bash window.

2. node liri.js spotify-this-song '<song name here>'
   
    (This command utilizes the node-spotify-api package in order to retrieve song information from the Spotify API.)

    This will show the following information about the song in your terminal/bash window
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        *The album that the song is from
    
    If no song is provided then your program will default to "The Sign" by Ace of Base.
    

3. node liri.js movie-this '<movie name here>'
    (It uses the request package to retrieve data from the OMDB API. )
   
    This will output the following information to your terminal/bash window:
    
       * Title of the movie.
       
       * Year the movie came out.
       
       * IMDB Rating of the movie.
       
       * Rotten Tomatoes Rating of the movie.
       
       * Country where the movie was produced.
       
       * Language of the movie.
       
       * Plot of the movie.
       
       * Actors in the movie.
       
    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


4. node liri.js do-what-it-says

    Using the fs Node package, LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands.
    
    It runs spotify-this-song for "I Want it That Way," as follows the text in random.txt.
