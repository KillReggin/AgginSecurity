FROM python:3.9-slim

# Устанавливаем необходимые зависимости
RUN apt-get update && apt-get install -y curl

# Копируем ваш код в контейнер
COPY . /app

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем Python-зависимости
RUN pip install -r requirements.txt

# Скрипт для загрузки модели
RUN echo 'import requests; file_id = "1-U_INcMtFT2nRy5b0fG7qy6gP_iU-flP"; url = f"https://drive.google.com/uc?id={file_id}&export=download"; response = requests.get(url); with open("model.safetensors", "wb") as f: f.write(response.content)' > download_model.py

# Задаем команду для старта контейнера
CMD ["python", "download_model.py", "&&", "python", "your_application.py"]