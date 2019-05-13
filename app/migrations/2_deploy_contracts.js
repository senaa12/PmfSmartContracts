var CryptoRoulette=artifacts.require("CryptoRoulette");

const fs = require("fs");
const saveContractAddressPath = "./src/utilities/contractAddress.json";


module.exports = function(deployer) {
      deployer.deploy(CryptoRoulette).then(function(){
            const address = {
                  "address" : CryptoRoulette.address
            };
            fs.writeFile(saveContractAddressPath, JSON.stringify(address), 'utf8', console.error);           
      });
}