import * as path from 'path';
import * as commander from 'commander';

import {error} from '../utils/logs';
import CommandInit from '../commands/init';
import CommandAdd from '../commands/add';
const commanders = ['init', 'add']
     
export default class Command {
    commander: any;
    constructor() {
        this.commander = commander;
    }
    init() {
        this.commander
        .command('init')
        .description('project initialization')
        .alias('i')
        .action(options => {
            new CommandInit().run();
        });
    }
    add() {
        this.commander
        .command('add')
        .description('project initialization')
        .alias('a')
        .action(options => {
            new CommandAdd().run();
        });
    }
    options() {
        const pkg = require(path.resolve(__dirname, '../../package.json'));
        this.commander.version(pkg.version, '-v, --version');
    }
    parse() {
        this.commander.parse(process.argv)
    }
    command() {
        commanders.forEach(item => {
            if (this[item]) {
                this[item].apply(this);
            }else {
                error(`该指令 [${item}] 不存在!`);
            }
        })
    }
    run() {
        this.options();
        this.command();
        this.parse();
        if(!this.commander.args.length){
           this.commander.help()
        }
    }


}