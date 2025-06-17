// scripts/checkAdmin.js
const { ethers } = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x9036C14ddd303E000CF0c149180Ae7440B98B42A"; // your deployed contract

  const Voting = await ethers.getContractAt("Voting", CONTRACT_ADDRESS);
  const admin = await Voting.admin();

  console.log("🛡️ Contract admin address is:", admin);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
