const dotenv = require('dotenv');
dotenv.config();
const { utils, ethers } = require("ethers");
const fs = require("fs");
const chalk = require("chalk");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");

const defaultNetwork = "localhost"; // "hardhat" for tests
const API = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
const API1 = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const PRIVATE_KEY = process.env.PRIVATEKEY;

module.exports = {
  defaultNetwork,
  networks: {
    localhost: {
      url: "http://localhost:8545", // uses account 0 of the hardhat node to deploy
    },
    mainnet: {
      url: API,
      accounts: [`0xfe0fec840cfc0d687ae949506a40c74095b104a6a999b5055d1336d0baebfc4d`],
    },
    rinkeby: {
      url: API1,
      accounts: [`0xfe0fec840cfc0d687ae949506a40c74095b104a6a999b5055d1336d0baebfc4d`],
    },
    kovan: {
      url: API,
      accounts: [`0xfe0fec840cfc0d687ae949506a40c74095b104a6a999b5055d1336d0baebfc4d`],
    },
    ropsten: {
      url: API,
      accounts: [`0xfe0fec840cfc0d687ae949506a40c74095b104a6a999b5055d1336d0baebfc4d`],
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [`0xfe0fec840cfc0d687ae949506a40c74095b104a6a999b5055d1336d0baebfc4d`],
    },
    bsctestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [`0xfe0fec840cfc0d687ae949506a40c74095b104a6a999b5055d1336d0baebfc4d`],
    },
        polygon: {
      url: `https://polygon-rpc.com/`,
      accounts: [`0xfe0fec840cfc0d687ae949506a40c74095b104a6a999b5055d1336d0baebfc4d`],
    },
    
    bscmainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [`0xfe0fec840cfc0d687ae949506a40c74095b104a6a999b5055d1336d0baebfc4d`],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.4.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
   // apiKey: process.env.ETHERSCAN_RINKEBY,
   //apiKey: process.env.POLYGON_API,

  },
  paths: {
    sources: "./contract",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

task("accounts", "Prints the list of accounts", async () => {
  if (defaultNetwork === "localhost") {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const accounts = await provider.listAccounts();
    for (let i = 0; i < accounts.length; i++) {
      const accountBalance = await provider.getBalance(accounts[i]);
      console.log(
        "📄",
        chalk.cyan(accounts[i]),
        "💸",
        chalk.magenta(utils.formatEther(accountBalance), "ETH")
      );
    }
    console.log("\n");
  } else {
    console.log(
      " ⚠️  This task only runs on JsonRpcProvider running a node at " +
        chalk.magenta("localhost:8545") +
        "\n"
    );
  }
});
