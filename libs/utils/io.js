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
const fs = require('fs');
function readFileJson(file) {
    let data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
}
;
/**
 * 删除文件夹
 * @param path
 */
function deleteFolder(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((file, index) => {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    deleteFolder(curPath);
                }
                else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    });
}
/**
 * 移动文件夹
 * @param from
 * @param to
 */
function renameFile(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            fs.rename(from, to, function (err) {
                if (err) {
                    rej();
                }
                else {
                    res();
                }
            });
        });
    });
}
function removeFile(path) {
    // return new Promise((res, rej) => {
    //     fs.rmdir(path, function(err) {
    //         if(err){
    //             rej();
    //         }else{
    //             res();
    //         }
    //     })
    // })
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}
exports.default = {
    readFileJson,
    renameFile,
    deleteFolder,
    removeFile
};
