import React, { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/Voting.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

function CreateProposal({ wallet, onProposalCreated }) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleCreate = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ALCHEMY_RPC);
    const signer = new ethers.Wallet(wallet.privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    try {
      const tx = await contract.createProposal(title, options);
      await tx.wait();
      alert('Proposal created successfully!');
      setTitle('');
      setOptions(['', '']);
      onProposalCreated();
    } catch (error) {
      console.error(error);
      alert('Error creating proposal.');
    }
  };

  return (
    <div>
      <h3>Create Proposal</h3>
      <input
        type="text"
        placeholder="Proposal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
      <button onClick={addOption}>Add Option</button>
      <button onClick={handleCreate}>Create Proposal</button>
    </div>
  );
}

export default CreateProposal;
