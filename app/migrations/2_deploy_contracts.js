var CryptoRoulette=artifacts.require("CryptoRoulette");

const fs = require("fs");
const saveContractAddressPath = "./src/utilities/contractAddress.json";

// value pise u wei jedinicima
module.exports = function(deployer) {
      deployer.deploy(CryptoRoulette, { value: 10000000000000000 }).then(function(){
            const address = {
                  "address" : CryptoRoulette.address
            };
            fs.writeFile(saveContractAddressPath, JSON.stringify(address), 'utf8', console.error);           
      });
}