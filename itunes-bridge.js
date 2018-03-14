// iTunes Bridge 0.3.0-alpha by AngryKiller.
// GPL-3.0

var os = require('os');
if(os.platform() === "darwin") {
    var exports = module.exports = {};
    var fs = require('fs');
    var {execSync} = require('child_process');
    var events = require('events');
    var event = new events.EventEmitter();
    var plist = require('plist');
    var runJxa = require('run-jxa');

    var that = this;

    exports.getCurrentTrack = function () {
        if (isAppRunning('iTunes')) {
            try {
                return runJxa.sync(fs.readFileSync('./jxa/getCurrentTrack.js'));
            } catch (e) {
                console.log(e);
            }
        } else {
            return {playerState: "stopped"};
        }
    };
    exports.play = function (song) {
        runJxa.sync(fs.readFileSync('./jxa/play.js'));
    };
    exports.pause = function (){
        runJxa.sync(fs.readFileSync('./jxa/pause.js'));
    };
    exports.getTrack = function(id, libPath) {
        try {
            var obj = plist.parse(fs.readFileSync(libPath, 'utf8'));
            return obj.Tracks[id];
        }catch(err){
            return "not_found";
        }
    };
    exports.getPlaylistCount = function (libPath) {
        try {
            var obj = plist.parse(fs.readFileSync(libPath, 'utf8'));
            return Object.keys(obj.Playlists).length;
        } catch (err) {
            return null;
        }
    };
// TODO: Support for arguments in the track count (album, artist, playlist...)
    exports.getTrackCount = function (libPath) {
        try {
            var obj = plist.parse(fs.readFileSync(libPath, 'utf8'));
            return Object.keys(obj.Tracks).length;
        } catch (err) {
            return null;
        }
    };

// Starting the event system (track change and player state change)
    that.currentTrack = null;
    setInterval(function () {
        var currentTrack = exports.getCurrentTrack();
        if (currentTrack && that.currentTrack) {
            // On track change
            if (currentTrack.id !== that.currentTrack.id && currentTrack.playerState === that.currentTrack.playerState && currentTrack.playerState === "playing") {
                that.currentTrack = currentTrack;
                event.emit('playing', 'new_track',  currentTrack);
            } else if (currentTrack.id !== that.currentTrack.id && currentTrack.playerState === that.currentTrack.playerState && currentTrack.playerState === "paused") {
                that.currentTrack = currentTrack;
                event.emit('paused', 'new_track', currentTrack);
            }
            // On player state change
            if (currentTrack.playerState !== that.currentTrack.playerState) {
                that.currentTrack.playerState = currentTrack.playerState;
                event.emit(currentTrack.playerState, 'player_state_change', currentTrack);
            }
        } else {
            that.currentTrack = currentTrack;
        }
    }, 1000);

    exports.emitter = event;


    function isAppRunning(app) {
        try {
            execSync('pgrep -x "' + app + '"');
            return true;
        }
        catch (err) {
            return false;
        }
    }
}else if(os.platform() === "win32"){
    console.log("eta son");
}else{
    console.error("iTunes-bridge is not supported on your platform!");
    process.exit();
}