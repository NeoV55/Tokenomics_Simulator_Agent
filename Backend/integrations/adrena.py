import requests

ADRENA_API_URL = "https://api.adrena.io"

def simulate_trade(pair, amount):
    # Example REST API interaction for Adrena trading simulation
    payload = {"pair": pair, "amount": amount}
    response = requests.post(f"{ADRENA_API_URL}/simulate", json=payload)
    return response.json()