#!/bin/bash
rasa run --enable-api --cors "*" --interface 0.0.0.0 --port ${PORT:-8000} --model models/current-model.tar.gz
# Note: we specify the model path here so it works on platforms like Railway
# that set $PORT for you. You can also hardcode a port if you prefer.   