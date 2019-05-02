// var TestContract=artifacts.require ("./TestContract.sol");
var CryptoRoulette=artifacts.require("CryptoRoulette");


module.exports = function(deployer) {
      // deployer.deploy(TestContract);
      deployer.deploy(CryptoRoulette);
}