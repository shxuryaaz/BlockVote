import { ethers } from "ethers";
import { generateMnemonic, mnemonicToEntropy } from "bip39";

export const generateWallet = () => {
  const mnemonic = generateMnemonic();
  // Use ethers to create wallet from mnemonic
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  const address = wallet.address;
  const privateKey = wallet.privateKey;
  return { mnemonic, address, privateKey };
};
