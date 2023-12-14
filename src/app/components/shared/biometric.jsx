"use client"
import React from "react";
import { useState } from "react";
import axios from "axios";
import TimeDate from "./timeDate";
const Biometric = () => {
  // Fingerprint Data Images
  const [selectedImage, setSelectedImage] = useState("");
  // Additional states for biometric processing
  const [biometricProcessing, setBiometricProcessing] = useState('');
  const [biometricMessage, setBiometricMessage] = useState("");

  //Biometric handle
  const handleBiometricProcessing = async () => {
    setBiometricProcessing(true);
    setBiometricMessage("Biometric completed successfully");

    try {
      // Send the selected image to the processImage API
       await axios.post("/api/processImage", {
        image: selectedImage,
      });

      // Update message upon successful processing
      setBiometricMessage("Biometric completed successfully");
      router.push && setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Error in biometric processing", error);
      setBiometricMessage("Error in biometric processing");
    } finally {
      setBiometricProcessing(false);
    }
  };

  return (
    <div className="biometric-section m-5 flex flex-col items-center justify-center md:justify-between">
    <TimeDate />

    <h2 className="text-xl md:text-3xl font-bold mt-5">Biometric Processing:</h2>

    {/* Fingerprint Image Selection */}
    <label className="text-orange-400 text-lg m-5 flex flex-col items-center">
      Biometric Fingerprint Authentication:
      <select
        className="text-red-400 m-5"
        value={selectedImage}
        onChange={(e) => setSelectedImage(e.target.value)}
        >
            <option value="">Select Image</option>
            <option value="00000.bmp">Irfan</option>
            <option value="00001.bmp">Mubashar</option>
            <option value="00002.bmp">Tahir</option>
            <option value="00003.bmp">Ali</option>
            <option value="00004.bmp">Rizwan</option>
            <option value="00005.bmp">Shakeel</option>
            <option value="00006.bmp">Fareed</option>
          </select>
        </label>

        {/* Biometric Processing Button */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleBiometricProcessing}
        disabled={biometricProcessing}
      >
        {biometricProcessing ? "Processing..." : "Start Biometric Processing"}
      </button>

      {/* Display Biometric Processing Message */}
      {biometricMessage && (
        <p
          className={
            biometricMessage.includes("Error")
              ? "text-red-500"
              : "text-green-500"
          }
        >
          {biometricMessage}
          </p>
        )}
      </div>
  );
};

export default Biometric;
