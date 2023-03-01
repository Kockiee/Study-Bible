import json
import requests

url = 'https://www.abibliadigital.com.br/api/users'
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

data = {
    "name": "Name",
    "email": "Email",
    "password": "Password", 
    "notifications": True
}

response = requests.post(url, headers=headers, data=json.dumps(data))

if response.status_code == 201:
    print(response.json())
else:
    print(f'Erro: {response.text}')