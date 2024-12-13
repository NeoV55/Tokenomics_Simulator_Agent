import requests

SWITCHBOARD_API_URL = "https://api.switchboard.xyz"

def fetch_market_data():
    response = requests.get(f"{SWITCHBOARD_API_URL}/price-feed")
    return response.json()