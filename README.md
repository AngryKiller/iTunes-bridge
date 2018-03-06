# iTunes-bridge
A macOS only NodeJS package to control and get informations from iTunes through AppleScript

### This package is a WIP, a lot of functions will be added in the future and some that are already existing could change
# Documentation
No documentation yet, but you can look at the code of [iTunes-Discord integration](https://github.com/AngryKiller/iTunes-Discord-integration/tree/dev) that is a great example of the usages possible with iTunes-bridge.
There is also an example.js that you can run.

```js
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
}else{ // If iTunes is not playing or paused, we assume that he is stopped

    var exampleMsg = "iTunes is not playing at the moment.";
    console.log(exampleMsg);
}

```
    