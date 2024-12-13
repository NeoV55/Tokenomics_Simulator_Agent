from fastapi import FastAPI
from models import TokenomicsSimulation
from integrations.switchboard import fetch_market_data
from integrations.meteora import interact_with_meteora
from integrations.orca import interact_with_orca
from integrations.crossmint import interact_with_crossmint

app = FastAPI()

@app.get("/simulate")
def simulate(inflation_rate: float, total_supply: int, years: int):
    # Fetch market data from Switchboard
    market_data = fetch_market_data()

    # Run tokenomics simulation
    simulation = TokenomicsSimulation(total_supply, inflation_rate, market_data)
    results = simulation.run(years)

    return {"results": results}

@app.post("/liquidity-pool")
def liquidity_pool_action(pool_id: str, action: str):
    result = interact_with_meteora(pool_id, action)
    return {"status": "success", "details": result}

@app.post("/manage-wallet")
def wallet_action(wallet_id: str, action: str):
    result = interact_with_crossmint(wallet_id, action)
    return {"status": "success", "details": result}

@app.post("/whirlpool")
def manage_whirlpool_action(pool_id: str, action: str):
    result = interact_with_orca(pool_id, action)
    return {"status": "success", "details": result}