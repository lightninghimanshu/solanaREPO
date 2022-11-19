import fs from 'fs';

import { FileEncrypt } from 'node-file-encrypt';
import randomWordsGenerator from './randomwords.js';
let filePath = '../data/0.jpg'; // source file path
let encryptPath = '../template';
var secret ;

// {   // encrypt file
//     // to FileEncrypt can be passed 4 Arguments
//     // filePath     - the path of the file that should be encrypted
//     // outPath      - this is optional  - the Path for the encrypted file
//     // fileEnding   - this is optional  - a custom fileEnding like '.myFile', default is '.crypt'
//     // cryptFileName - this is optional - boolean if the filename should be hashed, default is true
//     let f = new FileEncrypt(filePath,encryptPath,'.png',false);
//     f.openSourceFile();
//     secret = randomWordsGenerator()
//     f.encrypt(secret);
//     encryptPath = f.encryptFilePath;
//     console.log("encrypt sync done");
//     console.log(secret);
// }

{ // decrypt file
    // fs.unlink(filePath, function() {});
    let f = new FileEncrypt(encryptPath + "/0.png");
    f.openSourceFile();
    f.decrypt(secret);
    console.log("decrypt sync done");
}

// { // get original file name from encrypted file
//     let f = new FileEncrypt(encryptPath);
//     f.openSourceFile();
//     console.log(f.info('111111'));
// }

// { // encrypt & decrypt file async
//     let f = new FileEncrypt(filePath);
//     f.openSourceFile();
//     f.encryptAsync('111111').then(function() {
//         encryptPath = f.encryptFilePath;
//         console.log("encrypt async done");
//         fs.unlink(filePath, function() {});
//         let d = new FileEncrypt(encryptPath);
//         d.openSourceFile();
//         d.decryptAsync('111111').then(function() {
//             console.log("decrypt async done");
//         });
//     });
// }