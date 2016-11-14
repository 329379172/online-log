
const init = require('./init');

let run = async() => {
    await init();
    let server = require('./main');
    server.listen(3000, () => {
        console.info('app listen 3000 port!');
    });
};

run();