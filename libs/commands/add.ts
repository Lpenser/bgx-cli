import * as inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';
import io from '../utils/io';
import angularTpl from './template/angular';
import downloadTemplate from '../utils/down';
import {isFileNameExcessLimit, isFileNameValid, isFileNameStat} from '../utils/validation';
export default class CommandAdd {
    answers = {};
    question = [
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
            validate: (input: string): string | boolean => {
                if (isFileNameExcessLimit(input)) {
                    return '项目名称超过限制';
                }
                if (isFileNameValid((input))) {
                    return '文件命名不能包含\/:*?<>|';
                }
                if (!isFileNameStat('angular.json')) {
                    return '不存在angular.json';
                }
                let angular = io.readFileJson('angular.json');
                if ((Object.keys(angular.projects) as any).includes(input)) {
                    return '文件名重复,请重新输入';
                }
                if (input || input.length) {
                    return true;
                }
            }
        }
        
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
             await this.createAngularPage();
         }
         else if(answers['projectTemplate']==='react'){
            //  await this.createReact();
         }
         else if(answers['projectTemplate']==='react-mobile'){
            //  await this.createReactMobile();
         }
    }

    protected async createAngularPage(){
        const rootDir = path.join(process.cwd(), this.answers['appName']);
        const template = 'http://192.168.1.122:3000:erp-front-project/bang-template';
        await downloadTemplate(template,rootDir+'$');
        await io.renameFile(rootDir+'$/src', rootDir);
        await io.deleteFolder(rootDir+'$');
        this.appendTpl(rootDir, 'angular', this.answers);
    }


    protected appendTpl(path: string, tpl: string, context: object) {
        switch (tpl) {
            case 'angular' :
            this.appendAngular(path, context);
            break;
        }
    }

    private async appendAngular(path: string, context: object) {
        /**** 修改angular.json ****/
        this.modifyAngularJson(path, context);
        /**** 修改tsconfig.app.json ****/
        this.modifyAppJson(path, context);
    }
    private async modifyAngularJson(path: string, context: object) {
        const root = `${path}/../angular.json`;
        const readPath = `${path}/../.angular.json`;
        const appName = context['appName'];
        await io.renameFile(root, readPath);
        let readable = fs.createReadStream(readPath);
        const writable = fs.createWriteStream(root);  
        readable.on('data', (chunk) => {
            let resu;
            let angularTemp = JSON.stringify(angularTpl);
            try{ resu = JSON.parse(chunk.toString())}catch(e){ console.log(e) } ;
            Object.keys(context).forEach(item => {
                angularTemp = angularTemp.replace(new RegExp("<%= "+ item + " %>", 'g' ), context[item]);
            });
            resu['projects'] = {...resu['projects'], ...JSON.parse(angularTemp)};
            resu.defaultProject = appName;
            writable.write(JSON.stringify(resu));
            io.removeFile(readPath);
        });
    }

    private async modifyAppJson(path: string, context: object) {
        const from = `${path}/.tsconfig.app.json`;
        const to = `${path}/tsconfig.app.json`;
        await io.renameFile(to, from);
        let readable = fs.createReadStream( from );
        const writable = fs.createWriteStream(to);   
        readable.on('data', (chunk) => {
            let resu = chunk.toString();
            resu = resu.replace(new RegExp("src", 'g' ), context['appName']);
            writable.write(resu);
            io.removeFile(from);
        });
    }
}