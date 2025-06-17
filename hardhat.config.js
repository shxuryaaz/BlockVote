require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();  // add this to use .env variables

module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.REACT_APP_ALCHEMY_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
