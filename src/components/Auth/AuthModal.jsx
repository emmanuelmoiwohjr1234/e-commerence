import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const AuthModal = () => {
  const { showAuth, closeAuth, authType, setAuthType } = useAuth();

  if (!showAuth) return null;

  const handleSwitchToSignUp = () => {
    setAuthType('signup');
  };

  const handleSwitchToSignIn = () => {
    setAuthType('signin');
  };

  const handleSwitchToForgot = () => {
    setAuthType('forgot');
  };

  return (
    <>
      {authType === 'signin' && (
        <SignIn
          onClose={closeAuth}
          onSwitchToSignUp={handleSwitchToSignUp}
          onSwitchToForgot={handleSwitchToForgot}
        />
      )}
      {authType === 'signup' && (
        <SignUp
          onClose={closeAuth}
          onSwitchToSignIn={handleSwitchToSignIn}
        />
      )}
      {authType === 'forgot' && (
        <ForgotPassword
          onClose={closeAuth}
          onSwitchToSignIn={handleSwitchToSignIn}
        />
      )}
    </>
  );
};

export default AuthModal;
