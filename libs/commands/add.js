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
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const io_1 = require("../utils/io");
const angular_1 = require("./template/angular");
const down_1 = require("../utils/down");
const validation_1 = require("../utils/validation");
class CommandAdd {
    constructor() {
        this.answers = {};
        this.question = [
            {
                type: 'list',
                name: 'projectTemplate',
                required: true,
                message: '请选择需要的项生成目',
                choices: ['angular'],
                default: 'angular'
            },
            {
                type: 'input',
                name: 'appName',
                required: true,
                message: '请输入项目名称',
                default: 'bang-ng-template',
                validate: (input) => {
                    if (validation_1.isFileNameExcessLimit(input)) {
                        return '项目名称超过限制';
                    }
                    if (validation_1.isFileNameValid((input))) {
                        return '文件命名不能包含\/:*?<>|';
                    }
                    if (!validation_1.isFileNameStat('angular.json')) {
                        return '不存在angular.json';
                    }
                    let angular = io_1.default.readFileJson('angular.json');
                    if (Object.keys(angular.projects).includes(input)) {
                        return '文件名重复,请重新输入';
                    }
                    if (input || input.length) {
                        return true;
                    }
                }
            }
        ];
    }
    run() {
        inquirer.prompt(this.question).then(answers => {
            //console.log(answers); // 返回的结果
            this.answers = answers;
            this._writing();
        });
    }
    _writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const { answers } = this;
            if (answers['projectTemplate'] === 'vue') {
                // await  this.createVue();
            }
            else if (answers['projectTemplate'] === 'angular') {
                yield this.createAngularPage();
            }
            else if (answers['projectTemplate'] === 'react') {
                //  await this.createReact();
            }
            else if (answers['projectTemplate'] === 'react-mobile') {
                //  await this.createReactMobile();
            }
        });
    }
    createAngularPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootDir = path.join(process.cwd(), this.answers['appName']);
            const template = 'http://192.168.1.122:3000:erp-front-project/bang-template';
            yield down_1.default(template, rootDir + '$');
            yield io_1.default.renameFile(rootDir + '$/src', rootDir);
            yield io_1.default.deleteFolder(rootDir + '$');
            this.appendTpl(rootDir, 'angular', this.answers);
        });
    }
    appendTpl(path, tpl, context) {
        switch (tpl) {
            case 'angular':
                this.appendAngular(path, context);
                break;
        }
    }
    appendAngular(path, context) {
        return __awaiter(this, void 0, void 0, function* () {
            /**** 修改angular.json ****/
            this.modifyAngularJson(path, context);
            /**** 修改tsconfig.app.json ****/
            this.modifyAppJson(path, context);
        });
    }
    modifyAngularJson(path, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const root = `${path}/../angular.json`;
            const readPath = `${path}/../.angular.json`;
            const appName = context['appName'];
            yield io_1.default.renameFile(root, readPath);
            let readable = fs.createReadStream(readPath);
            const writable = fs.createWriteStream(root);
            readable.on('data', (chunk) => {
                let resu;
                let angularTemp = JSON.stringify(angular_1.default);
                try {
                    resu = JSON.parse(chunk.toString());
                }
                catch (e) {
                    console.log(e);
                }
                ;
                Object.keys(context).forEach(item => {
                    angularTemp = angularTemp.replace(new RegExp("<%= " + item + " %>", 'g'), context[item]);
                });
                resu['projects'] = Object.assign({}, resu['projects'], JSON.parse(angularTemp));
                resu.defaultProject = appName;
                writable.write(JSON.stringify(resu));
                io_1.default.removeFile(readPath);
            });
        });
    }
    modifyAppJson(path, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = `${path}/.tsconfig.app.json`;
            const to = `${path}/tsconfig.app.json`;
            yield io_1.default.renameFile(to, from);
            let readable = fs.createReadStream(from);
            const writable = fs.createWriteStream(to);
            readable.on('data', (chunk) => {
                let resu = chunk.toString();
                resu = resu.replace(new RegExp("src", 'g'), context['appName']);
                writable.write(resu);
                io_1.default.removeFile(from);
            });
        });
    }
}
exports.default = CommandAdd;
