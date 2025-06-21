# Blockchain Voting DApp

A decentralized voting platform that enables secure and transparent proposal voting on the Ethereum blockchain. Users can authenticate via MetaMask or Gmail (which generates a BIP39-based Ethereum wallet). Admin users can create and delete proposals. The app runs on the Ethereum Sepolia testnet and features a clean, minimalist UI.

[![Live on Netlify](https://img.shields.io/badge/Live%20Site-Netlify-brightgreen?style=flat-square&logo=netlify)](https://truthprevails.netlify.app)
[![Deployed on Sepolia](https://img.shields.io/badge/Smart%20Contract-Sepolia-blueviolet?style=flat-square&logo=ethereum)](https://sepolia.etherscan.io/address/your_contract_address_here)

---

## Features

- MetaMask and Gmail login support
- BIP39 mnemonic wallet generation for Gmail users
- One vote per user per proposal
- Admin-only proposal creation and deletion
- Copy-to-clipboard wallet address
- Live proposal vote counts
- Clean dark mode interface
- Netlify deployment

---

## Tech Stack

- **Frontend:** React.js, HTML, Vanilla CSS
- **Blockchain:** Solidity, Hardhat, Ethers.js
- **Authentication:** Firebase Auth (Gmail), MetaMask
- **Wallets:** BIP39 + `ethereumjs-wallet`
- **Deployment:** Netlify (Frontend), Alchemy (RPC), Sepolia Testnet

---

## Getting Started

```bash
git clone https://github.com/your-username/blockchain-voting-dapp.git
cd blockchain-voting-dapp/client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
# Firebase
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

# Ethereum
REACT_APP_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/your_key
REACT_APP_CONTRACT_ADDRESS=your_contract_address
```

Run locally:

```bash
npm start
```

Build for production:

```bash
npm run build
```

---

## Smart Contract Functions

- `createProposal(string question, string[] options)`  
  Admin-only; creates a new voting proposal.

- `vote(uint proposalId, uint optionIndex)`  
  Allows a single vote per user per proposal.

- `deleteProposal(uint proposalId)`  
  Admin-only; removes an existing proposal.

- `getProposal(uint proposalId)`  
  Fetches full proposal details.

- `hasVoted(uint proposalId, address voter)`  
  Checks if a user has already voted.

---

## Project Overview

This application implements decentralized governance through on-chain voting, flexible wallet access via MetaMask or BIP39-based mnemonics, and admin-gated smart contract logic. The frontend is built from scratch without UI libraries and is deployed on the Ethereum Sepolia testnet.

---

## Live Project

[https://truthprevails.netlify.app](https://truthprevails.netlify.app)

---

## Author

**Shaurya Singh**  
[LinkedIn](https://www.linkedin.com/in/shauryasingh28/)

---

## License

MIT
