import cv2
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import os
import pytesseract
import re
import json


def UPCCodes():
    count = 0
    list = []
    img = Image.open('Receipt.png')
    text = pytesseract.image_to_string(img, lang="eng")
    num = re.findall('\d+', text)
    for value in num:
        if len(value) == 12:
            list.append(value)

    url = 'https://api.upcitemdb.com/prod/trial/lookup'
    payload = {'upc': '052000324860','upc': '052000324860','upc': '052000324860','upc': '052000324860','upc': '052000324860'}
    r = requests.post("https://api.upcitemdb.com/prod/trial/lookup", data=json.dumps(payload))
    data = r.json()
    for x in data['items']:
        if data["code"] == "OK":
            print(x['title'])
            return

UPCCodes()
