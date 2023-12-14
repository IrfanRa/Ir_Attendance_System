"use client"
import React, { useState, useEffect } from 'react';

const ViewAttendance = () => {
  const [account, setAccount] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to connect to MetaMask
  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Fetch attendance records for the connected account
  useEffect(() => {
    const fetchRecords = async () => {
      if (account) {
        setLoading(true);
        try {
          const response = await fetch(`/api/attendance/getAttendancebc?address=${account}`);
          const data = await response.json();
          if (Array.isArray(data)){
            setRecords(data);
          } else{
            console.error("Received data isn't an array", data);
            //handle non-array response or set a defualt value
            setRecords([]);
          }
        } catch (error) {
          console.error("Error fetching records:", error);
        }
        setLoading(false);
      }
    };

    fetchRecords();
  }, [account]);

  return (
    <div className=" min-h-screen flex flex-col items-center justify-top text-white m-10">
      <h2 className='text-gray-600 text-3xl mt-5 mb-10 font-bold'>View Attendance Record: </h2>
      {!account && (
        <button 
          onClick={connectWalletHandler}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
        >
          Connect MetaMask Wallet
        </button>
      )}
      {loading && <p>Loading...</p>}
      {!loading && account && (
        <div className="m-4 p-4 bg-blue-700 rounded-lg shadow">
          <h2 className="text-xl mb-3">Attendance Records for: {account}</h2>
          {records.map((record, index) => (
            <div key={index} className=" text-red-300 text-2xl font-bold border-b border-white py-2">
              Date: {new Date(record.date * 1000).toLocaleString()}, Attended: {record.attended ? 'Yes' : 'No'}
            </div>
          ))}
        </div>
      )}
      {!account && <p>Please connect your wallet to view attendance records.</p>}
    </div>
  );
};

export default ViewAttendance;
