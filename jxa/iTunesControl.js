const iTunes = Application('iTunes');

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
    }
}