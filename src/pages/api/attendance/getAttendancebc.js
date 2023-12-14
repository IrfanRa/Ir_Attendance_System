import Web3 from 'web3';
import AttendanceArtifact from '../../../app/public/Attendance.json';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { address } = req.query;
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`));

      const contractABI = AttendanceArtifact.abi;
      const contractAddress = process.env.CONTRACT_ADDRESS;
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const recordCount = await contract.methods.getAttendanceRecordCount(address).call();
      let records = [];
      for (let i = 0; i < recordCount; i++) {
        const record = await contract.methods.attendanceRecords(address, i).call();
        // Convert BigInt to String for serialization
        records.push({
          date: record.date.toString(),
          attended: record.attended
        });
      }

      res.status(200).json(records);
    } catch (error) {
      console.error("Error in contract call:", error);
      res.status(500).json({ message: error.message });
    }
  }
}
