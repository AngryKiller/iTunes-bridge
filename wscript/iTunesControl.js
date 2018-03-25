var iTunesApp = WScript.CreateObject("iTunes.Application");


switch(WScript.arguments(0)){
    case "play":{
        iTunesApp.play();
        break;
    }
    case "pause":{
        iTunesApp.pause();
        break;
    }
}