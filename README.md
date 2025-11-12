# rag-chat-app

## Features
1. **API for upload a doc/sheet and ask questions to get answers**
2. **UI chat box based on the Ask API**

---

## Run API Project

1. Go to:
 /rag-chat-app/api-server

2. Activate virtual environment:

    source venv/bin/activate

3. Install dependencies:

    pip install -r requirements.txt

4. Run the app:

    python app.py


Main APIs (under /api-server)

File (doc/xls) upload from your local machine
→ upload_google_sheet_api.py

Endpoint:

http://127.0.0.1:5001/upload-sheet


Ask API (answers from uploaded docs based on vectored embedded data)
→ ask_api.py

Endpoint:

http://127.0.0.1:5001/ask

API Sample cURL Commands

1️⃣ Upload Sheet

curl --location 'http://127.0.0.1:5001/upload-sheet' \
--form 'file=@"/Users/sandeep.gupta1/dev-projects/ai_ml_services/openaitextgen/rag/data/BiharADR.xlsx"'

2️⃣ Ask a Question

curl --location 'http://127.0.0.1:5001/ask' \
--header 'Content-Type: application/json' \
--data '{"question": "List of candidates from constituency AALAMANAGAR?"}'


✅ The API server supports document uploads and provides contextual answers using vector-based embeddings.

