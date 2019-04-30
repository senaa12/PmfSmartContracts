var TestContract=artifacts.require ("./TestContract.sol");
var Lottery=artifacts.require("Lottery");


module.exports = function(deployer) {
      // deployer.deploy(TestContract);
      deployer.deploy(Lottery);
}