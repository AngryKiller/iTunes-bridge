var iTunes = Application('iTunes');


var currentTrack = iTunes.currentTrack;
    try {
        var remainingTime = parseInt(currentTrack.duration() - iTunes.playerPosition());
        var json = {
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
}