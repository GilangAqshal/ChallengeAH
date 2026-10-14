import cv2
import numpy as np
import matplotlib.pyplot as plt
from google.colab import files

# Install necessary libraries (if not already installed)
# !pip install opencv-python-headless matplotlib

# Function to upload images and handle potential errors
def upload_images():
    try:
        uploaded = files.upload()  # Menggunakan Google Colab untuk upload gambar
        image_paths = list(uploaded.keys())  # Mendapatkan daftar gambar yang diupload
        images = [cv2.imread(image_path, cv2.IMREAD_GRAYSCALE) for image_path in image_paths]  # Membaca gambar
        return images
    except Exception as e:
        print(f"Error uploading images: {e}")
        return None

# Function for histogram equalization (without stretch factor)
def equalize_image(image):
    return cv2.equalizeHist(image)  # Melakukan histogram equalization tanpa stretch factor

# Function to plot histograms with percentages
def plot_histograms(original, equalized, image_index):
    plt.figure(figsize=(14, 6))

    # Original Histogram
    plt.subplot(1, 2, 1)
    hist_original, bins_original = np.histogram(original.flatten(), bins=256, range=[0, 256])
    hist_original = (hist_original / hist_original.sum()) * 100  # Convert to percentage (Diperbaiki)
    plt.plot(hist_original, color='black', alpha=0.7)
    plt.title(f'Original Histogram - Image {image_index + 1}', fontsize=16)
    plt.xlabel('Pixel Intensity', fontsize=12)
    plt.ylabel('Percentage (%)', fontsize=12)
    plt.xlim([0, 256])
    plt.xticks(np.arange(0, 256, 32))  # Adjust x ticks for readability

    # Equalized Histogram
    plt.subplot(1, 2, 2)
    hist_equalized, bins_equalized = np.histogram(equalized.flatten(), bins=256, range=[0, 256])
    hist_equalized = (hist_equalized / hist_equalized.sum()) * 100  # Convert to percentage (Diperbaiki)
    plt.plot(hist_equalized, color='black', alpha=0.7)
    plt.title(f'Equalized Histogram - Image {image_index + 1}', fontsize=16)
    plt.xlabel('Pixel Intensity', fontsize=12)
    plt.ylabel('Percentage (%)', fontsize=12)
    plt.xlim([0, 256])
    plt.xticks(np.arange(0, 256, 32))  # Adjust x ticks for readability

    plt.tight_layout()
    plt.show()

# Upload images or handle errors (memastikan tepat 4 gambar yang diunggah)
images = upload_images()
if images is None or len(images) != 4:
    print("Error: Please upload exactly 4 images.")
else:
    # Display the original and equalized images horizontally and plot histograms
    for i, image in enumerate(images):
        # Perform histogram equalization
        equalized_image = equalize_image(image)  # Hanya menggunakan equalization tanpa contrast stretching

        # Create a horizontal plot with original and equalized images side by side
        plt.figure(figsize=(16, 8))

        # Plot Original Image
        plt.subplot(1, 2, 1)
        plt.imshow(image, cmap='gray')
        plt.title(f'Original Image {i + 1}', fontsize=16)
        plt.axis('off')
        plt.title(f'Equalized Image {i+1}', fontsize=16)

        #Display side-by-side
        plt.tight_layout()
        plt.show()

        #Plot histograms (Corrected spelling from plot_historgrams to plot_histograms)
        plot_histograms(image, equalized_image, i)