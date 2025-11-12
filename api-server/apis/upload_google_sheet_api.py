from flask import Blueprint, request, jsonify
import pandas as pd
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from config import EMBEDDINGS, VECTORSTORE_FILE

upload_google_sheet_bp = Blueprint("upload_google_sheet_bp", __name__)

@upload_google_sheet_bp.route("/upload-sheet", methods=["POST"])
def upload_google_sheet():
    if "file" not in request.files:
        return jsonify({"error": "No sheet file uploaded"}), 400

    file = request.files["file"]
    df = pd.read_excel(file)

    # Convert each row to a readable text string
    text_data = "\n".join(df.astype(str).apply(lambda x: " | ".join(x), axis=1))
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    texts = splitter.create_documents([text_data])

    vectorstore = FAISS.from_documents(texts, EMBEDDINGS)
    vectorstore.save_local(VECTORSTORE_FILE)

    return jsonify({"message": "Google Sheet uploaded and indexed successfully."})
