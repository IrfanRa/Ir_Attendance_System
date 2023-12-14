import cv2
import numpy as np
import sys
import os

# Define paths based on the project structure
dataset_path = "fingerprint_dataset/real_data/"

# Accept the image name from command line arguments
image_name = sys.argv[1] if len(sys.argv) > 1 else None

if image_name:
    image_path = os.path.join(dataset_path, image_name)

    # Load the image
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Check if the image was loaded successfully
    if image is not None and image.size != 0:
        # Feature extraction logic

        # Thresholding: Convert the image to binary
        _, binary_image = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)

        # Edge Detection: Use Canny edge detector
        edges = cv2.Canny(image, 100, 200)

        # Visualize the results
        cv2.imshow("Original Image", image)
        cv2.imshow("Binary Image", binary_image)
        cv2.imshow("Edges", edges)

        # Wait for a key press and then close the windows
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    else:
        print("Error: Unable to load or invalid image.")
else:
    print("No image name provided.")
