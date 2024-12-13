import React, { useState } from "react";
import axios from "axios";

const WhirlpoolForm = () => {
    const [poolId, setPoolId] = useState("");
    const [action, setAction] = useState("");
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post("http://localhost:8000/whirlpool", { pool_id: poolId, action });
        setResponse(result.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Pool ID:
                <input
                    type="text"
                    value={poolId}
                    onChange={(e) => setPoolId(e.target.value)}
                />
            </label>
            <label>
                Action:
                <select value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value="stake">Stake</option>
                    <option value="unstake">Unstake</option>
                </select>
            </label>
            <button type="submit">Submit</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </form>
    );
};

export default WhirlpoolForm;