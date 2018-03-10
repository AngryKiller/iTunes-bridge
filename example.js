const iTunes = require('./itunes-bridge');
var currentPlayerState = iTunes.getPlayerState();

if(currentPlayerState == 'playing') {

    var exampleMsg = "iTunes is currently playing " + iTunes.getCurrentTrackName() + " by " + iTunes.getCurrentTrackArtist() + ' from the album "' + iTunes.getCurrentTrackAlbum() + '". This song is ' + iTunes.getCurrentTrackDuration() + ' long and will finish in ' + iTunes.getCurrentTrackRemainingTime();
    var exampleMsg2 = "You have " + iTunes.getPlaylistCount() + " playlists in your library and " + iTunes.getTrackCount() + " tracks!";

    console.log(exampleMsg);
    console.log(exampleMsg2);
}else if(currentPlayerState == 'paused'){

    var exampleMsg = 'iTunes is currently paused';
    console.log(exampleMsg)
}else if (currentPlayerState == "not running"){

    var exampleMsg = "iTunes is not running at the moment.";
    console.log(exampleMsg);
}