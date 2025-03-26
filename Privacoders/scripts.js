// Fetch real-time energy stats from the backend
async function fetchRealTimeStats() {
    try {
        const response = await fetch('http://localhost:3000/api/energy-stats');
        const data = await response.json();
        document.getElementById("solarOutput").innerText = data.solarOutput + " kWh";
        document.getElementById("batteryLevel").innerText = data.batteryLevel + " %";
    } catch (error) {
        console.error('Error fetching real-time data:', error);
    }
}

// Fetch transaction history from the backend
async function fetchTransactionHistory() {
    try {
        const response = await fetch('http://localhost:3000/api/transactions');
        const transactions = await response.json();
        const tbody = document.getElementById("transactionHistory").getElementsByTagName("tbody")[0];
        tbody.innerHTML = ""; // Clear existing rows

        // Add new rows to the table
        transactions.forEach(transaction => {
            const row = tbody.insertRow();
            row.insertCell(0).innerText = transaction.date;
            row.insertCell(1).innerText = transaction.energy + " kWh";
            row.insertCell(2).innerText = transaction.status;
        });
    } catch (error) {
        console.error('Error fetching transaction history:', error);
    }
}

// Initialize dashboard with real data
async function initDashboard() {
    await fetchRealTimeStats();
    await fetchTransactionHistory();
}

// Update the dashboard every 5 seconds
setInterval(initDashboard, 5000);
initDashboard();
