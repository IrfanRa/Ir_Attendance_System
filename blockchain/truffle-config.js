require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // ... other network configurations

    sepolia: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: "kit genuine arctic lawsuit else girl weapon milk clown extra menu citizen"
        },
        providerOrUrl: `https://sepolia.infura.io/v3/8fff5621225b44e79e27f6a8c5cd4fde`
      }),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    

    // ... other network configurations
  },

  // ... rest of the configuration
};
