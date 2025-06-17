import React from "react";

function Login({ loginHandler, connectMetaMask }) {
  return (
    <div className="flex flex-col space-y-4 max-w-xs mx-auto mt-20">
      <button
        onClick={loginHandler}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Login with Gmail
      </button>

      <button
        onClick={connectMetaMask}
        className="bg-yellow-600 text-black px-6 py-3 rounded hover:bg-yellow-700 transition"
      >
        Connect MetaMask Wallet
      </button>
    </div>
  );
}

export default Login;
