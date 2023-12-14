import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const ConnectWallet = ({ onConnected }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.error("Please install MetaMask.");
    }
  }, []);

  const connectWalletHandler = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
      onConnected(accounts[0]);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  return (
    <div>
      <button  onClick={connectWalletHandler}>
        {accounts.length > 0 ? `Connected: ${accounts[0]}` : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
