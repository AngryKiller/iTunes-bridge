// iTunes Bridge 0.1.8-alpha by AngryKiller.
// GPL-3.0


var applescript = require('run-applescript');
var secToMin = require('sec-to-min'); // This is required for the duration of the track as iTunes returns the duration in seconds.
var exports = module.exports = {};


 exports.getCurrentTrackName = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the name of the current track');
     }catch(err){
         return null;
     }
 };
 exports.getCurrentTrackArtist = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the artist of the current track');
     }catch(err){
         return null;
     }
 };
 exports.getCurrentTrackAlbum = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the album of the current track');
     }catch(err){
         return null;
     }
 };
 exports.getCurrentTrackDuration = function() {
     try {
         var durationInSeconds = applescript.sync('tell application "iTunes" to get the duration of the current track');
         return secToMin(durationInSeconds);
     }catch(err){
         return null;
     }
 };
 exports.getCurrentTrackElapsedTime = function() {
     try {
         var elapsedTimeInSeconds = applescript.sync('tell application "iTunes" to get the player position');
         return secToMin(elapsedTimeInSeconds);
     }catch(err){
         return null;
     }
 };
 exports.getCurrentTrackRemainingTime = function() {
     try {
         var durationInSeconds = applescript.sync('tell application "iTunes" to get the duration of the current track');
         var elapsedTimeInSeconds = applescript.sync('tell application "iTunes" to get the player position');
         var remainingTime = durationInSeconds - elapsedTimeInSeconds;
         return secToMin(remainingTime);
     }catch(err){
         return null;
     }
 };
exports.getCurrentTrackElapsedSeconds = function() {
    try {
        var elapsedTimeInSeconds = applescript.sync('tell application "iTunes" to get the player position');
        return elapsedTimeInSeconds;
    }catch(err){
        return null;
    }
};
 exports.getCurrentTrackRemainingSeconds = function() {
     try {
         var durationInSeconds = applescript.sync('tell application "iTunes" to get the duration of the current track');
         var elapsedTimeInSeconds = applescript.sync('tell application "iTunes" to get the player position');
         return durationInSeconds - elapsedTimeInSeconds;
     }catch(err){
         return null;
     }
};
 exports.getCurrentTrackReleaseYear = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the year of the current track');
     }catch(err){
         return null;
     }
 };
 exports.getCurrentTrackGenre = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the genre of the current track');
     }catch(err){
         return null;
     }
};
 exports.getPlayerState = function() {
     // TODO: Check if iTunes is launched as another check before the AppleScript one
     try {
         return applescript.sync('tell application "iTunes" to get the player state');
     }catch(err){
         return null;
     }
 };
 exports.getPlaylistCount = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the count of playlists');
     }catch(err){
         return null;
     }
 };
// TODO: Supports for arguments in the track count (album, artist, playlist...)
 exports.getTrackCount = function() {
     try {
         return applescript.sync('tell application "iTunes" to get the count of tracks');
     }catch(err){
         return null;
     }
 };
