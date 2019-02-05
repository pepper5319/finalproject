
import numpy as np
import os
import cv2
import glob
import shutil
import pytesseract
import re
import time
import argparse
from statistics import mode
import cv2
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import argparse
import cv2

regex = r"P\d{17}"
found = {}
results = {}
queue = []
done = []
missing = []
pnr_area = [150, 450, 1600, 1150]  # [start_x, start_y, end_x, end_y]


def get_string(img_path):
	img = "test"
	# Read image using opencv
	#response = requests.get('https://files.schuminweb.com/journal/2016/full-size/walmart-receipt.png')
	#img = Image.open(BytesIO(response.content))
	img = Image.open("./Receipt.png")

	#img = cv2.imread(img_path)
	print(img)

	output_dir = 'output'
	# Extract the file name without the file extension
	file_name = os.path.basename(img_path).split('.')[0]
	file_name = file_name.split()[0]
	# Create a directory for outputs
	output_path = os.path.join(output_dir, file_name)
	if not os.path.exists(output_path):
		os.makedirs(output_path)

	img = cv2.resize(img, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_CUBIC)
	return

	# Convert to gray
	img = cv2.cvtColor(img, cv2.UMat)

	# Apply dilation and erosion to remove some noise
	kernel = np.ones((1, 1), np.uint8)
	img = cv2.dilate(img, kernel, iterations=1)
	img = cv2.erode(img, kernel, iterations=1)
	# Apply blur to smooth out the edges
	img = cv2.GaussianBlur(img, (5, 5), 0)

	img = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

	# Save the filtered image in the output directory
	save_path = os.path.join(output_path, file_name + "_filter_" + str(method) + ".jpg")
	cv2.imwrite(save_path, img)

	# Recognize text with tesseract for python
	result = pytesseract.image_to_string(img, lang="eng")
	print(result)
	return result


get_string('./Receipt.png⁩')
