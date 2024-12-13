import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultsDisplay from "./components/ResultsDisplay";

const App = () => {
    const [results, setResults] = useState([]);

    return (
        <div>
            <h1>Tokenomics Simulator</h1>
            <InputForm onResults={setResults} />
            {results.length > 0 && <ResultsDisplay results={results} />}
        </div>
    );
};

export default App;