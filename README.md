# iTunes-bridge
A macOS and Windows NodeJS package to control and get informations from iTunes through AppleScript
### Warning: this is an alpha rewrite of iTunes-bridge, you should probably go to the master branch instead
# Documentation
You can find it at [itunes-bridge.js.org](https://itunes-bridge.js.org) (master branch only)

# Example
```js
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

``` 