from flask import Flask, request, jsonify,render_template
import torch
from safetensors.torch import load_file
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import os
import requests
# Извлечение ID файла из ссылки
file_id = "1-U_INcMtFT2nRy5b0fG7qy6gP_iU-flP"
url = f"https://drive.google.com/uc?id={file_id}&export=download"
local_model_path = "model.safetensors"

# Проверка, существует ли файл локально перед загрузкой
if not os.path.exists(local_model_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(local_model_path, "wb") as file:
            file.write(response.content)
    else:
        print(f"Не удалось скачать файл. Код статуса: {response.status_code}")
 
app = Flask(__name__, template_folder="templates", static_folder="static")

# Загружаем токенизатор и модель
tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=2)
# Загружаем веса
state_dict = load_file("model.safetensors")
model.load_state_dict(state_dict, strict=False)

# Переводим в режим инференса
model.eval()

@app.route("/")
def index():
    return render_template("index2.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Токенизация
    inputs = tokenizer(text, truncation=True, padding=True, max_length=512, return_tensors="pt")

    # Предсказание
    with torch.no_grad():
        outputs = model(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()

    return jsonify({"confidential": bool(prediction)})  # True, если данные конфиденциальны

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)