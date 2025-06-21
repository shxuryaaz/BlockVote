# Blockchain Voting DApp

A decentralized voting application that enables secure and transparent participation in polls using Ethereum smart contracts. Users can log in with MetaMask or Gmail (which creates a secure BIP39-based wallet) and vote on live proposals. Admins have special privileges to create and delete proposals.

[![Live Site](https://img.shields.io/badge/Live-Netlify-brightgreen?style=flat-square&logo=netlify)](https://truthprevails.netlify.app)
[![Contract: Sepolia](https://img.shields.io/badge/Contract-Sepolia-blueviolet?style=flat-square&logo=ethereum)](https://sepolia.etherscan.io/address/0x4B4BB678E24e141362166575548ccC2dc954C8cf)

---

## Overview

This application showcases how blockchain can be used for secure voting with one vote per user per proposal. Votes are recorded immutably on-chain and proposals are managed by an admin through a dedicated interface.

**Features:**
- MetaMask and Gmail-based login
- BIP39 wallet generation for Gmail users
- Proposal creation and deletion (admin-only)
- One-vote-per-user enforcement
- Real-time results display
- Responsive design with dark UI
- Hosted on Netlify, connected to Sepolia via Alchemy

---

## Get Sepolia ETH

To cast a vote or create a proposal, you must have a small amount of Sepolia ETH in your wallet (used to pay for gas fees).

You can get free Sepolia ETH from this faucet:
🔗 [https://sepoliafaucet.com/](https://sepoliafaucet.com/)

---

## Tech Stack

- **Frontend:** React.js, HTML, CSS (no Tailwind or frameworks)
- **Blockchain:** Solidity, Hardhat, Ethers.js
- **Authentication & Wallets:** Firebase Auth, BIP39, MetaMask
- **Deployment:** Netlify (frontend), Alchemy RPC (Sepolia network)

---

## Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/blockchain-voting-dapp.git
cd blockchain-voting-dapp/client
npm install
```

2. **Create a `.env` file in `/client` folder:**
```env
# Firebase
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

# Ethereum
REACT_APP_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/your_key
REACT_APP_CONTRACT_ADDRESS=your_contract_address
```

3. **Start the app:**
```bash
npm start
```

4. **Build for deployment:**
```bash
npm run build
```

---

## Smart Contract Functions

- `createProposal(question, options[])` – Add a new proposal (admin only)
- `vote(proposalId, optionIndex)` – Vote on a proposal (one vote per user)
- `deleteProposal(proposalId)` – Remove an existing proposal (admin only)
- `getProposal(proposalId)` – Fetch details of a proposal
- `hasVoted(proposalId, userAddress)` – Check voting status of a user

---

## Live Demo

Access the full application here:  
[truthprevails.netlify.app](https://truthprevails.netlify.app)

---

## Developed and Mantained by 

**Shaurya Singh**  
[LinkedIn](https://www.linkedin.com/in/shauryasingh28/)


