import numpy as np
import matplotlib.pyplot as plt
import os
import sys
import cv2


# Define paths based on the project structure
dataset_path = "fingerprint_dataset/real_data/"

# Accept the image name from command line arguments
image_name:str = sys.argv[1] if len(sys.argv) > 1 else None

if image_name:
    image_path = os.path.join(dataset_path, image_name)

    # Load the image
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Check if the image was loaded successfully
    if image is not None and image.size != 0:
        # Pre-processing logic

        # Normalization: Ensure the image has consistent dimensions
        desired_height, desired_width = 160, 160
        image = cv2.resize(image, (desired_width, desired_height))

        # Pre-processing: Apply Gaussian blur
        blurred_image = cv2.GaussianBlur(image, (5, 5), 0)

        # Visualization of Original and Pre-processed Image
        plt.subplot(1, 2, 1)
        plt.title("Original Image")
        plt.imshow(image, cmap="gray")

        plt.subplot(1, 2, 2)
        plt.title("Pre-processed Image")
        plt.imshow(blurred_image, cmap="gray")

        plt.show()

    else:
        print("Error: Unable to load or invalid image.")
else:
    print("No image name provided.")
