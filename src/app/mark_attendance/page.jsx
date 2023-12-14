// mark_attendance/page.tsx
"use client";
import { useState } from "react";
import TimeDate from "../components/shared/timeDate";
import ConnectWallet from "../components/shared/ConnectWallet";
import { useRouter } from "next/navigation"; // Corrected from 'next/navigation'

const MarkAttendance = () => {
  const [isPresent, setIsPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  // Student Information
  const [stdId, setStdId] = useState("");
  const [stdName, setStdName] = useState("");
  const [subject, setSubject] = useState("");
  const [account, setAccount] = useState(""); // State to store user's blockchain account
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Function to handle account connection
  const handleAccountConnected = (connectedAccount) => {
    setAccount(connectedAccount);
  };

  // Function to handle marking attendance on the blockchain
  const handleMarkAttendance = async () => {
    if (!account) {
      setMessage("Please connect your MetaMask wallet first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/attendance/markbc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: account,
          student_id: stdId,
          student_name: stdName,
          subject: subject,
          attended: isPresent,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage("Attendance marked successfully on the blockchain.");
        router.push && setTimeout(() => router.push("/profile"), 3000);
      } else {
        throw new Error(responseData.message || "Error in marking attendance on the blockchain.");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      setMessage("Error in marking attendance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-top items-center gap-2 text-xxl text-gray-600 font-bold h-screen m-10">
      <TimeDate />
     <div className="flex flex-col m-10 justify-between items-center">
      <h1 className="text-2xl font-bold m "> Connect Meta-Mask Wallet:</h1>
     <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"><ConnectWallet onConnected={handleAccountConnected} />
</button>
     </div>
      <h2 className="text-2xl font-bold m text-orange-400">Mark Attendance:</h2>

      {/* Student Details */}
      <div className="flex flex-col justify-between items-center gap-2">
        <label>
          Student ID:
          <input
            className="border ml-10"
            type="text"
            value={stdId}
            onChange={(e) => setStdId(e.target.value)}
          />
        </label>
        <label>
          Student Name:
          <input
            className="border ml-4"
            type="text"
            value={stdName}
            onChange={(e) => setStdName(e.target.value)}
          />
        </label>
        <label>
          Subject:
          <input
            className="border ml-16"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
      </div>

      {/* Mark Attendance Section */}
      <div className="flex gap-4 flex-col">
        <label className="text-blue-600">
          Present:
          <input
            className="ml-2"
            type="checkbox"
            checked={isPresent}
            onChange={() => setIsPresent(!isPresent)}
          />
        </label>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleMarkAttendance}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Attendance"}
        </button>

        {message && (
          <p className={message.includes("error") ? "text-red-500" : "text-green-500"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default MarkAttendance;
