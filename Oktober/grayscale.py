import cv2
import numpy as np
import numpy as np
from google.colab.patches import cv2_imshow
grayImg=cv2.cvtColor(np.array(img),cv2.COLOR_BGR2GRAY)
cv2_imshow(grayImg)