import  download  from '@lpenser/git-clone';
import * as ora  from 'ora';

export default async function downloadTemplate(template, templateDir) {
    const spinner = ora('正在初始化项目').start();
    await download(template, templateDir,{}, async function (err) {
        await  spinner.stop();
        if (err) {
            console.log('Failed to download repo ' + template + ': ' + err.message.trim());
        }
      })
}