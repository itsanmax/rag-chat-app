# from flask import Flask

# from dotenv import load_dotenv
# import os

# load_dotenv()

# app = Flask(__name__)

# # Globals
# # EMBEDDINGS = OpenAIEmbeddings(openai_api_key=os.environ.get("OPENAI_API_KEY"))
# # VECTORSTORE_FILE = "vectorstore_index"
# # vectorstore = None
# # qa_chain = None
# # chat_history = []

# # Import Blueprints
# from apis.upload_google_sheet_api import upload_google_sheet_bp
# from apis.upload_api import upload_bp
# from apis.multiple_upload_api import multiple_upload_bp
# from apis.ask_api import ask_bp

# # Register Blueprints
# app.register_blueprint(upload_bp)
# app.register_blueprint(multiple_upload_bp)
# app.register_blueprint(upload_google_sheet_bp)
# app.register_blueprint(ask_bp)

# if __name__ == "__main__":
#     os.makedirs("data", exist_ok=True)
#     app.run(host="0.0.0.0", port=5001, debug=True)


from flask import Flask
from dotenv import load_dotenv
#from apis.upload_api import upload_bp
from apis.ask_api import ask_bp
from apis.upload_google_sheet_api import upload_google_sheet_bp

# Load env and init Flask
load_dotenv()
app = Flask(__name__)

# Register Blueprints
#app.register_blueprint(upload_bp)
app.register_blueprint(upload_google_sheet_bp)
app.register_blueprint(ask_bp)

if __name__ == "__main__":
    app.run(port=5001, debug=True)

