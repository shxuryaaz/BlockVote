import React, { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/Voting.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

function VoteCard({ wallet, proposalId, title, options, onVote }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = async () => {
    if (selectedOption === null) {
      alert('Please select an option to vote.');
      return;
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ALCHEMY_RPC);
    const signer = new ethers.Wallet(wallet.privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    try {
      const tx = await contract.vote(proposalId, selectedOption);
      await tx.wait();
      alert('Vote submitted successfully!');
      onVote();
    } catch (error) {
      console.error(error);
      alert('Error submitting vote.');
    }
  };

  return (
    <div>
      <h4>{title}</h4>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option-${proposalId}-${index}`}
            name={`proposal-${proposalId}`}
            value={index}
            onChange={() => setSelectedOption(index)}
          />
          <label htmlFor={`option-${proposalId}-${index}`}>{option}</label>
        </div>
      ))}
      <button onClick={handleVote}>Submit Vote</button>
    </div>
  );
}

export default VoteCard;
