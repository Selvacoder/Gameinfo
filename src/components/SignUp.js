import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css'; // Import the CSS

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  // Handle sign-up submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to the backend signup API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });

      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        setShowOtpInput(true);
        alert('OTP has been sent to your phone.');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Error during sign-up.');
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend OTP verification API
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (response.ok) {
        alert('OTP verified! You are signed up successfully.');
        navigate('/'); // Redirect to home page after OTP verification
      } else {
        alert(`Error: ${data.msg}`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP.');
    }
  };

  const handleSocialSignIn = (platform) => {
    // Implement social media sign-in logic here
    console.log(`Sign in with ${platform}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {!showOtpInput ? (
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
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="verify" type="submit">Verify OTP</button>
          </form>
        )}

        {!isOtpSent && (
          <div className="social-auth">
            <button className="social-btn" onClick={() => handleSocialSignIn('Google')}>Sign Up with Google</button>
            <button className="social-btn" onClick={() => handleSocialSignIn('Facebook')}>Sign Up with Facebook</button>
          </div>
        )}

        <a href="/signin" className="auth-link">Already have an account? Sign In</a>
      </div>
    </div>
  );
};

export default SignUp;
