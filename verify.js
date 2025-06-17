const { Wallet } = require("ethers");

const PRIVATE_KEY = "16ea4a2155bce834ae263e37aaf2ad87b8e60175cea53d085314a240cc909953";

const wallet = new Wallet(PRIVATE_KEY);
console.log("Wallet Address:", wallet.address);
