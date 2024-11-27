import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PageTemplate = ({ title, breadcrumbs, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">
              <FaHome />
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <span className="text-gray-400">/</span>
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-800">{crumb.text}</span>
                ) : (
                  <Link
                    to={crumb.link}
                    className="text-gray-500 hover:text-primary"
                  >
                    {crumb.text}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-white border-b mb-8">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto pb-12">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
