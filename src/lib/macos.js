const osa = require('osa');

exports = module.exports = {};


exports.currentTrack = function(callback){
    osa(function(){
            var iTunes = Application('iTunes');
            const currentTrack = iTunes.currentTrack;
            try {
                const remainingTime = parseInt(currentTrack.duration() - iTunes.playerPosition());
                const json = {
                    "name": currentTrack.name(),
                    "artist": currentTrack.artist(),
                    "album": currentTrack.album(),
                    "mediaKind": currentTrack.mediaKind(),
                    "duration": parseInt(currentTrack.duration()),
                    "elapsedTime": parseInt(iTunes.playerPosition()),
                    "remainingTime": remainingTime,
                    "genre": currentTrack.genre(),
                    "releaseYear": currentTrack.year(),
                    "id": currentTrack.id(),
                    "playerState": iTunes.playerState()
                };
                return json;
            } catch (e) {
                return {"playerState": "stopped"};
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                callback(null, res);
            }
        }
    )
};

exports.play = function(callback){
    osa(function(){
        var iTunes = Application('iTunes');
        iTunes.play();
    }, function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
};

exports.pause = function(callback){
    osa(function(){
        var iTunes = Application('iTunes');
        iTunes.pause();
    }, function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
};

exports.stop = function(callback){
    osa(function(){
        var iTunes = Application('iTunes');
        iTunes.stop();
    }, function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
};