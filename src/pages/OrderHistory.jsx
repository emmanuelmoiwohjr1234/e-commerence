import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaDownload } from 'react-icons/fa';

const sampleOrders = [
  {
    id: '#ORD-2023-1234',
    date: '2023-12-01',
    status: 'Delivered',
    total: 279.97,
    items: [
      {
        id: 1,
        name: 'Classic White T-Shirt',
        quantity: 2,
        price: 29.99,
        image: '/images/products/tshirt-1.jpg'
      },
      {
        id: 2,
        name: 'Leather Crossbody Bag',
        quantity: 1,
        price: 89.99,
        image: '/images/products/bag.jpg'
      }
    ]
  },
  {
    id: '#ORD-2023-1233',
    date: '2023-11-28',
    status: 'Processing',
    total: 159.99,
    items: [
      {
        id: 3,
        name: 'Gold Pendant Necklace',
        quantity: 1,
        price: 159.99,
        image: '/images/products/necklace.jpg'
      }
    ]
  },
  {
    id: '#ORD-2023-1232',
    date: '2023-11-25',
    status: 'Delivered',
    total: 349.97,
    items: [
      {
        id: 4,
        name: 'Designer Sunglasses',
        quantity: 1,
        price: 199.99,
        image: '/images/products/sunglasses.jpg'
      },
      {
        id: 5,
        name: 'Leather Wallet',
        quantity: 1,
        price: 149.98,
        image: '/images/products/wallet.jpg'
      }
    ]
  }
];

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = sampleOrders
    .filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'total':
          return b.total - a.total;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold mb-6">Order History</h1>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input"
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="date">Sort by Date</option>
                <option value="total">Sort by Total</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-4">
                    <h3 className="font-semibold">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Ordered on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                  <button className="text-primary hover:text-primary-dark text-sm flex items-center mt-1">
                    <FaDownload className="mr-1" />
                    Download Invoice
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                      <p className="text-sm font-medium">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <Link
                  to={`/orders/${order.id}`}
                  className="btn btn-secondary"
                >
                  View Details
                </Link>
                {order.status === 'Delivered' && (
                  <button className="btn btn-primary">
                    Write Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-600">No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
