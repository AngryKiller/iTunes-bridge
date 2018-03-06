// iTunes Bridge 0.1-alpha by AngryKiller.
// GPL-3.0


var applescript = require('run-applescript');
var secToMin = require('sec-to-min'); // This is required for the duration of the track as iTunes returns the duration in seconds.
var exports = module.exports = {};


 exports.getCurrentTrackName = function() {
     return applescript.sync('tell application "iTunes" to set track_name to the name of the current track');
 };
 exports.getCurrentTrackArtist = function() {
     return applescript.sync('tell application "iTunes" to set track_artist to the artist of the current track');
 }
 exports.getCurrentTrackAlbum = function() {
     return applescript.sync('tell application "iTunes" to set track_album to the album of the current track');
 }
 exports.getCurrentTrackDuration = function() {
     var durationInSeconds = applescript.sync('tell application "iTunes" to set track_album to the duration of the current track');
     return secToMin(durationInSeconds);
 }