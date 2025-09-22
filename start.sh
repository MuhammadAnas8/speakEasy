#!/bin/bash
cd rasa_backend
python3 -m rasa run --enable-api --cors "*" --interface 0.0.0.0 --port $PORT --model models/current-model.tar.gz --log-level INFO
