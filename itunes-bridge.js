/**
 * This JavaScript file contains the magic.
 *
 * @projectname  iTunes-bridge
 * @version 0.6.1-beta
 * @author AngryKiller
 * @copyright 2018
 * @license GPL-3.0
 *
 */
var exports = module.exports = {};
var fs = require('fs');
var {execSync} = require('child_process');
var events = require('events');
var event = new events.EventEmitter();
var plist = require('plist');
var path = require('path');
var electron = require('electron-util/node');


var that = this;

/** Get informations about the current playing track
 * @returns {object}
 * @example {"name":"Business",
  "artist":"Eminem",
  "album":"The Eminem Show (Explicit Version)",
  "mediaKind":"song",
  "duration":251,
  "elapsedTime":2,
  "remainingTime":249,
  "genre":"Rap/Hip Hop",
  "releaseYear":2002,
  "id":2630,
  "playerState":"playing"}
 */
exports.getCurrentTrack = function () {
    if (exports.isRunning()) {
        try {
            return runScript('getCurrentTrack', 'fetch', true);
        } catch (e) {
            console.log(e);
        }
    } else {
        return {playerState: "stopped"};
    }
};
/**
 * Get the player state
 * @returns {string} - Possible values: playing, stopped or paused
 * @example "playing"
 */
exports.getPlayerState = function() {
    if (exports.isRunning()) {
        try {
            return runScript('getPlayerState', 'fetch', false);
        } catch (e) {
            console.log(e);
        }
    } else {
        return "stopped";
    }
};
/**
 * Tells iTunes to play
 */
exports.play = function (song) {
    runScript('play', 'control');
};
/**
 * Tells iTunes to pause
 */
exports.pause = function (){
    runScript('pause', 'control');
};
/**
 * Gets informations about a track from the library
 * @param {int} id - The id of the track
 * @param {string} libPath - The path of the iTunes library
 * @returns {object}
 * @example  { 'Track ID': 1428,
     Size: 9019045,
     'Total Time': 217103,
     'Disc Number': 1,
     'Disc Count': 1,
     'Track Number': 14,
     'Track Count': 16,
     Year: 2011,
     BPM: 99,
     'Date Modified': 2018-03-18T22:37:46.000Z,
     'Date Added': 2018-03-24T14:03:15.000Z,
     'Bit Rate': 320,
     'Sample Rate': 44100,
     'Play Count': 3,
     'Play Date': 3604816264,
     'Play Date UTC': 2018-03-25T07:51:04.000Z,
     'Artwork Count': 1,
     'Persistent ID': '535F1580FAEB42E4',
     'Track Type': 'File',
     'File Folder Count': 5,
     'Library Folder Count': 1,
     Name: 'Ils sont cools',
     Artist: 'Orelsan, Gringe',
     'Album Artist': 'Orelsan',
     Album: 'Le chant des sirènes',
     Genre: 'Rap/Hip Hop',
     Kind: 'Fichier audio MPEG',
     'Sort Album': 'chant des sirènes',
     Location: 'file:///Users/steve/Music/iTunes/iTunes%20Media/Music/Orelsan/Le%20chant%20des%20sire%CC%80nes/14%20Ils%20sont%20cools.mp3' }
 */
exports.getTrack = function(id, libPath) {
    try {
        var obj = plist.parse(fs.readFileSync(libPath, 'utf8'));
        return obj.Tracks[id];
    }catch(err){
        return "not_found";
    }
};
/**
 * Gets the playlist count from the library
 *
 * @param {string} libPath - The path of the iTunes library
 * @returns {int}
 */
exports.getPlaylistCount = function (libPath) {
    try {
        var obj = plist.parse(fs.readFileSync(libPath, 'utf8'));
        return Object.keys(obj.Playlists).length;
    } catch (err) {
        return null;
    }
};
// TODO: Support for arguments in the track count (album, artist, playlist...)
/**
 * Gets the track count from the library
 * @param {string} libPath
 * @returns {int}
 */
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
        /**
         * Emits a playing event
         *
         * @fires iTunes-bridge#playing
         */
        if (currentTrack.id !== that.currentTrack.id && currentTrack.playerState === "playing") {
            that.currentTrack = currentTrack;
            /**
             * Playing event
             *
             * @event iTunes-bridge#playing
             * @type {object}
             * @property {string} type - Indicates whenever the player has been resumed or this is a new track being played.
             * @property {object} currentTrack - Gives the current track
             */
            event.emit('playing', 'new_track', currentTrack);
        }
        /**
         * Emits a paused event
         *
         * @fires iTunes-bridge#paused
         */
        else if (currentTrack.id !== that.currentTrack.id && currentTrack.playerState === "paused") {
            that.currentTrack = currentTrack;
            /**
             * Paused event
             *
             * @event iTunes-bridge#paused
             * @type {object}
             * @property {string} type - Indicates whenever the player has been resumed or this is a new track being played.
             * @property {object} currentTrack - Gives the current track
             */
            event.emit('paused', 'new_track', currentTrack);
        }
        /**
         * Emits a stopped event
         *
         * @fires iTunes-bridge#stopped
         */
        else if (currentTrack.id !== that.currentTrack.id && currentTrack.playerState === "stopped") {
            that.currentTrack = {"playerState": "stopped"};
            /**
             * Stopped event.
             *
             * @event iTunes-bridge#stopped
             * @type {object}
             */
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
}, 1500);

exports.emitter = event;

/**
 * Function to know if iTunes is running
 * @returns {boolean} - true or false
 */
exports.isRunning = function() {
    if(process.platform === "darwin") {
        try {
            execSync('pgrep -x "iTunes"');
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
};

function runScript(req, type, isJson) {
    if (process.platform === "darwin") {
        if(electron.isElectron){
            var iTunesCtrlScpt  = electron.fixPathForAsarUnpack(path.join(__dirname, '/jxa/iTunesControl.js'));
            var iTunesFetcherScpt  = electron.fixPathForAsarUnpack(path.join(__dirname, '/jxa/iTunesFetcher.js'));
        }else{
            var iTunesCtrlScpt  = path.join(__dirname, '/jxa/iTunesControl.js');
            var iTunesFetcherScpt  = path.join(__dirname, '/jxa/iTunesFetcher.js');

        }
        switch(type){
            case "fetch": {
                if(isJson) {
                    return JSON.parse(execSync('osascript ' +iTunesFetcherScpt+' '  + req));
                }else{
                    return execSync('osascript ' +iTunesFetcherScpt+' ' + req);
                }
                break;
            }
            case "control": {
                try {
                    execSync('osascript '+iTunesCtrlScpt+' ' + req);
                }catch(e){
                    console.error(e);
                }
                break;
            }
        }
    } else if (process.platform === "win32") {
        if(electron.isElectron){
            var iTunesCtrlScpt  = electron.fixPathForAsarUnpack(path.join(__dirname, '/wscript/iTunesControl.js'));
            var iTunesFetcherScpt  = electron.fixPathForAsarUnpack(path.join(__dirname, '/wscript/iTunesFetcher.js'));
        }else{
            var iTunesCtrlScpt  = path.join(__dirname, '/wscript/iTunesControl.js');
            var iTunesFetcherScpt  = path.join(__dirname, '/wscript/iTunesFetcher.js');

        }
        switch(type){
            case "fetch": {
                if(isJson) {
                    return JSON.parse(execSync('cscript //Nologo ' + iTunesFetcherScpt + ' ' + req));
                }else{
                    return execSync('cscript //Nologo ' + iTunesFetcherScpt+' ' + req);
                }
                break;
            }
            case "control": {
                try {
                    execSync('cscript //Nologo '+ iTunesCtrlScpt+' ' + req);
                }catch(e){
                    console.error(e);
                }
                break;
            }
        }
    }

}

