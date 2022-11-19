var {url:ipfsURL} = require("./ipfs.json")
var fs = require("node:fs/promises");
var {readFileSync,writeFileSync} = require("node:fs");
var ntfMet = require("./template/0.json")
const { exec } = require('child_process');
const readline = require("readline-sync");
const institutes = require("./institutes.json")
const { url } = require("node:inspector");
console.log("enterOrgName");
let orgName = String(readline.question());
const create_wallet = async () =>{ 
  if (institutes[orgName] == undefined){
     await exec(`./create_wallet.sh ${orgName}`, function(err, stdout, stderr) {
      // handle err, stdout, stderr
      console.log(err);
      console.log(stdout);
      console.log(stderr);
      console.log(String(readFileSync(`./walletaddr`)));
      institutes[orgName] = readFileSync(`./walletaddr`).toString().trim()
      writeFileSync("./institutes.json",JSON.stringify(institutes))
    });
 
  }else{
    exec(`./set_wallet.sh ${orgName}`, function(err, stdout, stderr) {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    });
  }
}
// const { unlink } = require("node:fs");

var sugar_conf = {
    
        "price": 0,
        "number": 1,
        "gatekeeper": null,
        "creators": [
          {
            "address": "",
            "share": 100
          }
        ],
        "solTreasuryAccount": "",
        "splTokenAccount": null,
        "splToken": null,
        "goLiveDate": "2022-11-19T05:52:34.168178817+00:00",
        "endSettings": null,
        "whitelistMintSettings": null,
        "hiddenSettings": null,
        "freezeTime": null,
        "uploadMethod": "bundlr",
        "retainAuthority": true,
        "isMutable": true,
        "symbol": "CERT",
        "sellerFeeBasisPoints": 0,
        "awsConfig": null,
        "nftStorageAuthToken": null,
        "shdwStorageAccount": null,
        "pinataConfig": null
      }

console.log(ipfsURL);
const clearAssest = async () =>{
    const dir = await fs.readdir("./assets");
    var files_to_be_deleted = [];
    // console.log(dir);
    for  (const dirent of dir)
    files_to_be_deleted.push(`./assets/${dirent}`)
    try
    {await fs.unlink("./cache.json")}
    catch(err){console.log();}

    files_to_be_deleted.forEach( async (element) => {
        await fs.unlink(element);
    });

    
    
}
const setAndMoveToAssest = async () =>{
    ntfMet.symbol = "CERT"
    ntfMet.attributes.push( {"trait_type": "accessory",
            "value": ipfsURL})
    sugar_conf.creators[0].address = institutes[orgName].trim()
    sugar_conf.solTreasuryAccount = institutes[orgName].trim()
    await fs.cp("./template/0.json","./assets/0.json")
    await fs.cp("./template/0.png","./assets/0.png")
    writeFileSync("./config.json",JSON.stringify(sugar_conf))
    writeFileSync("./assets/0.json",JSON.stringify(ntfMet))


}
const mint = async () =>{
  console.log("enterWalletAddr");
  let walletaddr = String(readline.question())
    exec(`./mint.sh ${orgName} ${walletaddr}`, function(err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
      });
  console.log("Minted CERT from "+orgName+"("+ institutes[orgName] +") to "+walletaddr);
}
create_wallet().then(clearAssest).then(setAndMoveToAssest).then(mint) 