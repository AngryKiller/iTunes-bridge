const isCatalina = a.doShellScript("open -Ra iTunes");
if(!isCatalina){
    iTunes = Application('Music');
}else{
    iTunes = Application('iTunes');
}

ObjC.import('Foundation');
const argv = $.NSProcessInfo.processInfo.arguments.js;


function run(argv) {
    switch (argv[0]) {
        case "play": {
            iTunes.play();
            break;
        }
        case "pause": {
            iTunes.pause();
            break;
        }
        case "stop": {
            iTunes.stop();
            break;
        }
    }
}