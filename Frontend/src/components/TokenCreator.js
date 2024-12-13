import React, { useState } from "react";
import axios from "axios";

const TokenCreator = () => {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [supply, setSupply] = useState(0);
    const [decimals, setDecimals] = useState(9);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:8000/create-token", {
                name,
                symbol,
                supply,
                decimals,
            });
            setResponse(result.data);
        } catch (error) {
            console.error("Token creation error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Create a Token</h2>
            <label className="block mb-2">
                Token Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </label>
            <label className="block mb-2">
                Symbol:
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </label>
            <label className="block mb-2">
                Total Supply:
                <input
                    type="number"
                    value={supply}
                    onChange={(e) => setSupply(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </label>
            <label className="block mb-2">
                Decimals:
                <input
                    type="number"
                    value={decimals}
                    onChange={(e) => setDecimals(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </label>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Create Token
            </button>
            {response && <pre className="bg-gray-100 p-2 mt-4">{JSON.stringify(response, null, 2)}</pre>}
        </form>
    );
};

export default TokenCreator;