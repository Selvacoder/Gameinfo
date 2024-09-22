import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = ({ onSignOut }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/'); // Redirect to the main page after sign-out
  };

  return (
    <div>
      <h2>You are signed out!</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
