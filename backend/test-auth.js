const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let authToken = '';

const testUser = {
  username: 'testuser123',
  email: 'test@example.com',
  password: 'Test123!',
  firstName: 'Test',
  lastName: 'User'
};

async function testRegistration() {
  try {
    console.log('\n1. Testing User Registration...');
    const response = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('✅ Registration successful');
    console.log('Response:', response.data);
    return response.data.token;
  } catch (error) {
    console.log('❌ Registration failed:', error.response?.data || error.message);
    if (error.response?.data?.error === 'User with this email or username already exists') {
      console.log('This is expected if the user already exists. Proceeding with login...');
      return null;
    }
    throw error;
  }
}

async function testLogin() {
  try {
    console.log('\n2. Testing User Login...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful');
    console.log('Response:', response.data);
    return response.data.token;
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data || error.message);
    throw error;
  }
}

async function testProtectedRoute(token) {
  try {
    console.log('\n3. Testing Protected Route (Profile)...');
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Protected route access successful');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Protected route access failed:', error.response?.data || error.message);
    throw error;
  }
}

async function testInvalidToken() {
  try {
    console.log('\n4. Testing Invalid Token...');
    await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: 'Bearer invalid_token' }
    });
    console.log('❌ Test failed: Should not allow access with invalid token');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Successfully rejected invalid token');
      console.log('Response:', error.response.data);
    } else {
      console.log('❌ Unexpected error:', error.response?.data || error.message);
      throw error;
    }
  }
}

async function runTests() {
  try {
    console.log('🚀 Starting Authentication Tests...\n');
    
    // Try registration first
    let token = await testRegistration();
    
    // If registration fails because user exists, try login
    if (!token) {
      token = await testLogin();
    }
    
    // Test protected route with valid token
    await testProtectedRoute(token);
    
    // Test invalid token
    await testInvalidToken();
    
    console.log('\n✨ All tests completed successfully!');
  } catch (error) {
    console.log('\n❌ Test suite failed:', error.message);
  }
}

// Run the tests
runTests();
