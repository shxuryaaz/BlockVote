# Blockchain Voting DApp

A decentralized voting application that allows users to securely vote on proposals using their Ethereum wallets. Built on the Sepolia testnet, the project supports login via both MetaMask and Gmail-based authentication (which generates a BIP39 wallet on the fly). Admin users can create and manage proposals, while all verified users can cast votes with transparency and immutability ensured by smart contracts.

[![Live Site](https://img.shields.io/badge/Live-Netlify-brightgreen?style=flat-square&logo=netlify)](https://truthprevails.netlify.app)
[![Contract: Sepolia](https://img.shields.io/badge/Contract-Sepolia-blueviolet?style=flat-square&logo=ethereum)](https://sepolia.etherscan.io/address/your_contract_address_here)

---

## Overview

This application was developed to demonstrate how blockchain can be used to conduct secure and verifiable voting. Every user is limited to one vote per proposal, ensuring fairness. The admin panel allows for proposal creation and deletion, and all data is stored on-chain, making it tamper-proof.

Key highlights:
- MetaMask and Gmail login options
- Unique BIP39 wallet generation for Gmail users
- Admin-only control for proposal creation and deletion
- Live vote counts with responsive UI
- Deployed using Netlify and Alchemy RPC on the Sepolia testnet

---

## Tech Stack

- **Frontend:** React.js, HTML, CSS (no UI frameworks)
- **Blockchain:** Solidity, Hardhat, Ethers.js
- **Auth & Wallet:** Firebase Authentication, BIP39, MetaMask
- **Deployment:** Netlify (frontend), Alchemy + Sepolia (backend)

---

## Setup Instructions

1. **Clone the repo:**
```bash
git clone https://github.com/your-username/blockchain-voting-dapp.git
cd blockchain-voting-dapp/client
npm install
```

2. **Configure environment variables:**
Create a `.env` file inside the `/client` directory:

```env
# Firebase
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

# Ethereum (Sepolia)
REACT_APP_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/your_key
REACT_APP_CONTRACT_ADDRESS=your_contract_address
```

3. **Start the app locally:**
```bash
npm start
```

4. **Build for production:**
```bash
npm run build
```

---

## Smart Contract Summary

- `createProposal()` – Admin-only; adds a new proposal.
- `vote()` – Public; allows one vote per user per proposal.
- `deleteProposal()` – Admin-only; removes a proposal.
- `getProposal()` – Retrieves full proposal details.
- `hasVoted()` – Verifies if a user has already voted.

---

## Live Application

Check out the deployed app here:  
👉 [truthprevails.netlify.app](https://truthprevails.netlify.app)

---

## Maintainer

**Shaurya Singh**  
[LinkedIn Profile](https://www.linkedin.com/in/shauryasingh28/)

---

## License

MIT License
