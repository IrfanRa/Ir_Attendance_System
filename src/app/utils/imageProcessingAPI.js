// src/app/utils/imageProcessingAPI.js
// file will contain the code necessary to communicate with the Python scripts.

export async function processImage(imageName) {
    try {
      const response = await fetch('/api/processImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageName }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to process image", error);
      throw error;
    }
  }
  