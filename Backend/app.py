from fastapi import FastAPI
from models import TokenomicsSimulation
from integrations.switchboard import fetch_market_data

app = FastAPI()

@app.get("/simulate")
def simulate(inflation_rate: float, total_supply: int, years: int):
    # Fetch market data from Switchboard
    market_data = fetch_market_data()

    # Run tokenomics simulation
    simulation = TokenomicsSimulation(total_supply, inflation_rate, market_data)
    results = simulation.run(years)

    return {"results": results}

# More endpoints to handle staking, LP integration with Meteora/Orca will be added.