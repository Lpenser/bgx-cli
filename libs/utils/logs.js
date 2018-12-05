"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
function error(info) {
    console.log(chalk_1.default.red(info));
}
exports.error = error;
function warning(message) {
    console.warn(chalk_1.default.yellow(`${message}`));
}
exports.warning = warning;
function log(info, color = 'green') {
    console.log(chalk_1.default.blue(`${chalk_1.default[color](info)}`));
}
exports.log = log;
