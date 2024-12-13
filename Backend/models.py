import numpy as np

class TokenomicsSimulation:
    def __init__(self, total_supply, inflation_rate, market_data):
        self.total_supply = total_supply
        self.inflation_rate = inflation_rate
        self.market_data = market_data

    def run(self, years):
        supply = [self.total_supply]
        for year in range(1, years + 1):
            new_supply = supply[-1] * (1 + self.inflation_rate)
            supply.append(new_supply)

        return supply
