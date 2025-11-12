import requests

ask_url = "http://127.0.0.1:5001/ask"  # Use the same port your Flask app is running on

question = "List the MLAs from Patna district."

payload = {"question": question}
response = requests.post(ask_url, json=payload)

print("Status code:", response.status_code)
try:
    print("Answer:", response.json())
except:
    print("Response:", response.text)
