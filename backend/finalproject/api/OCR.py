import cv2
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import os
import pytesseract
import re
import json
import os.path
BASE = os.path.dirname(os.path.abspath(__file__))
from .models import PItem,UPCDatabase
from datatime import date

def UPCCodes(recieptID,user):
    count = 0
    list = []
    exist = []
    temp = '{'
    url = '../reciepts/' + recieptID + '_image.jpg'
    url = os.path.join(BASE, url)
    print(url)
    img = Image.open(url)
    #img = Image.open('receipt.png')
    text = pytesseract.image_to_string(img, lang="eng")
    num = re.findall('\d+', text)
    for value in num:
        if len(value) == 12:
            #list.append(value)
            try:
                code = UPCDatabase.objects.get(upc=value)
                x = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
                newItem = PItem.object.create(name=code.name,user = user,static_id=x,qty=1,exp_date=date.today())
                newItem.save()
            except UPCDatabase.DoesNotExist:
                print('Could not find UPC' + value)



            #r = requests.get("https://www.walmart.com/search/?query=" + value)
            #data = r.json()
            temp += '\'upc\': \'' + value +'\','
    temp += '}'
    #print(list)



    # url = 'https://api.upcitemdb.com/prod/trial/lookup'
    # payload = {'upc': '004000049847','upc': '004000049847','upc': '004000049847','upc': '004000049847'}
    # r = requests.post("https://api.upcitemdb.com/prod/trial/lookup", data=json.dumps(temp))
    # data = r.json()
    # print(data)
    # for x in data['items']:
    #     if data["code"] == "OK":
    #         pitem = PItem.objects.create(
    #             static_id=id,
    #             name=x['title'],
    #             qty=1,
    #             exp_date=date.today(),
    #             user=self.request.user
    #         )
    #         pitem.save()
    #         return
