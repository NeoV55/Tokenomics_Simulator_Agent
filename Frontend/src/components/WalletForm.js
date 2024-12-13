import React, { useState } from "react";
import axios from "axios";

const WalletForm = () => {
    const [walletId, setWalletId] = useState("");
    const [action, setAction] = useState("balance");
    const [amount, setAmount] = useState(0);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:8000/manage-wallet", {
                wallet_id: walletId,
                action,
                amount: action === "transfer" ? amount : undefined,
            });
            setResponse(result.data);
        } catch (error) {
            console.error("Wallet action error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Wallet Actions</h2>
            <label className="block mb-2">
                Wallet ID:
                <input
                    type="text"
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
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
                    <option value="balance">Check Balance</option>
                    <option value="transfer">Transfer Funds</option>
                </select>
            </label>
            {action === "transfer" && (
                <label className="block mb-2">
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </label>
            )}
            <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded">
                Submit
            </button>
            {response && <pre className="bg-gray-100 p-2 mt-4">{JSON.stringify(response, null, 2)}</pre>}
        </form>
    );
};

export default WalletForm;