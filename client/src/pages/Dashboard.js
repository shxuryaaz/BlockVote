import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../abi/Voting.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const ALCHEMY_RPC = process.env.REACT_APP_ALCHEMY_RPC;

function Dashboard({ wallet, walletType }) {
  const [proposals, setProposals] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAddress, setAdminAddress] = useState("");
  const [connectedAddress, setConnectedAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [newProposal, setNewProposal] = useState({ question: "", options: ["", ""] });
  const [viewResults, setViewResults] = useState({});

  const getProvider = () => new ethers.providers.JsonRpcProvider(ALCHEMY_RPC);

  const getSigner = async () => {
    if (walletType === "metamask") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      return provider.getSigner();
    } else {
      const provider = getProvider();
      return new ethers.Wallet(wallet.privateKey, provider);
    }
  };

  const checkAdmin = async () => {
    if (!wallet) return;
    try {
      const provider = getProvider();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const admin = await contract.admin; // contract.admin is a public variable

      // Ensure admin is a string before calling toLowerCase
      if (!admin || typeof admin !== "string") {
        console.error("Admin address is invalid:", admin);
        return;
      }

      setAdminAddress(admin);
      console.log("✅ Contract Admin Address:", admin);

      const address =
        walletType === "metamask"
          ? await (await getSigner()).getAddress()
          : wallet.address;

      setConnectedAddress(address);
      console.log("🔌 Connected Wallet Address:", address);

      setIsAdmin(address.toLowerCase() === admin.toLowerCase());
    } catch (err) {
      console.error("Admin check error:", err);
    }
  };

  const loadProposals = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const provider = getProvider();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const count = await contract.getProposalsCount();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const [question, options, voteCounts] = await contract.getProposal(i);
        temp.push({ question, options, voteCounts, id: i });
      }
      setProposals(temp);
    } catch (err) {
      console.error("Load proposals error:", err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (proposalId, optionIndex) => {
    if (!wallet) return alert("Connect wallet first");
    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const userAddress =
        walletType === "metamask"
          ? await signer.getAddress()
          : wallet.address;

      const alreadyVoted = await contract.hasVotedOn(proposalId, userAddress);
      if (alreadyVoted) return alert("You have already voted on this proposal.");

      const tx = await contract.vote(proposalId, optionIndex);
      await tx.wait();
      alert("Vote successful!");
      loadProposals();
    } catch (err) {
      console.error("Voting error:", err);
      alert("Failed to vote: " + err.message);
    }
  };

  const createProposal = async () => {
    if (!wallet) return alert("Connect wallet first");

    const cleanedOptions = newProposal.options.filter((opt) => opt.trim() !== "");
    if (!newProposal.question.trim() || cleanedOptions.length < 2) {
      return alert("Enter a question and at least two options.");
    }

    try {
      const signer = await getSigner();
      const signerAddress = await signer.getAddress();

      if (typeof adminAddress !== "string" || signerAddress.toLowerCase() !== adminAddress.toLowerCase()) {
        alert("Only the admin can create proposals.");
        return;
      }

      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.createProposal(newProposal.question.trim(), cleanedOptions);
      await tx.wait();
      alert("Proposal created!");
      setNewProposal({ question: "", options: ["", ""] });
      loadProposals();
    } catch (err) {
      console.error("Create proposal error:", err);
      alert("Error creating proposal: " + err.message);
    }
  };

  const toggleResults = (proposalId) => {
    setViewResults((prev) => ({ ...prev, [proposalId]: !prev[proposalId] }));
  };

  useEffect(() => {
    if (wallet) {
      checkAdmin();
      loadProposals();
    }
  }, [wallet]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-indigo-400">🗳 Voting Dashboard</h1>

        <div className="mb-6">
          <p className="mb-1">
            Connected wallet: <span className="font-mono text-green-400">{connectedAddress}</span>
          </p>
          <p className="mb-1">
            Admin wallet: <span className="font-mono text-yellow-400">{adminAddress}</span>
          </p>
          <p className={isAdmin ? "text-green-500" : "text-red-500"}>
            {isAdmin ? "✅ You are Admin" : "❌ You are NOT Admin"}
          </p>
        </div>

        {isAdmin && (
          <div className="mb-10 bg-gray-800 p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-300">🚀 Create New Proposal</h2>
            <input
              type="text"
              placeholder="Proposal Question"
              value={newProposal.question}
              onChange={(e) => setNewProposal({ ...newProposal, question: e.target.value })}
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
            {newProposal.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOpts = [...newProposal.options];
                  newOpts[i] = e.target.value;
                  setNewProposal({ ...newProposal, options: newOpts });
                }}
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
              />
            ))}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  setNewProposal({ ...newProposal, options: [...newProposal.options, ""] })
                }
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              >
                ➕ Add Option
              </button>
              <button
                onClick={createProposal}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                ✅ Create Proposal
              </button>
            </div>
          </div>
        )}

        {loading && <p className="text-gray-400">Loading proposals...</p>}

        {!loading && proposals.length === 0 && <p>No proposals available.</p>}

        {!loading &&
          proposals.map((p) => {
            const totalVotes = p.voteCounts.reduce((sum, c) => sum + parseInt(c.toString()), 0);
            return (
              <div key={p.id} className="mb-8 p-6 bg-gray-800 rounded shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-cyan-300">{p.question}</h3>
                {p.options.map((opt, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b border-gray-700"
                  >
                    <div>{opt}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">
                        {p.voteCounts[i].toString()} votes
                      </span>
                      <button
                        onClick={() => vote(p.id, i)}
                        className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm text-white"
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                ))}
                {isAdmin && (
                  <button
                    onClick={() => toggleResults(p.id)}
                    className="mt-3 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white"
                  >
                    {viewResults[p.id] ? "Hide Results" : "View Results"}
                  </button>
                )}
                {viewResults[p.id] && (
                  <div className="mt-4 bg-gray-700 p-4 rounded">
                    {p.options.map((opt, i) => {
                      const count = parseInt(p.voteCounts[i].toString());
                      const percentage =
                        totalVotes === 0 ? 0 : ((count / totalVotes) * 100).toFixed(1);
                      return (
                        <div key={i} className="mb-1 text-sm">
                          {opt}: <span className="text-green-400">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Dashboard;
