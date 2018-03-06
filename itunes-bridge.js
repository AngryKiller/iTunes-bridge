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
 }
 exports.getCurrentTrackAlbum = function() {
     return applescript.sync('tell application "iTunes" to get the album of the current track');
 }
 exports.getCurrentTrackDuration = function() {
     var durationInSeconds = applescript.sync('tell application "iTunes" to get the duration of the current track');
     return secToMin(durationInSeconds);
 }
 exports.getCurrentTrackReleaseYear = function() {
     return applescript.sync('tell application "iTunes" to get the year of the current track');
 }
 exports.getCurrentTrackGenre = function() {
     return applescript.sync('tell application "iTunes" to get the genre of the current track');
}
 exports.getPlayerState = function() {
     // TODO: Check if iTunes is launched as another check before the AppleScript one
     return applescript.sync('tell application "iTunes" to get the player state');
 }
 exports.getPlaylistCount = function() {
     return applescript.sync('tell application "iTunes" to get the count of playlists');
 }
 exports.getTrackCount = function() {
     return applescript.sync('tell application "iTunes" to get the count of tracks');
 }