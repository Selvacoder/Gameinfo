import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Auth.css'; // Import the CSS

const SignIn = ({ handleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading while waiting for response
    setError(''); // Clear previous errors

    try {
      // Send request to the backend
      const res = await axios.post('/api/auth/signin', { email, password });

      if (res.data.message) {
        // Handle success
        alert(res.data.message); // Display success message
        localStorage.setItem('isAuthenticated', 'true'); // Set authentication flag

        handleSignIn(); // Update sign-in state in the parent component
        navigate('/'); // Redirect to home page after successful sign-in
      }
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); // Display error from backend
      } else {
        setError('Error signing in'); // Generic error message
      }
    } finally {
      setLoading(false); // Reset loading state
    }
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
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="error">{error}</p>}
          
          <button className="sign" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'} {/* Show loading message */}
          </button>
        </form>
        <a href="/signup" className="auth-link">Don't have an account? Sign Up</a>
      </div>
    </div>
  );
};

export default SignIn;
