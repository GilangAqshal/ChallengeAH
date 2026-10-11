! pip install opencv-python
import os
import numpy as np
import matplotlib.pyplot as plt
import cv2

from skimage import data
from skimage.io import imread_collection
from skimage.color import rgb2gray

from google.colab.patches import cv2_imshow
img=cv2.imread('pinky.jpg', cv2.IMREAD_UNCHANGED)
cv2_imshow(img)

grayImg=cv2.cvtColor(np.array(img),cv2.COLOR_BGR2GRAY)
cv2_imshow(grayImg)

kernel = np.array([[-1,0,-1], [0,4,0], [-1,0,-1]])
citraOutput=cv2.filter2D(grayImg, -1,kernel)

fig,axes=plt.subplots(1,2,figsize=(12,12))
ax=axes.ravel()

ax[0].imshow(grayImg, cmap='gray')
ax[0].set_title('citra asli')
ax[1].imshow(citraOutput, cmap='gray')
ax[0].set_title("Citra Konvulasi")

kernel_sketsa = np.array([
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
])
indiraOutput=cv2.filter2D(grayImg, -1,kernel)

fig,axes=plt.subplots(1,2,figsize=(12,6))
ax=axes.ravel()

ax[0].imshow(grayImg, cmap='gray')
ax[0].set_title('Indira Asli')
ax[0].axis('off')


ax[1].imshow(indiraOutput, cmap='gray')
ax[1].set_title("Indira Konvolusi (Efek Sketsa)")
ax[1].axis('off')

plt.tight_layout()
plt.show()