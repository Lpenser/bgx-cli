import chalk from 'chalk';
export function error(info: string) {
    console.log(chalk.red(info));
}
export function warning(message: string) {
    console.warn(chalk.yellow(`${message}`));
}
export function log(info: string, color = 'green') {
    console.log(chalk.blue(`${chalk[color](info)}`));
}


