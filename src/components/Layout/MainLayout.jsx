import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-4 px-4 container mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
