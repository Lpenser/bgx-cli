import * as fs from 'fs';
export function isFileNameValid(filename: string) {
    return /\/|\|<|>|\*|\?/.test(filename);
}
export function isFileNameExcessLimit(filename: string) {
    return filename.length > 255;
}
export function isFileNameNameRep(filename: string) {
    const path = process.cwd();
    let files=fs.readdirSync(path);
    return files.some(f_name => f_name === filename);
}

export function isFileNameStat(file: string) {
    return fs.statSync(file);
}