require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mumbai: {
      url: process.env.RPC_MUMBAI,
      accounts: {
        mnemonic: process.env.MNEMONIC_MUMBAI,
      },
    },
  },
  mocha: {
    timeout: 0,
    recursive: true,
    spec: ["test/**/*.test.js"],
  },
};
