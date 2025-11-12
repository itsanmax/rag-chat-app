# import os
# from dotenv import load_dotenv
# from langchain_openai import OpenAIEmbeddings
# from langchain_community.vectorstores import FAISS

# # Load .env variables
# load_dotenv()

# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# # Initialize embeddings and (optionally) load FAISS store
# EMBEDDINGS = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

# VECTORSTORE_FILE = "data/faiss_index"
# vectorstore = None

# # Safe load FAISS vector store
# from pathlib import Path
# if Path(VECTORSTORE_FILE).exists():
#     from langchain_community.vectorstores import FAISS
#     vectorstore = FAISS.load_local(VECTORSTORE_FILE, EMBEDDINGS, allow_dangerous_deserialization=True)


import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
VECTORSTORE_FILE = "data/vectorstore_index"

# Initialize embeddings globally
EMBEDDINGS = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

# Initialize empty vectorstore variable
vectorstore = None

# Load FAISS if already available
from pathlib import Path
if Path(VECTORSTORE_FILE).exists():
    vectorstore = FAISS.load_local(
        VECTORSTORE_FILE,
        EMBEDDINGS,
        allow_dangerous_deserialization=True
    )
