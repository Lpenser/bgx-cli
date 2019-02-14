"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const git_clone_1 = require("@lpenser/git-clone");
const ora = require("ora");
function downloadTemplate(template, templateDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora('正在初始化项目').start();
        const downloadUrl = template.replace(/(?<!http:\/?)\//, ':');
        yield git_clone_1.default(downloadUrl, templateDir, {}, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                yield spinner.stop();
                if (err) {
                    console.log('Failed to download repo ' + template + ': ' + err.message.trim());
                }
            });
        });
    });
}
exports.default = downloadTemplate;
