import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultsDisplay from "./components/ResultsDisplay";
import LiquidityForm from "./components/LiquidityForm";
import WalletForm from "./components/WalletForm";
import WhirlpoolForm from "./components/WhirlpoolForm";

const App = () => {
    const [results, setResults] = useState([]);
    const [walletBalance, setWalletBalance] = useState(null);

    const fetchWalletBalance = async () => {
        try {
            const response = await axios.post("http://localhost:8000/manage-wallet", {
                wallet_id: "your-wallet-id",
                action: "balance",
            });
            setWalletBalance(response.data.balance);
        } catch (error) {
            console.error("Error fetching wallet balance:", error);
        }
    };

    return (
        <div>
            <h1>Tokenomics Simulator</h1>
            <InputForm onResults={setResults} />
            {results.length > 0 && <ResultsDisplay results={results} />}
            <LiquidityForm />
            <WalletForm />
            <WhirlpoolForm />
            <div>
                <h2>Wallet Balance</h2>
                <button onClick={fetchWalletBalance}>Fetch Wallet Balance</button>
                {walletBalance !== null && <p>Balance: {walletBalance}</p>}
            </div>
        </div>
    );
};

export default App;