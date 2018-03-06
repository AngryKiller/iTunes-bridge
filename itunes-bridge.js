// iTunes Bridge 0.1-alpha by AngryKiller.
// GPL-3.0


var applescript = require('run-applescript');
var secToMin = require('sec-to-min'); // This is required for the duration of the track as iTunes returns the duration in seconds.
var exports = module.exports = {};


 exports.getCurrentTrackName = function() {
     return applescript.sync('tell application "iTunes" to get the name of the current track');
 };
 exports.getCurrentTrackArtist = function() {
     return applescript.sync('tell application "iTunes" to get the artist of the current track');
 };
 exports.getCurrentTrackAlbum = function() {
     return applescript.sync('tell application "iTunes" to get the album of the current track');
 };
 exports.getCurrentTrackDuration = function() {
     var durationInSeconds = applescript.sync('tell application "iTunes" to get the duration of the current track');
     return secToMin(durationInSeconds);
 };
 exports.getCurrentTrackElapsedTime = function() {
     var elapsedTimeInSeconds = applescript.sync('tell application "iTunes" to get the player position');
     return secToMin(elapsedTimeInSeconds);
 };
 exports.getCurrentTrackRemainingTime = function() {
     var durationInSeconds = applescript.sync('tell application "iTunes" to get the duration of the current track');
     var elapsedTimeInSeconds = applescript.sync('tell application "iTunes" to get the player position');
     var remainingTime = durationInSeconds - elapsedTimeInSeconds;
     return secToMin(remainingTime);
 };
exports.getCurrentTrackElapsedSeconds = function() {
    var elapsedTimeInSeconds = applescript.sync('tell application "iTunes" to get the player position');
    return elapsedTimeInSeconds;
};
 exports.getCurrentTrackRemainingSeconds = function() {
     var durationInSeconds = applescript.sync('tell application "iTunes" to get the duration of the current track');
     var elapsedTimeInSeconds = applescript.sync('tell application "iTunes" to get the player position');
     return durationInSeconds - elapsedTimeInSeconds;
};
 exports.getCurrentTrackReleaseYear = function() {
     return applescript.sync('tell application "iTunes" to get the year of the current track');
 };
 exports.getCurrentTrackGenre = function() {
     return applescript.sync('tell application "iTunes" to get the genre of the current track');
};
 exports.getPlayerState = function() {
     // TODO: Check if iTunes is launched as another check before the AppleScript one
     return applescript.sync('tell application "iTunes" to get the player state');
 };
 exports.getPlaylistCount = function() {
     return applescript.sync('tell application "iTunes" to get the count of playlists');
 };
// TODO: Supports for arguments in the track count (album, artist, playlist...)
 exports.getTrackCount = function() {
     return applescript.sync('tell application "iTunes" to get the count of tracks');
 };
