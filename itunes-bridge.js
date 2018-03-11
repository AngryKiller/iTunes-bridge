// iTunes Bridge 0.2.0-alpha by AngryKiller.
// GPL-3.0

// TODO: get library infos from the iTunes xml
var applescript = require('@angrykiller/run-applescript');
var { execSync } = require('child_process');
var exports = module.exports = {};
var path = require('path');
var scptsPath = path.join(__dirname, "./applescript/");

exports.getCurrentTrack = function() {
    var scpt = scptsPath+'getCurrentTrack.applescript';
    try{
        return JSON.parse(applescript.noExecSync(scpt));
    }catch(err){
        return null;
    }

};

 exports.getPlayerState = function() {
     if(isAppRunning("iTunes")) {
         return applescript.sync('tell application "iTunes" to get the player state');
     }else{
         return "not running";
     }
 };
 exports.getPlaylistCount = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the count of playlists');
     }catch(err){
         return null;
     }
 };
// TODO: Support for arguments in the track count (album, artist, playlist...)
 exports.getTrackCount = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the count of tracks');
     }catch(err){
         return null;
     }
 };

 function isAppRunning(app){
     try {
         execSync('pgrep -x "'+app+'"');
         return true;
     }
     catch (err) {
         return false;
     }
 }