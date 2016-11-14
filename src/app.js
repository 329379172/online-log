
const init = require('./init');

let run = async() => {
    await init();
    require('./main.js');
};

run();