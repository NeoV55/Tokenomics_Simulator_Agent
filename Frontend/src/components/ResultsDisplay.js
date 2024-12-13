import React from "react";
import { Line } from "react-chartjs-2";

const ResultsDisplay = ({ results }) => {
    const data = {
        labels: results.map((_, index) => `Year ${index}`),
        datasets: [
            {
                label: "Token Supply",
                data: results,
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
            },
        ],
    };

    return <Line data={data} />;
};

export default ResultsDisplay;