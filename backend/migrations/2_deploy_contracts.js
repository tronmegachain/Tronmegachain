var MyContract = artifacts.require("./bankofmegatron.sol");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};
