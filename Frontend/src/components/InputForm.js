import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ onResults }) => {
    const [inflationRate, setInflationRate] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const [years, setYears] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.get("http://localhost:8000/simulate", {
            params: { inflation_rate: inflationRate, total_supply: totalSupply, years },
        });
        onResults(response.data.results);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Inflation Rate (%):
                <input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                />
            </label>
            <label>
                Total Supply:
                <input
                    type="number"
                    value={totalSupply}
                    onChange={(e) => setTotalSupply(e.target.value)}
                />
            </label>
            <label>
                Years to Simulate:
                <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                />
            </label>
            <button type="submit">Simulate</button>
        </form>
    );
};

export default InputForm;
