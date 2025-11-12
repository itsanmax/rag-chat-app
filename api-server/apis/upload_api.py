from flask import Blueprint, request, jsonify
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from config import EMBEDDINGS, VECTORSTORE_FILE

upload_bp = Blueprint("upload_bp", __name__)

@upload_bp.route("/upload", methods=["POST"])
def upload_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filepath = f"data/{file.filename}"
    file.save(filepath)

    loader = PyPDFLoader(filepath)
    pages = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs = splitter.split_documents(pages)

    vectorstore = FAISS.from_documents(docs, EMBEDDINGS)
    vectorstore.save_local(VECTORSTORE_FILE)

    return jsonify({"message": f"PDF '{file.filename}' uploaded and processed successfully."})
