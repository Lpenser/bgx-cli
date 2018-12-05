"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const commander = require("commander");
const logs_1 = require("../utils/logs");
const init_1 = require("../commands/init");
const add_1 = require("../commands/add");
const commanders = ['init', 'add'];
class Command {
    constructor() {
        this.commander = commander;
    }
    init() {
        this.commander
            .command('init')
            .description('project initialization')
            .alias('i')
            .action(options => {
            new init_1.default().run();
        });
    }
    add() {
        this.commander
            .command('add')
            .description('project initialization')
            .alias('a')
            .action(options => {
            new add_1.default().run();
        });
    }
    options() {
        const pkg = require(path.resolve(__dirname, '../../package.json'));
        this.commander.version(pkg.version, '-v, --version');
    }
    parse() {
        this.commander.parse(process.argv);
    }
    command() {
        commanders.forEach(item => {
            if (this[item]) {
                this[item].apply(this);
            }
            else {
                logs_1.error(`该指令 [${item}] 不存在!`);
            }
        });
    }
    run() {
        this.options();
        this.command();
        this.parse();
        if (!this.commander.args.length) {
            this.commander.help();
        }
    }
}
exports.default = Command;
