"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function copyTpl(from, to, context) {
    let readable = fs.createReadStream(from);
    const writable = fs.createWriteStream(to);
    readable.on('data', (chunk) => {
        let resu = chunk.toString();
        Object.keys(context).forEach(item => {
            resu = resu.replace(new RegExp("<%= " + item + " %>", 'g'), context[item]);
        });
        writable.write(resu);
    });
}
exports.default = copyTpl;
