

const fs = require('fs');
function readFileJson(file) {
    let data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
};
/**
 * 删除文件夹
 * @param path 
 */
async function deleteFolder(path: string) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach((file,index) => {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

/**
 * 移动文件夹
 * @param from 
 * @param to 
 */
async function renameFile(from: string, to: string) {
    return new Promise((res, rej) => {
        fs.rename(from, to, function(err){ 
            if(err){ 
                rej();
            }else{ 
                res();
            } 
        });
    })
}


function removeFile(path: string) {
    // return new Promise((res, rej) => {
    //     fs.rmdir(path, function(err) {
    //         if(err){
    //             rej();
    //         }else{
    //             res();
    //         }
    //     })
    // })
    if( fs.existsSync(path) ) {
        fs.unlinkSync(path)
    }
}
export default {
    readFileJson,
    renameFile,
    deleteFolder,
    removeFile
}