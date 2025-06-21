# Blockchain Voting DApp

A decentralized voting application that enables secure and transparent participation in polls using Ethereum smart contracts. Users can log in with MetaMask or Gmail (which creates a secure BIP39-based wallet) and vote on live proposals. Admins have special privileges to create and delete proposals.

[![Live Site](https://img.shields.io/badge/Live-Netlify-brightgreen?style=flat-square&logo=netlify)](https://truthprevails.netlify.app)
[![Contract: Sepolia](https://img.shields.io/badge/Contract-Sepolia-blueviolet?style=flat-square&logo=ethereum)](https://sepolia.etherscan.io/address/0x4B4BB678E24e141362166575548ccC2dc954C8cf)

---

## Overview

This project demonstrates how blockchain can be utilized to facilitate secure, tamper-proof, and transparent voting. Each user is restricted to a single vote per proposal, with all votes being recorded immutably on the Ethereum blockchain. Admins can create and delete proposals through an on-chain dashboard.

**Status:** Still in active development. UI and contract logic may continue to improve.

---

## Features

- MetaMask and Gmail login integration
- BIP39 wallet generation for Gmail users
- Admin-controlled proposal creation and deletion
- One vote per user per proposal (on-chain enforced)
- Live result display with real-time updates
- Responsive, dark-themed frontend UI
- Netlify-hosted frontend and smart contracts on Sepolia via Alchemy

---

## Screenshots

**Landing Page**  
![Login Page](https://i.ibb.co/zV8RBSf2/login-page.png)

**Admin Dashboard**  
![Admin Dashboard](https://i.ibb.co/DD2sBBg/admin-page.png)

---

## Get Sepolia ETH

In order to vote or create proposals, your wallet must contain Sepolia ETH to cover gas costs.

Get free Sepolia ETH here:  
🔗 [https://cloud.google.com/application/web3/faucet/ethereum/sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

---

## Tech Stack

- **Frontend:** React.js, HTML, CSS (no frameworks)
- **Blockchain:** Solidity, Hardhat, Ethers.js
- **Authentication:** Firebase Auth
- **Wallets:** BIP39 (Gmail-based), MetaMask
- **Deployment:** Netlify (frontend), Alchemy RPC (Sepolia)

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/blockchain-voting-dapp.git
cd blockchain-voting-dapp/client
npm install
```

### 2. Create a `.env` file in `/client` folder
```env
# Firebase
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

# Ethereum
REACT_APP_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/your_key
REACT_APP_CONTRACT_ADDRESS=0x4B4BB678E24e141362166575548ccC2dc954C8cf
```

### 3. Run the project
```bash
npm start
```

### 4. Build for deployment
```bash
npm run build
```

---

## Smart Contract Functions

- `createProposal(string, string[])`: Admin creates a proposal
- `vote(uint, uint)`: User casts vote (once per proposal)
- `deleteProposal(uint)`: Admin deletes a proposal
- `getProposal(uint)`: Returns proposal data
- `hasVoted(uint, address)`: Checks if a user has voted

---

## Live Demo

You can access the deployed application here:  
🔗 [https://truthprevails.netlify.app](https://truthprevails.netlify.app)

---

## Maintained By

**Shaurya Singh**  
[LinkedIn →](https://www.linkedin.com/in/shauryasingh28/)

---

> This project is a work in progress and will continue to be improved.
