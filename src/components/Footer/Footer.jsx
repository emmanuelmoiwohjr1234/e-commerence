import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/newsletter/subscribe', {
        email
      });
      setStatus({ type: 'success', message: response.data.message || 'Successfully subscribed!' });
      setEmail('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to subscribe. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">
              Your premier destination for fashion, accessories, and lifestyle products.
              We bring you the latest trends and timeless classics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="hover:text-primary transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-primary transition-colors">Order History</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link>
              </li>
              <li>
                <Link to="/newsletter" className="hover:text-primary transition-colors">Newsletter</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary transition-colors">Returns</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <span>123 Fashion Street, Design District, NY 10001, USA</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <span>support@fashionstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates about new products and upcoming sales
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-12 py-3 rounded-lg bg-gray-800 border ${
                    status.type === 'error' ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:border-primary`}
                  required
                  disabled={loading}
                />
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    'Subscribing...'
                  ) : (
                    <>
                      Subscribe
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </div>

              {status.message && (
                <div
                  className={`p-3 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-900 text-green-200'
                      : 'bg-red-900 text-red-200'
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-12">
          <p> {new Date().getFullYear()} Your Fashion Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
