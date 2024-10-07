import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css'; // Import the CSS

const SignUp = ({ handleSignIn }) => {
  const [name, setName] = useState(''); // New state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(); // Handle sign-in logic
    navigate('/'); // Redirect to home page after successful sign-up
  };

  const handleSocialSignIn = (platform) => {
    // Implement social media sign-in logic here
    console.log(`Sign in with ${platform}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button className="sign" type="submit">Sign Up</button>
        </form>
        <div className="social-auth">
          <button className="social-btn" onClick={() => handleSocialSignIn('Google')}>Sign Up with Google</button>
          <button className="social-btn" onClick={() => handleSocialSignIn('Facebook')}>Sign Up with Facebook</button>
        </div>
        <a href="/signin" className="auth-link">Already have an account? Sign In</a>
      </div>
    </div>
  );
};

export default SignUp;
