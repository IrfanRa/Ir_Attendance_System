import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import AttendanceArtifact from '../../../app/public/Attendance.json';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const provider = new HDWalletProvider(
        process.env.MNEMONIC, // The mnemonic or private key to sign transactions
        `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      );
      const web3 = new Web3(provider);

      const contractABI = AttendanceArtifact.abi;
      const contractAddress = process.env.CONTRACT_ADDRESS;
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const { account, attended } = req.body;

      const receipt = await contract.methods.markAttendance(attended).send({ from: account });

      const response = JSON.parse(JSON.stringify(receipt, (_, v) => (typeof v === 'bigint' ? v.toString() : v)));

      res.status(200).json(response);
    } catch (error) {
      console.error('Error in API:', error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
