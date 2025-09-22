#!/bin/bash
apt-get update && apt-get install -y python3 python3-pip
cd rasa_backend
python3 -m pip install -r requirements.txt
python3 -m rasa run --enable-api --cors "*" --interface 0.0.0.0 --port $PORT --model models/current-model.tar.gz --log-level INFO
