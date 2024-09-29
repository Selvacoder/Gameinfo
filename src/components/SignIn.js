import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css'; // Import the CSS

const SignIn = ({ handleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
    navigate('/'); // Redirect to home page after successful sign-in
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="sign"type="submit">Sign In</button>
        </form>
        <a href="/signup" className="auth-link">Don't have an account? Sign Up</a>
      </div>
    </div>
  );
};

export default SignIn;
