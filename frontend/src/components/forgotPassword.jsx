import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/passwordReset.css';

function PasswordReset() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // handling email otp submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/send-reset-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); 
        setSent(true); // setting sent to true to load in the second form
      } else {
        setError(data.message); 
      }
    } catch (error) {
      setError('An error occurred during password reset.');
    }
  };

  // function to send new password to the backend
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const response = await fetch('http://localhost:3005/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword : password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); 
        setTimeout(() => {
          navigate('/login'); // set the timeout to show the success message lol
        }, 2000);
      } else {
        setError(data.message); 
      }
    } catch (error) {
      setError('An error occurred during password reset.');
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Reset Your Password</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {!sent ? (
        // First form for sending OTP to email
        <form onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="reset-btn">Send OTP</button>
        </form>
      ) : (
        // Second form for OTP and new password reset
        <form onSubmit={handleResetSubmit}>
          <div className="form-group">
            <label htmlFor="otp">OTP Code:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter OTP code"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" className="reset-btn">Reset Password</button>
        </form>
      )}

      <div className="reset-footer">
        <button onClick={() => navigate('/login')} className="login-btn">Back to Login</button>
      </div>
    </div>
  );
}

export default PasswordReset;
