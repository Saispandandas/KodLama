const express = require('express');
const app = express();
const port = 3000;

// Simulated Data
let energyStats = {
    solarOutput: (Math.random() * 5 + 2).toFixed(2), // Random solar output between 2kWh and 7kWh
    batteryLevel: (Math.random() * 100).toFixed(2) // Random battery level between 0% and 100%
};

let transactions = [
    { date: "2025-03-25", energy: "4.5", status: "Success" },
    { date: "2025-03-24", energy: "3.2", status: "Success" },
    { date: "2025-03-23", energy: "2.8", status: "Failed" },
    { date: "2025-03-22", energy: "5.0", status: "Success" }
];

// Middleware to parse JSON requests
app.use(express.json());

// API Endpoint to get real-time energy stats
app.get('/api/energy-stats', (req, res) => {
    res.json(energyStats);
});

// API Endpoint to get transaction history
app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

// API Endpoint to add a new transaction (for demo purposes)
app.post('/api/transactions', (req, res) => {
    const { date, energy, status } = req.body;
    if (!date || !energy || !status) {
        return res.status(400).send('Missing required fields');
    }
    const newTransaction = { date, energy, status };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
