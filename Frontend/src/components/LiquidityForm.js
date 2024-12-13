
import React, { useState } from "react";
import axios from "axios";

const LiquidityForm = () => {
    const [poolId, setPoolId] = useState("");
    const [action, setAction] = useState("add");
    const [amount, setAmount] = useState(0);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:8000/liquidity-pool", {
                pool_id: poolId,
                action,
                amount,
            });
            setResponse(result.data);
        } catch (error) {
            console.error("Liquidity pool action error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Liquidity Pool Management</h2>
            <label className="block mb-2">
                Pool ID:
                <input
                    type="text"
                    value={poolId}
                    onChange={(e) => setPoolId(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </label>
            <label className="block mb-2">
                Action:
                <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option value="add">Add Liquidity</option>
                    <option value="remove">Remove Liquidity</option>
                </select>
            </label>
            <label className="block mb-2">
                Amount:
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </label>
            <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded">
                Submit
            </button>
            {response && <pre className="bg-gray-100 p-2 mt-4">{JSON.stringify(response, null, 2)}</pre>}
        </form>
    );
};

export default LiquidityForm;
