require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const ACCOUNT = process.env.ACCOUNT
const ALFAJORES_RPC_URL = process.env.ALFAJORES_RPC_URL

module.exports = {
  solidity: "0.8.2",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [ACCOUNT],
    },
    alfajores: {
      url: ALFAJORES_RPC_URL,
      accounts: [ACCOUNT]
    }
  }
};
