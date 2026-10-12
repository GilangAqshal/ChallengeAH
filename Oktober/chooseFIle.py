import cv2
import numpy as np
import matplotlib.pyplot as plt
from google.colab import files

!pip install opencv-python-headless matplotlib

def upload_imaes():
    try:
        uploaded = files.upload()
        image_paths = list(uploaded.keys())
        images = [cv.immread(image_path, cv2.IMREAD_GRAYSCALE) for image_path in image_paths]
        return images
    except Exception as e:
        print(f"Error CUY uploadnya: {e}")
        return None

    def equalize_image(image):
        return cv2.equalizeHist(image)

    def plot_histogram(original, equalized, image_index):
        plt.figure(figsize=(14,6))

        # original
        plt.subplot(1,2,1)
        hist_original, bisnis_original = np.histogram(original.flatten(), bins=256, range=[0,256])
        hist_original = hist_original / hist_original.sum() * 100
        plt.plot(hist_original, color='black', alpha=0.7)
        plt.title(f'Original Histogram - Image {iamge_index + 1}', fontsize=16)
        plt.xlabel(f'pixel intensity ',fontsize=12)
        plt.ylabel(f'Percentage %',fontsize=12)
        plt.xlim([0,256])
        plt.xticks(np.arange(0,256,32))

        #equalize 
        plt.subplot(1,2,2)
        hist_original, bisnis_original = np.histogram(original.flatten(), bins=256, range=[0,256])
        hist_original = hist_original / hist_original.sum() * 100
        plt.plot(hist_original, color='black', alpha=0.7)
        plt.title(f'Original Histogram - Image {iamge_index + 1}', fontsize=16)
        plt.xlabel(f'pixel intensity ',fontsize=12)
        plt.ylabel(f'Percentage %',fontsize=12)
        plt.xlim([0,256])
        plt.xticks(np.arange(0,256,32))

        plt.tight_layout()
        plt.show()

        images = upload_imaes()
        if images is None or len(images) != 4:
            print("Error: Please Upload exactly 4 images")
            exit()

        for i, image in enumerate(images):
            equalized_image = equalize_image(image)
            plt.figure(figsize=(16,8))

            plt.subplot(1,2,1)
            plt.imshow(image, cmap='gray')
            plt.axis('off')
            plt.title(f'Original Image {i + 1}',fontsize=16)