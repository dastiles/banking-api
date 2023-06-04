import React from 'react';

function TransactionHistory(props) {
    const { transactions } = props;

    return (
        <div>
            <h2>Transaction History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Fraudulent</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.location}</td>
                            <td>{transaction.fraudulent ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistory;


import brain from 'brain.js';

// Define the neural network architecture
const net = new brain.NeuralNetwork({
    hiddenLayers: [3],
});

// Train the neural networkon the transaction dataset
const dataset = [
    { input: { amount: 20, date: 1, location: 1 }, output: { fraudulent: 0 } },
    { input: { amount: 100, date: 2, location: 1 }, output: { fraudulent: 0 } },
    { input: { amount: 500, date: 3, location: 2 }, output: { fraudulent: 1 } },
    { input: { amount: 200, date: 4, location: 3 }, output: { fraudulent: 0 } },
    { input: { amount: 50, date: 5, location: 2 }, output: { fraudulent: 0 } },
];

net.train(dataset);

// Define the predictFraudulentTransaction function
const predictFraudulentTransaction = (amount, date, location) => {
    // Normalize the input values to the range of [0, 1]
    const normalizedAmount = amount / 1000;
    const normalizedDate = date / 31; // assuming a 31-day month
    const normalizedLocation = location / 10; // assuming 10 possible locations

    // Make a prediction using the trained neural network
    const output = net.run({ amount: normalizedAmount, date: normalizedDate, location: normalizedLocation });

    // Interpret the output as a binary classification (fraudulent/not fraudulent)
    return output.fGreat! Here's the continuation of the code:

        ```javascript
import brain from 'brain.js';

// Define the neural network architecture
const net = new brain.NeuralNetwork({
  hiddenLayers: [3],
});

// Train the neural networkon the transaction dataset
const dataset = [
  { input: { amount: 20, date: 1, location: 1 }, output: { fraudulent: 0 } },
  { input: { amount: 100, date: 2, location: 1 }, output: { fraudulent: 0 } },
  { input: { amount: 500, date: 3, location: 2 }, output: { fraudulent: 1 } },
  { input: { amount: 200, date: 4, location: 3 }, output: { fraudulent: 0 } },
  { input: { amount: 50, date: 5, location: 2 }, output: { fraudulent: 0 } },
];

net.train(dataset);

// Define the predictFraudulentTransaction function
const predictFraudulentTransaction = (amount, date, location) => {
  // Normalize the input values to the range of [0, 1]
  const normalizedAmount = amount / 1000;
  const normalizedDate = date / 31; // assuming a 31-day month
  const normalizedLocation = location / 10; // assuming 10 possible locations

  // Make```javascript
    import React, { useState } from 'react';
    import TransactionHistory from './TransactionHistory';
    import predictFraudulentTransaction from './predictFraudulentTransaction';

    function App() {
        const [transactions, setTransactions] = useState([
            { amount: 20, date: '2022-01-01', location: 'New York', fraudulent: false },
            { amount: 100, date: '2022-02-02', location: 'Los Angeles', fraudulent: false },
            { amount: 500, date: '2022-03-03', location: 'Miami', fraudulent: false },
            { amount: 200, date: '2022-04-04', location: 'Chicago', fraudulent: false },
            { amount: 50, date: '2022-05-05', location: 'Houston', fraudulent: false },
        ]);

        const handleAddTransaction = (event) => {
            event.preventDefault();

            const amount = parseInt(event.target.elements.amount.value);
            const date = event.target.elements.date.value;
            const location = event.target.elements.location.value;

            // Use the trained model to make a prediction
            const fraudulent = predictFraudulentTransaction(amount, date, location);

            // Add the new transaction to the state
            setTransactions([...transactions, { amount, date, location, fraudulent }]);
        };

        return (
            <div>
                <h1>Bank Transactions</h1Great! Continuing from where we left off, here's the rest of the App component code:

                ```javascript
                import React, {useState} from 'react';
                import TransactionHistory from './TransactionHistory';
                import predictFraudulentTransaction from './predictFraudulentTransaction';

                function App() {
  const [transactions, setTransactions] = useState([
                {amount: 20, date: '2022-01-01', location: 'New York', fraudulent: false },
                {amount: 100, date: '2022-02-02', location: 'Los Angeles', fraudulent: false },
                {amount: 500, date: '2022-03-03', location: 'Miami', fraudulent: false },
                {amount: 200, date: '2022-04-04', location: 'Chicago', fraudulent: false },
                {amount: 50, date: '2022-05-05', location: 'Houston', fraudulent: false },
                ]);

  const handleAddTransaction = (event) => {
                    event.preventDefault();

                const amount = parseInt(event.target.elements.amount.value);
                const date = event.target.elements.date.value;
                const location = event.target.elements.location.value;

                // Use the trained model to make a prediction
                const fraudulent = predictFraudulentTransaction(amount, date, location);

                // Add the new transaction to the state
                setTransactions([...transactions, {amount, date, location, fraudulent}]);
                Continuing from where we left off, here's the rest of the App component code:

                ```javascript
                return (
                <div>
                    <h1>Bank Transactions</h1>
                    <TransactionHistory transactions={transactions} />
                    <h2>Add New Transaction</h2>
                    <form onSubmit={handleAddTransaction}>
                        <label>
                            Amount:
                            <input type="number" name="amount" />
                        </label>
                        <br />
                        <label>
                            Date:
                            <input type="date" name="date" />
                        </label>
                        <br />
                        <label>
                            Location:
                            <input type="text" name="location" />
                        </label>
                        <br />
                        <button type="submit">Add Transaction</button>
                    </form>
                </div>
                );
}

                export default App;