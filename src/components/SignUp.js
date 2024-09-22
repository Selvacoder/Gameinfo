import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css'; // Import the CSS

const SignUp = ({ handleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
    navigate('/'); // Redirect to home page after successful sign-up
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
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
          <button type="submit">Sign Up</button>
        </form>
        <a href="/signin" className="auth-link">Already have an account? Sign In</a>
      </div>
    </div>
  );
};

export default SignUp;
