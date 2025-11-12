# from flask import Blueprint, request, jsonify
# from config import EMBEDDINGS, vectorstore, OPENAI_API_KEY

# ask_bp = Blueprint("ask_bp", __name__)

# from app import vectorstore, qa_chain, chat_history

# @ask_bp.route("/ask", methods=["POST"])
# def ask_question():
#     global chat_history

#     if vectorstore is None:
#         return jsonify({"error": "Please upload a PDF first via /upload"}), 400

#     data = request.get_json()
#     question = data.get("question", "").strip()
#     if not question:
#         return jsonify({"error": "Question cannot be empty"}), 400

#     result = qa_chain.invoke({"question": question, "chat_history": chat_history})
#     chat_history.append((question, result["answer"]))

#     return jsonify({"answer": result["answer"]})


from flask import Blueprint, request, jsonify
from config import EMBEDDINGS, vectorstore, OPENAI_API_KEY

from langchain.chains import ConversationalRetrievalChain
from langchain_openai import ChatOpenAI

ask_bp = Blueprint('ask_bp', __name__)

@ask_bp.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    question = data.get("question")

    if not vectorstore:
        return jsonify({"error": "Please upload a document first"}), 400

    qa_chain = ConversationalRetrievalChain.from_llm(
        ChatOpenAI(openai_api_key=OPENAI_API_KEY, model="gpt-4o-mini"),
        retriever=vectorstore.as_retriever()
    )

    result = qa_chain.invoke({"question": question, "chat_history": []})
    return jsonify({"answer": result["answer"]})
