import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const TopHeader = ({ isMobile }) => {
  const { user, signOut, openAuth } = useAuth();

  const content = (
    <>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-600 hover:text-primary"><FaFacebook /></a>
        <a href="#" className="text-gray-600 hover:text-primary"><FaTwitter /></a>
        <a href="#" className="text-gray-600 hover:text-primary"><FaInstagram /></a>
        <a href="#" className="text-gray-600 hover:text-primary"><FaLinkedin /></a>
      </div>
      
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center space-x-4'}`}>
        <select className="bg-transparent border-none text-sm focus:outline-none">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        
        <select className="bg-transparent border-none text-sm focus:outline-none">
          <option value="EN">English</option>
          <option value="FR">French</option>
          <option value="ES">Spanish</option>
        </select>

        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
          {user ? (
            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-2'}`}>
              <span className="text-sm">Welcome, {user.firstName}</span>
              <button
                onClick={signOut}
                className="text-sm hover:text-primary"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => openAuth('signin')}
                className="text-sm hover:text-primary"
              >
                Sign In
              </button>
              {!isMobile && <span>|</span>}
              <button
                onClick={() => openAuth('signup')}
                className="text-sm hover:text-primary"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="py-4 space-y-4">
        {content}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-2 hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        {content}
      </div>
    </div>
  );
};

export default TopHeader;
