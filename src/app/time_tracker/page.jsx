"use client"
import React, { useState } from 'react';
import { format } from 'date-fns';

const TimeTracker = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const handleStartTracking = () => {
    setStartTime(new Date());
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    setEndTime(new Date());
    setIsTracking(false);
    // Here you can add logic to record the time or interact with the blockchain
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col h-screen">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-5">Time Tracker</h1>
        <p className="text-gray-700 mb-5">Track your work hours securely using blockchain technology.</p>
        
        {!isTracking ? (
          <button
            onClick={handleStartTracking}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Tracking
          </button>
        ) : (
          <button
            onClick={handleStopTracking}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Stop Tracking
          </button>
        )}

        {startTime && (
          <div className="mt-5">
            <p>Start Time: {format(startTime, 'PPpp')}</p>
            {endTime && <p>End Time: {format(endTime, 'PPpp')}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTracker;
