import React from 'react';
import Hero from '../components/Hero/Hero';
import Sidebar from '../components/Sidebar/Sidebar';
import ProductGrid from '../components/Products/ProductGrid';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className=" py-8">
        <div className="flex gap-6">
          <Sidebar />
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;
