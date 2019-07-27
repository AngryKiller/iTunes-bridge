/**
 * An example file to learn how iTunes-bridge works
 *
 * @projectname  iTunes-bridge
 * @version 0.7.0-alpha
 * @author AngryKiller
 * @copyright 2019
 * @license Apache-2.0
 *
 */

var iTunes = require('./src/itunes-bridge');

// We load the iTunes-bridge emitter to receive events
//var iTunesEmitter = iTunes.emitter;

iTunes.currentTrack(function(err, currentTrack){
    if(err){
        throw new Error(err);
    }else {
        switch (currentTrack.playerState) {
            case "playing": {
                var exampleMsg = "iTunes is currently playing " + currentTrack.name + " by " + currentTrack.artist + ' from the album "' + currentTrack.album + '". This song is ' + currentTrack.duration + 's long and will finish in ' + currentTrack.remainingTime + 's';
                //var exampleMsg2 = "You have " + iTunes.getPlaylistCount() + " playlists in your library and " + iTunes.getTrackCount() + " tracks!";
                console.log(exampleMsg);
                //console.log(exampleMsg2);
                break;
            }
            case "paused": {
                var exampleMsg = 'iTunes is currently paused';
                console.log(exampleMsg);
                break;
            }
            case "stopped": {
                var exampleMsg = "iTunes is not playing at the moment.";
                console.log(exampleMsg);
                break;
            }
        }
    }
});

/*
// Do something when iTunes is playing
iTunesEmitter.on('playing', function(type, currentTrack){
    // If it is a paused track that restarts playing
    if(type === "player_state_change") {
        console.log(currentTrack.name + " has been resumed! ");
        // Or if it is a new track
    }else if(type === 'new_track'){
        console.log(currentTrack.name+" is now playing!")
    }
});

// Do something when iTunes is paused
iTunesEmitter.on('paused', function(type, currentTrack){
    console.log(currentTrack.name+" is now paused!");
});
// Do something when iTunes is stopped
iTunesEmitter.on('stopped', function(){
    console.log("iTunes is not longer playing!");
});
 */