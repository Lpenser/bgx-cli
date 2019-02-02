import * as inquirer from 'inquirer';
import * as path from 'path';

import copyTpl from '../utils/copyTpl';
import downloadTemplate from '../utils/down';
import {isFileNameExcessLimit, isFileNameValid, isFileNameNameRep} from '../utils/validation';
import config from '../../config/config'
export default class CommandInit {
    answers = {};
    question = [
        {
            type: 'input',
            name: 'appName',
            required: true,
            message: '请输入项目名称',
            validate: (input: string): string|boolean => {
                if (isFileNameExcessLimit(input)) {
                    return '项目名称超过限制';
                }
                if (isFileNameValid((input))) {
                    return '文件命名不能包含\/:*?<>|';
                }
                if (isFileNameNameRep((input))) {
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
            choices: ['angular'], // , 'vue','react','react-mobile'
            default: 'angular'
        },
        {
            type: 'list',
            name: 'gitUrl',
            required: true,
            message: '请选择模板仓库地址',
            choices:  Object.keys(config),
            default: 'ARCH'
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
        // {
        //     type: 'list',
        //     name: 'compiler',
        //     required: true,
        //     message: '请选择包安装工具',
        //     choices: [YARN, NPM],
        //     default: YARN
        // }
    ];
    run() {
        inquirer.prompt(this.question).then(answers => {
            //console.log(answers); // 返回的结果
            this.answers = answers;
            this._writing();
        })
    }
    protected async _writing() {
        const {answers} = this;
        if(answers['projectTemplate']==='vue'){
            // await  this.createVue();
         }
         else if(answers['projectTemplate']==='angular'){
             await this.createAngular();
         }
         else if(answers['projectTemplate']==='react'){
            //  await this.createReact();
         }
         else if(answers['projectTemplate']==='react-mobile'){
            //  await this.createReactMobile();
         }
    }

    protected async createAngular(){
        const rootDir = path.join(process.cwd(), this.answers['appName']);
        const template = config[this.answers['gitUrl']];
        await downloadTemplate(template,rootDir);
        const sourcePackage = `${rootDir}/.gitkeep.json`;
        const destinationPackage = `${rootDir}/package.json`;
        await copyTpl(sourcePackage, destinationPackage, this.answers);
        const sourceAngular = `${rootDir}/.gitkeep-angular.json`;
        const destinationAngularJSON = `${rootDir}/angular.json`;
        copyTpl(sourceAngular, destinationAngularJSON, {appName: this.answers['appName']});
    }
}