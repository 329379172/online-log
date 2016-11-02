/**
 * Created by linfeiyang on 16-11-2.
 */

const fs = require('fs');

var readFileAsync = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        });
    });

};

module.exports = {
    readFileAsync: readFileAsync
};