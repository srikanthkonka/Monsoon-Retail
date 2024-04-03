const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://sepolia.infura.io/v3/4cd3b01d134f4f7b9fc9f9888e5893e2`,
          {timeout: 120000},
        ),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  compilers: {
    solc: {
      version: "0.8.9",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
