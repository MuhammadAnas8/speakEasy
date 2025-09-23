#!/bin/bash
pip install -r requirements.txt
rasa run --enable-api --cors "*" --interface 0.0.0.0 --port $PORT --model models/current-model.tar.gz
