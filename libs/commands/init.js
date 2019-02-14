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
const copyTpl_1 = require("../utils/copyTpl");
const down_1 = require("../utils/down");
const validation_1 = require("../utils/validation");
const config_1 = require("../../config/config");
class CommandInit {
    constructor() {
        this.answers = {};
        this.question = [
            {
                type: 'input',
                name: 'appName',
                required: true,
                message: '请输入项目名称',
                validate: (input) => {
                    if (validation_1.isFileNameExcessLimit(input)) {
                        return '项目名称超过限制';
                    }
                    if (validation_1.isFileNameValid((input))) {
                        return '文件命名不能包含\/:*?<>|';
                    }
                    if (validation_1.isFileNameNameRep((input))) {
                        return '文件命名重复,请重新命名';
                    }
                    if (input || input.length) {
                        return true;
                    }
                }
            },
            {
                type: 'list',
                name: 'projectTemplate',
                required: true,
                message: '请选择需要创建的项目',
                choices: ['angular'],
                default: 'angular'
            },
            {
                type: 'list',
                name: 'gitUrl',
                required: true,
                message: '请选择模板仓库地址',
                choices: Object.keys(config_1.default).map(value => `${value}(${config_1.default[value]})`),
                filter: function (val) {
                    return val.replace(/\([^)]*\)/, '');
                },
                default: 'ARCH',
            },
            {
                type: 'input',
                name: 'projectDesc',
                message: 'Please input project description:'
            },
            {
                type: 'input',
                name: 'projectMain',
                message: 'Main file (index.js):',
                default: 'index.js'
            },
            {
                type: 'input',
                name: 'projectAuthor',
                message: 'Author (other):',
                default: 'other she'
            },
            {
                type: 'list',
                name: 'projectLicense',
                message: 'Please choose license:',
                choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
            },
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
                yield this.createAngular();
            }
            else if (answers['projectTemplate'] === 'react') {
                //  await this.createReact();
            }
            else if (answers['projectTemplate'] === 'react-mobile') {
                //  await this.createReactMobile();
            }
        });
    }
    createAngular() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootDir = path.join(process.cwd(), this.answers['appName']);
            const template = config_1.default[this.answers['gitUrl']];
            yield down_1.default(template, rootDir);
            const sourcePackage = `${rootDir}/.gitkeep.json`;
            const destinationPackage = `${rootDir}/package.json`;
            yield copyTpl_1.default(sourcePackage, destinationPackage, this.answers);
            const sourceAngular = `${rootDir}/.gitkeep-angular.json`;
            const destinationAngularJSON = `${rootDir}/angular.json`;
            copyTpl_1.default(sourceAngular, destinationAngularJSON, { appName: this.answers['appName'] });
        });
    }
}
exports.default = CommandInit;
