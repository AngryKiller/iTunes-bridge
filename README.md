# iTunes-bridge
A macOS only NodeJS package to control and get informations from iTunes through AppleScript

### This package is a WIP, a lot of functions will be added in the future and some that are already existing could change
# Documentation
No documentation yet, but you can look at the code of [iTunes-Discord integration](https://github.com/AngryKiller/iTunes-Discord-integration/tree/dev) that is a great example of the usages possible with iTunes-bridge.
There is also an example.js that you can run.

```js

var iTunes = require('./itunes-bridge');
var currentTrack = iTunes.getCurrentTrack();
// We load the iTunes-bridge emitter to receive events
var iTunesEmitter = iTunes.emitter;

switch(currentTrack.playerState){
    case "playing": {
        var exampleMsg = "iTunes is currently playing " + currentTrack.name + " by " + currentTrack.artist + ' from the album "' + currentTrack.album + '". This song is ' + currentTrack.duration + 's long and will finish in ' + currentTrack.remainingTime+'s';
        var exampleMsg2 = "You have " + iTunes.getPlaylistCount('/Users/steve/Music/iTunes/iTunes Library.xml') + " playlists in your library and " + iTunes.getTrackCount('/Users/steve/Music/iTunes/iTunes Library.xml') + " tracks!";
        console.log(exampleMsg);
        console.log(exampleMsg2);
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
};

// Do something when iTunes is playing
iTunesEmitter.on('playing', function(message){
    console.log(message.name+" is now playing!");
});

// Do something when iTunes is paused
iTunesEmitter.on('paused', function(message){
    console.log(message.name+" is now paused!");
});

```
    