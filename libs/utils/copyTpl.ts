import * as fs from 'fs';

export default function copyTpl (from: string, to: string, context: object) {
    let readable = fs.createReadStream( from );
    const writable = fs.createWriteStream(to);   
    readable.on('data', (chunk) => {
        let resu = chunk.toString();
        Object.keys(context).forEach(item => {
            resu = resu.replace(new RegExp("<%= "+ item + " %>", 'g' ), context[item]);
        });
        writable.write(resu);
    });
}