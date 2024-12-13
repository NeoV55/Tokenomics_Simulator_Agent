import React, { useState } from "react";
import axios from "axios";

const TradingForm = () => {
    const [pair, setPair] = useState("");
    const [amount, setAmount] = useState(0);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post("http://localhost:8000/simulate-trade", { pair, amount });
        setResponse(result.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Trading Pair:
                <input
                    type="text"
                    value={pair}
                    onChange={(e) => setPair(e.target.value)}
                />
            </label>
            <label>
                Amount:
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <button type="submit">Simulate Trade</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </form>
    );
};

export default TradingForm;
