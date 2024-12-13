import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InputForm from "./components/InputForm";
import ResultsDisplay from "./components/ResultsDisplay";
import LiquidityForm from "./components/LiquidityForm";
import WalletForm from "./components/WalletForm";
import WhirlpoolForm from "./components/WhirlpoolForm";
import TradingForm from "./components/TradingForm";
import TokenCreator from "./components/TokenCreator";
import MarketMaker from "./components/MarketMaker";
import axios from "axios";
import { WalletContext } from "./WalletProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./styles/global.css"; // Assume global styling is handled here

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
        <WalletContext>
            <Router>
                <div className="min-h-screen bg-gray-100 text-gray-900">
                    <header className="bg-blue-600 text-white py-4">
                        <div className="container mx-auto flex justify-between items-center">
                            <h1 className="text-3xl font-bold">Tokenomics Simulator Agent</h1>
                            <WalletMultiButton className="bg-white text-blue-600 py-1 px-4 rounded" />
                        </div>
                    </header>
                    <nav className="bg-blue-500 py-3">
                        <div className="container mx-auto flex justify-center space-x-4">
                            <Link to="/" className="text-white hover:underline">Token Creator</Link>
                            <Link to="/market-maker" className="text-white hover:underline">Market Maker</Link>
                            <Link to="/liquidity" className="text-white hover:underline">Liquidity Management</Link>
                            <Link to="/wallet" className="text-white hover:underline">Wallet Actions</Link>
                            <Link to="/trading" className="text-white hover:underline">Trading Simulator</Link>
                            <Link to="/whirlpool" className="text-white hover:underline">Whirlpool Manager</Link>
                        </div>
                    </nav>
                    <main className="container mx-auto p-4">
                        <Routes>
                            <Route path="/" element={<TokenCreator />} />
                            <Route path="/market-maker" element={<MarketMaker />} />
                            <Route path="/liquidity" element={<LiquidityForm />} />
                            <Route path="/wallet" element={<WalletForm />} />
                            <Route path="/trading" element={<TradingForm />} />
                            <Route path="/whirlpool" element={<WhirlpoolForm />} />
                            <Route path="/results" element={<ResultsDisplay results={results} />} />
                        </Routes>
                    </main>
                    <footer className="bg-blue-600 text-white py-4 mt-4">
                        <p className="text-center">&copy; 2024 Tokenomics Simulator. All rights reserved.</p>
                    </footer>
                    <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded">
                        <h2 className="text-lg font-semibold">Wallet Balance</h2>
                        <button 
                            className="bg-blue-500 text-white py-1 px-3 rounded mt-2 hover:bg-blue-700" 
                            onClick={fetchWalletBalance}
                        >
                            Fetch Balance
                        </button>
                        {walletBalance !== null && (
                            <p className="mt-2">Balance: {walletBalance}</p>
                        )}
                    </div>
                </div>
            </Router>
        </WalletContext>
    );
};

export default App;
