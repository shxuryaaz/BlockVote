// In scripts/testCreateProposal.js

const hre = require("hardhat");

async function main() {
  const [admin] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Voting", "YOUR_CONTRACT_ADDRESS");

  const tx = await contract.createProposal("Test Question", ["Option A", "Option B"]);
  await tx.wait();

  console.log("Proposal created.");
}

main().catch(console.error);
