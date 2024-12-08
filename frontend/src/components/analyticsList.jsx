import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/usersPage.css';

// not working

function AnalyticsList() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refundStatus, setRefundStatus] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const authData = localStorage.getItem('auth');
        const { token } = authData ? JSON.parse(authData) : {};

        if (!token) {
          navigate('/login');
          setError('No authorization token found');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3005/transaction/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data.transactions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleRefund = async (transactionId) => {
  try {
    const authData = localStorage.getItem('auth');
    const { token } = authData ? JSON.parse(authData) : {};

    if (!token) {
      navigate('/login');
      setError('No authorization token found');
      return;
    }

    const response = await fetch(`http://localhost:3005/transaction/refund/${transactionId}`, {
      method: 'GET', // Correcting method to GET
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to process refund. Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    setRefundStatus({ success: true, message: data.message });

    // Optionally, update the UI by removing the refunded transaction from the list
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction._id !== transactionId)
    );
  } catch (err) {
    setRefundStatus({ success: false, message: `Error: ${err.message}` });
  }
};


  return (
    <div className="users-list-container">
      <h2>Transactions Analytics</h2>
      {error && <p className="error-message">{error}</p>}
      {refundStatus && (
        <p className={`refund-status ${refundStatus.success ? 'success' : 'error'}`}>
          {refundStatus.message}
        </p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction._id}</td>
                    <td>{transaction.userId.username}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.status}</td>
                    <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                    <td>
                      {/* Refund button */}
                      <button
                        className="refund-button"
                        onClick={() => handleRefund(transaction._id)}
                        disabled={transaction.status === 'failed'} // Disable if already refunded
                      >
                        {transaction.status === 'failed' ? 'Refunded' : 'Refund'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AnalyticsList;
