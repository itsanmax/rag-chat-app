import requests

url = "http://localhost:5001/upload"
files = {"file": open("data/Bihar_Sitting_MLAs_2020_Finalver_English.pdf", "rb")}

# files = [
#     ("files", open("data/Bihar_Sitting_MLAs_2020_Finalver_English.pdf", "rb")),
#     ("files", open("data/Analysis_of_Sitting_MPs_and_MLAs_who_have_dynastic_background_Finalver_English_Updated.pdf", "rb")),
# ]

resp = requests.post(url, files=files)
print(resp.status_code)
print(resp.json())
