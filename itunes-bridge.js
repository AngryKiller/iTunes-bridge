// iTunes Bridge 0.3.0-alpha by AngryKiller.
// GPL-3.0


var exports = module.exports = {};
var fs = require('fs');
var { execSync } = require('child_process');
var events = require('events');
var event = new events.EventEmitter();
var plist = require('plist');
var runJxa = require('run-jxa');

var that = this;

exports.getCurrentTrack = function(){
    if(isAppRunning('iTunes')){
        try {
            return runJxa.sync(fs.readFileSync('./jxa/getCurrentTrack.js'));
        } catch (e) {
            console.log(e);
        }
    }else{
        return {playerState: "stopped"};
    }
};
exports.getPlaylistCount = function(libPath) {
     try {
         var obj = plist.parse(fs.readFileSync(libPath, 'utf8'));
         return Object.keys(obj.Playlists).length;
     }catch(err){
         return null;
     }
 };
// TODO: Support for arguments in the track count (album, artist, playlist...)
exports.getTrackCount = function(libPath) {
     try {
         var obj = plist.parse(fs.readFileSync(libPath, 'utf8'));
         return Object.keys(obj.Tracks).length;
     }catch(err){
         return null;
     }
 };


that.currentTrack = null;
setInterval(function(){
    var currentTrack = exports.getCurrentTrack();
    if(currentTrack && that.currentTrack){
        // On track change
        if(currentTrack.id !== that.currentTrack.id && currentTrack.playerState === that.currentTrack.playerState && currentTrack.playerState === "playing"){
            that.currentTrack = currentTrack;
            event.emit('playing', currentTrack);
        }else if(currentTrack.id !== that.currentTrack.id && currentTrack.playerState === that.currentTrack.playerState && currentTrack.playerState === "paused"){
            that.currentTrack = currentTrack;
            event.emit('paused', currentTrack);
        }
    }else{
        that.currentTrack = currentTrack;
    }
}, 200);

exports.emitter = event;


 function isAppRunning(app){
     try {
         execSync('pgrep -x "'+app+'"');
         return true;
     }
     catch (err) {
         return false;
     }
 }