/**
 * This JavaScript file contains the magic, once again...
 *
 * iTunes-bridge
 * @author AngryKiller
 * @version 0.7.0-alpha
 * @copyright 2019
 * @license Apache-2.0
 *
 */


let lib;

if(process.platform === "darwin"){
     lib = require('./lib/macos');
}else if(process.platform === "win32"){
     lib = require('./lib/win');
}else{
    console.log("Sorry, but that library cannot be used on this operating system due to the absence of the iTunes software.");
    process.abort();
}


exports = module.exports = {};

/**
 * Callback for currentTrack method.
 *
 * @callback currentTrackCallback
 * @param {Error} err - The error log is there is any
 * @param {Object} res - The result
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

/** Get informations about the current playing track
 * @param {currentTrackCallback} callback called when done
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
exports.currentTrack = function(callback){
    lib.currentTrack(function(err, res){
        if(callback) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, res);
            }
        }else{
            // TODO: send an event containing the currentTrack info and player state
        }
    })
};

/** Callback for play method
 * @callback playCallback
 * @param {Error} err - The error log is there is any
 */
/** Starts playing the current track
 *
 * @param {playCallback} callback called when done
 */
exports.play = function(callback){
  lib.play(function(err){
      if(callback) {
          if(err){
              callback(err);
          }else{
              callback(null);
          }
      }else{
          // TODO: send an event
      }
  })
};

/** Callback for play method
 * @callback pauseCallback
 * @param {Error} err - The error log is there is any
 */
/** Pauses the current track
 *
 * @param {pauseCallback} callback called when done
 */
exports.pause = function(callback){
    lib.pause(function(err){
        if(callback) {
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        }else{
            // TODO: send an event
        }
    })
};

/** Callback for play method
 * @callback stopCallback
 * @param {Error} err - The error log is there is any
 */
/** Stops the current track
 *
 * @param {stopCallback} callback called when done
 */
exports.stop = function(callback){
    lib.stop(function(err){
        if(callback) {
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        }else{
            // TODO: send an event
        }
    })
};