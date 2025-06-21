# Blockchain Voting DApp

A decentralized voting platform that enables users to vote securely on proposals using either MetaMask or Gmail authentication. Built with React, Solidity, and Firebase, the application enforces one vote per user and provides admin controls for managing proposals.

---

## Features

- Dual authentication: MetaMask and Gmail (via Firebase Auth)
- BIP39 mnemonic-based wallet generation for Gmail-authenticated users
- Proposal creation and voting on the Ethereum Sepolia testnet
- One vote per user per proposal (enforced on-chain)
- Admin-only ability to create and delete proposals
- Copyable wallet address for ease of use
- Clean, responsive UI with a custom dark mode design

---

## Tech Stack

- **Frontend:** React.js, HTML, CSS, Ethers.js
- **Authentication:** Firebase Authentication (Gmail login), MetaMask
- **Wallet Management:** BIP39-based Ethereum wallet generation
- **Blockchain:** Ethereum Sepolia Testnet, Solidity (Smart Contracts)
- **Build Tools:** CRACO, dotenv, Hardhat

---

## Installation

```bash
git clone https://github.com/your-username/blockchain-voting-dapp.git
cd blockchain-voting-dapp/client
npm install
```

### Environment Configuration

Create a `.env` file inside the `client/` directory and add the following:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

REACT_APP_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/your_alchemy_key
REACT_APP_CONTRACT_ADDRESS=your_smart_contract_address
```

### Run Locally

```bash
npm start
```

### Build for Production

```bash
npm run build
```

---

## Smart Contract Overview

The Solidity smart contract provides the following functionality:

- `createProposal(string question, string[] options)` — Admin-only
- `vote(uint proposalId, uint optionIndex)` — Single vote per proposal
- `deleteProposal(uint proposalId)` — Admin-only
- `getProposal(uint proposalId)` and `getProposalsCount()` — For frontend data
- `hasVoted(uint proposalId, address voter)` — Check vote status

The contract uses `mapping` to enforce single-vote-per-user logic per proposal.

---

## Deployment

- Frontend built using React and deployed via Netlify
- Smart contracts deployed on the Ethereum Sepolia Testnet
- Uses environment variables for secure configuration

---

## Author

Shaurya Singh  
[GitHub](https://github.com/your-username) | [LinkedIn](https://linkedin.com/in/your-profile)

---

## License

This project is licensed under the MIT License.
