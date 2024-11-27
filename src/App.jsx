import React, { useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './components/Layout/MainLayout'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import ResetPassword from './components/Auth/ResetPassword'
import ForgotPassword from './components/Auth/ForgotPassword';
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import AuthModal from './components/Auth/AuthModal';

// Import pages
const Home = React.lazy(() => import('./pages/Home'))
const Categories = React.lazy(() => import('./pages/Categories'))
const MensCollection = React.lazy(() => import('./pages/MensCollection'))
const WomensCollection = React.lazy(() => import('./pages/WomensCollection'))
const Jewelry = React.lazy(() => import('./pages/Jewelry'))
const Perfume = React.lazy(() => import('./pages/Perfume'))
const Blog = React.lazy(() => import('./pages/Blog'))
const HotOffers = React.lazy(() => import('./pages/HotOffers'))
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'))
const Cart = React.lazy(() => import('./pages/Cart'))
const Checkout = React.lazy(() => import('./pages/Checkout'))
const UserProfile = React.lazy(() => import('./pages/UserProfile'))
const OrderHistory = React.lazy(() => import('./pages/OrderHistory'))
const Wishlist = React.lazy(() => import('./pages/Wishlist'))

const AuthModals = () => {
  const { showAuth, authType, closeAuth, toggleAuthType } = useAuth();

  if (!showAuth) return null;

  return authType === 'signin' ? (
    <SignIn onClose={closeAuth} onSwitchToSignUp={toggleAuthType} />
  ) : (
    <SignUp onClose={closeAuth} onSwitchToSignIn={toggleAuthType} />
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return user ? children : null;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <MainLayout>
            <AuthModal />
            <AuthModals />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/mens" element={<MensCollection />} />
                <Route path="/womens" element={<WomensCollection />} />
                <Route path="/jewelry" element={<Jewelry />} />
                <Route path="/perfume" element={<Perfume />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/hot-offers" element={<HotOffers />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/wishlist" 
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* 404 Page */}
                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                    <a href="/" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90">
                      Go Home
                    </a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </MainLayout>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
