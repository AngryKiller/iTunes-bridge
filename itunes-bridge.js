// iTunes Bridge 0.4.1-alpha by AngryKiller.
// GPL-3.0

var exports = module.exports = {};
var fs = require('fs');
var {execSync} = require('child_process');
var events = require('events');
var event = new events.EventEmitter();
var plist = require('plist');

var that = this;

exports.getCurrentTrack = function () {
    if (isAppRunning('iTunes')) {
        try {
            return runScript('getCurrentTrack', 'fetch', true);
        } catch (e) {
            console.log(e);
        }
    } else {
        return {playerState: "stopped"};
    }
};
exports.getPlayerState = function() {
    if (isAppRunning('iTunes')) {
        try {
            return runScript('getPlayerState', 'fetch', false);
        } catch (e) {
            console.log(e);
        }
    } else {
        return "stopped";
    }
};

exports.play = function (song) {
    runScript('play', 'control');
};
exports.pause = function (){
    runScript('pause', 'control');
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
        if (currentTrack.id !== that.currentTrack.id && currentTrack.playerState === "playing") {
            that.currentTrack = currentTrack;
            event.emit('playing', 'new_track', currentTrack);
        }else if (currentTrack.id !== that.currentTrack.id && currentTrack.playerState === "paused") {
            that.currentTrack = currentTrack;
            event.emit('paused', 'new_track', currentTrack);
        }else if (currentTrack.id !== that.currentTrack.id && currentTrack.playerState === "stopped") {
            that.currentTrack = {"playerState": "stopped"};
            event.emit('stopped');
        }
        // On player state change
        if (currentTrack.playerState !== that.currentTrack.playerState && currentTrack.id === that.currentTrack.id) {
            that.currentTrack.playerState = currentTrack.playerState;
            event.emit(currentTrack.playerState, 'player_state_change', currentTrack);
        }
    } else {
        that.currentTrack = currentTrack;
    }
}, 1000);

exports.emitter = event;


/*
 * @returns boolean
 */
function isAppRunning(app) {
    if(process.platform === "darwin") {
        try {
            execSync('pgrep -x "' + app + '"');
            return true;
        }
        catch (err) {
            return false;
        }
    }else if(process.platform === "win32"){
        try {
            execSync('CALL isAppRunning.bat');
            return true;
        }
        catch (err) {
            return false;
        }
    }
}

function runScript(req, type, isJson) {
    if (process.platform === "darwin") {
        switch(type){
            case "fetch": {
                if(isJson) {
                    return JSON.parse(execSync('osascript ' + __dirname + '/jxa/iTunesFetcher.js ' + req));
                }else{
                    return execSync('osascript ' + __dirname + '/jxa/iTunesFetcher.js ' + req);
                }
                break;
            }
            case "control": {
                try {
                    execSync('osascript '+__dirname+'/jxa/iTunesControl.js ' + req);
                }catch(e){
                    console.error(e);
                }
                break;
            }
        }
    } else if (process.platform === "win32") {
        switch(type){
            case "fetch": {
                if(isJson) {
                    return JSON.parse(execSync('cscript //Nologo ' + __dirname + '/wscript/iTunesFetcher.js ' + req));
                }else{
                    return execSync('cscript //Nologo ' + __dirname + '/wscript/iTunesFetcher.js ' + req);
                }
                break;
            }
            case "control": {
                try {
                    execSync('cscript //Nologo '+__dirname+'/wscript/iTunesControl.js ' + req);
                }catch(e){
                    console.error(e);
                }
                break;
            }
        }
    }

}
