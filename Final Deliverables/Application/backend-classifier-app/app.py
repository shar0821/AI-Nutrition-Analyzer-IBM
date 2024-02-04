from flask import Flask, jsonify, request
import tensorflow as tf
import numpy as np
import base64
from flask_cors import CORS
import requests
import os
import cv2
import json
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

API_KEY = os.environ.get("API_KEY")
# label_file = "static/labels.json"
# modelname = "static/models/nutrition.h5"

model = load_model('.')

# sign_classifier = tf.keras.models.load_model('static/models/nutrition.h5')
res = None

# def predict(data):
#     res = np.array([data])
#     res = res.reshape(res.shape[0], res.shape[1], -1)
#     preds = sign_classifier.predict(res)
#     result = labels[np.argmax(preds[0])]
#     return result

def load_json(filename):
    with open(filename, 'r') as json_file:
        data = json.load(json_file)
    return data

@app.route('/')
def index():
    return "<h1>Hello World</h1>"

@app.route('/api/classify', methods=['GET', 'POST'])
def classify():
    if request.method == 'POST':
        img_string = request.form.get("imageString")

        metadata = img_string[:22]

        index1 = metadata.find('data:image/') + 11
        index2 = metadata.find(';base64')
        
        img_string = img_string[22:]

        with open("Output.txt", "w") as text_file:
            text_file.write(img_string)

        imgData = base64.b64decode(img_string)
        
        filename = 'some_image.png'
        with open(filename, 'wb') as f:
            f.write(imgData)

        # model code
        img=image.load_img("some_image.png",target_size=(64,64))
        x=image.img_to_array(img)
        x=np.expand_dims(x,axis=0)

        pred=np.argmax(model.predict(x), axis=1)
        print("prediction",pred)
        index = ['Apple','Banana','Orange','Pineapple','Watermelon']
        
        result = str(index[pred[0]])
        
        print(result)

        # result = "apple"


        # calorie ninja api hit
        url = "https://calorieninjas.p.rapidapi.com/v1/nutrition"
        querystring = {"query": result}
        headers = {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)
        print("Response: ")
        print(response.text)

        responseText = response.text

        return jsonify(status = 200, fruit=result, listItems = responseText)
    
    return "<h1>Invalid Request</h1>"
        

if __name__ == '__main__':
    app.run(debug=True)
