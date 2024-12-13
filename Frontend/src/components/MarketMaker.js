import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const MarketMaker = () => {
    const [pair, setPair] = useState("");
    const [liquidity, setLiquidity] = useState(0);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:8000/market-maker", {
                pair,
                liquidity,
            });
            setResponse(result.data);
        } catch (error) {
            console.error("Market making error:", error);
        }
    };

    const data = {
        labels: response ? response.data.timestamps : [],
        datasets: [
            {
                label: "Price Movement",
                data: response ? response.data.prices : [],
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Market Maker Simulator</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Trading Pair:
                    <input
                        type="text"
                        value={pair}
                        onChange={(e) => setPair(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </label>
                <label className="block mb-2">
                    Liquidity:
                    <input
                        type="number"
                        value={liquidity}
                        onChange={(e) => setLiquidity(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </label>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                    Simulate Market Making
                </button>
            </form>
            {response && (
                <div className="mt-4">
                    <Line data={data} />
                </div>
            )}
        </div>
    );
};

export default MarketMaker;
