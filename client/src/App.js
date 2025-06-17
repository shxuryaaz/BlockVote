// ... imports remain unchanged
import React, { useEffect, useState } from "react";
import { auth, provider, db } from "./firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ethers } from "ethers";
import { generateWallet } from "./wallet";

enableIndexedDbPersistence(db).catch((err) =>
  console.warn("Firestore persistence error:", err.code)
);

function App() {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [walletType, setWalletType] = useState(null); // ✅ new state
  const [ethAddress, setEthAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [createdMnemonic, setCreatedMnemonic] = useState(null);

  const walletsRef = collection(db, "wallets");

  useEffect(() => {
    const tester = document.createElement("div");
    tester.className = "hidden test-tailwind-class";
    document.body.appendChild(tester);
    const isTailwindLoaded = window.getComputedStyle(tester).display === "none";
    if (!isTailwindLoaded) {
      console.warn("⚠️ Tailwind CSS not loaded properly!");
    }
    document.body.removeChild(tester);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setWallet(null);
        setEthAddress(null);
        setEthBalance(null);
        setUserEmail(null);
        setCreatedMnemonic(null);
        setWalletType(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function initMetaMask() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            await handleWalletConnected(accounts[0]);
          }
        } catch (err) {
          console.error("MetaMask auto-connect error:", err);
        }

        window.ethereum.on("accountsChanged", async (accounts) => {
          if (accounts.length === 0) {
            handleMetaMaskLogout();
          } else {
            await handleWalletConnected(accounts[0]);
          }
        });
      }
    }

    initMetaMask();

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  const handleWalletConnected = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const balance = await provider.getBalance(address);
      setWallet(signer);
      setWalletType("metamask"); // ✅ set type
      setEthAddress(address);
      setEthBalance(ethers.utils.formatEther(balance));
      setUserEmail(null);
      setCreatedMnemonic(null);
      setShowWalletPopup(true);
    } catch (err) {
      console.error("MetaMask balance error:", err);
    }
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        await handleWalletConnected(accounts[0]);
      } catch (err) {
        alert("MetaMask connection failed: " + err.message);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      setUser(currentUser);
      setUserEmail(currentUser.email);

      const q = query(walletsRef, where("email", "==", currentUser.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const mnemonic = docData.mnemonic;
        const ethersWallet = ethers.Wallet.fromMnemonic(mnemonic);
        setWallet(ethersWallet);
        setWalletType("bip39"); // ✅ set type
        setEthAddress(ethersWallet.address);
        setEthBalance("0.0");
        setCreatedMnemonic(null);
        console.log("Loaded existing wallet from Firestore:", ethersWallet.address);
      } else {
        const { mnemonic, address } = generateWallet();
        const ethersWallet = ethers.Wallet.fromMnemonic(mnemonic);
        setWallet(ethersWallet);
        setWalletType("bip39"); // ✅ set type
        setEthAddress(address);
        setEthBalance("0.0");
        setCreatedMnemonic(mnemonic);

        await addDoc(walletsRef, {
          email: currentUser.email,
          mnemonic,
          address,
          createdAt: new Date(),
        });
        console.log("Generated & saved new wallet:", address);
      }

      setShowWalletPopup(true);
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setWallet(null);
    setEthAddress(null);
    setEthBalance(null);
    setUserEmail(null);
    setCreatedMnemonic(null);
    setWalletType(null);
  };

  const handleMetaMaskLogout = () => {
    setWallet(null);
    setEthAddress(null);
    setEthBalance(null);
    setUser(null);
    setUserEmail(null);
    setCreatedMnemonic(null);
    setWalletType(null);
  };

  return (
    <>
      {wallet ? (
        <div className="p-4 max-w-5xl mx-auto relative">
          {showWalletPopup && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowWalletPopup(false)}
            >
              <div
                className="bg-white text-black p-6 rounded shadow-lg max-w-sm mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4">Wallet Connected</h2>
                {userEmail && <p className="mb-2"><strong>Email:</strong> {userEmail}</p>}
                <p className="break-all mb-2"><strong>Address:</strong> {ethAddress}</p>
                <p className="mb-4"><strong>Balance:</strong> {ethBalance} ETH</p>
                {createdMnemonic && (
                  <div className="mb-4">
                    <strong>Mnemonic:</strong>
                    <p className="break-all text-sm bg-gray-100 p-2 rounded mt-1">{createdMnemonic}</p>
                  </div>
                )}
                <button
                  onClick={() => setShowWalletPopup(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              {user && (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout (Gmail)
                </button>
              )}
              {!user && ethAddress && (
                <button
                  onClick={handleMetaMaskLogout}
                  className="bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Logout (MetaMask)
                </button>
              )}
            </div>
            <div className="text-right text-sm">
              {userEmail && <div><strong>Email:</strong> {userEmail}</div>}
              <div><strong>Address:</strong> {ethAddress}</div>
              <div><strong>ETH Balance:</strong> {ethBalance} ETH</div>
            </div>
          </div>

          {/* ✅ Pass walletType here */}
          <Dashboard wallet={wallet} walletType={walletType} />
        </div>
      ) : (
        <Login loginHandler={handleLogin} connectMetaMask={connectMetaMask} />
      )}
    </>
  );
}

export default App;
