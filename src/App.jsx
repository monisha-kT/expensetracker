import { useState } from 'react';
import './App.css';

function App() {
  const [toggle, setToggle] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [transType, setTransType] = useState('expense'); // Default transaction type

  const bal = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
  }, 0);

  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1, // Simple ID generation
      type: transType,
      amount: Number(amount),
      details,
    };

    setTransactions([...transactions, newTransaction]);

    // Reset fields after adding transaction
    setAmount("");
    setDetails("");
    setToggle(false); // Close the form after adding
  };

  const handleRemoveTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <>
      <div className="box">
        <div className="heading">
          <h3>Expense Tracker</h3>
        </div>
        <div className="display">
          <p>Balance: {bal}</p>
          <button className="remove" onClick={() => setToggle(!toggle)}>
            {toggle ? "Cancel" : "Add"}
          </button>
        </div>

        {toggle && (
          <div className="round">
            <div className="addbutton">
              <div className="Amountfield">
                <div className="details">
                  <input
                    type="number"
                    value={amount}
                    placeholder="Enter Value"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="details">
                  <input
                    type="text"
                    placeholder="Description"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
              </div>
              <div className="choose-field">
                <div>
                  <input
                    type="radio"
                    name="transactionType"
                    value="expense"
                    checked={transType === 'expense'}
                    onChange={(e) => setTransType(e.target.value)}
                  />
                  <label>Expense</label>
                  <input
                    type="radio"
                    name="transactionType"
                    value="income"
                    checked={transType === 'income'}
                    onChange={(e) => setTransType(e.target.value)}
                  />
                  <label>Income</label>
                </div>
              </div>
            </div>
            <button className="Adding" onClick={handleAddTransaction}>
              Add Transactions
            </button>
          </div>
        )}

        <div className="total-expense">
          <div className="total-cost">
            <p>Total Expense: ${totalExpense}</p>
          </div>
          <div className="total-cost">
            <p>Total Income: ${totalIncome}</p>
          </div>
        </div>

        <div className="Transaction-field">
          <h3>Transactions</h3>
          <div className="output-field">
            {transactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <p>{transaction.details}: ${transaction.amount} </p>
                <button onClick={() => handleRemoveTransaction(transaction.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;