from flask import Flask, request, jsonify
import requests
import os
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


url_transcribe = "https://api.spi-tch.com/v1/transcriptions"
url_translate = "https://api.spi-tch.com/v1/translate"
SPITCH_API_KEY = os.getenv("SPITCH_API_KEY")


@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    source_lang = request.form.get("sourceLang", "en")
    target_lang = request.form.get("targetLang", "en")

    audio_file = request.files["audio"]


    headers = {"Authorization": f"Bearer {SPITCH_API_KEY}"}
    files = {"content": (audio_file.filename, audio_file, audio_file.content_type)}
    payload = {
        "model": "legacy",
        "special_words": "",
        "timestamp": "none",
        "language": source_lang,
    }
    

    response = requests.post(url_transcribe, headers=headers, files=files, data=payload)

    if response.status_code != 200:
        return jsonify({
            "error": "Spitch API error",
            "details": response.text
        }), 500

    text_to_translate = response.json().get("text", "")

    if source_lang != target_lang:
        translated_text = translate_text(text_to_translate, source_lang, target_lang)
    elif source_lang == target_lang:
        translated_text = text_to_translate

    return jsonify({
        "translation": translated_text
    })

def translate_text(text, source_lang, target_lang):
    payload = {
    "source": source_lang,
    "target": target_lang,
    "text": text
    }
    headers = {
        "Authorization": f"Bearer {SPITCH_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(url_translate, json=payload, headers=headers)

    return response.json().get("text", "")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
