import React from 'react';
import TopHeader from './TopHeader';
import MiddleHeader from './MiddleHeader';
import BottomHeader from './BottomHeader';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="hidden md:block">
        <TopHeader />
      </div>
      <MiddleHeader />
      <div className="hidden md:block">
        <BottomHeader />
      </div>
    </header>
  );
};

export default Header;
