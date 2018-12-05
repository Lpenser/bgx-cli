"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function isFileNameValid(filename) {
    return /\/|\|<|>|\*|\?/.test(filename);
}
exports.isFileNameValid = isFileNameValid;
function isFileNameExcessLimit(filename) {
    return filename.length > 255;
}
exports.isFileNameExcessLimit = isFileNameExcessLimit;
function isFileNameNameRep(filename) {
    const path = process.cwd();
    let files = fs.readdirSync(path);
    return files.some(f_name => f_name === filename);
}
exports.isFileNameNameRep = isFileNameNameRep;
function isFileNameStat(file) {
    return fs.statSync(file);
}
exports.isFileNameStat = isFileNameStat;
