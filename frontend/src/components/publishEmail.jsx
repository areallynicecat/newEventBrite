import '../styles/publishEmail.css';
import React, { useState } from 'react';



const SendBulkEmail = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    
    // body check
    if (!subject || !body) {
      setError('Both subject and body are required');
      return;
    }

    try {
      const authData = localStorage.getItem('auth');
      const { token } = authData ? JSON.parse(authData) : {};
      const response = await fetch('http://localhost:3005/send-bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ subject, body }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.message || 'An error occurred while sending the email');
      }
    } catch (error) {
      setError('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className="send-bulk-email-container">
      <h2>Send Bulk Email</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSendEmail}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            required
            placeholder="Enter subject"
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            required
            placeholder="Enter body text"
          />
        </div>

        <button type="submit" className="send-btn">Send Email</button>
      </form>
    </div>
  );
};

export default SendBulkEmail;
