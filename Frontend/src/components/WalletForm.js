import React, { useState } from "react";
import axios from "axios";

const WalletForm = () => {
    const [walletId, setWalletId] = useState("");
    const [action, setAction] = useState("");
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post("http://localhost:8000/manage-wallet", { wallet_id: walletId, action });
        setResponse(result.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Wallet ID:
                <input
                    type="text"
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                />
            </label>
            <label>
                Action:
                <select value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value="balance">Check Balance</option>
                    <option value="transfer">Transfer Funds</option>
                </select>
            </label>
            <button type="submit">Submit</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </form>
    );
};

export default WalletForm;
