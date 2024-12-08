import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom'; 
import '../styles/login.css'; 

function Login() {
  const { login } = useContext(AuthContext);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3005/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            login({
                user: data.user,
                token : data.token
            });
            navigate('/'); 
        } else {
            setError(data.message); 
        }
    } catch (error) {
        setError('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      
      <div className="login-footer">
        <button onClick={() => navigate('/forgot-password')} className="register-btn">Forgot your password?</button>
        <button onClick={() => navigate('/register')} className="register-btn">Register</button>
      </div>
    </div>
  );
}

export default Login;
