const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testUser = {
  username: 'resettest',
  email: 'reset@example.com',
  password: 'Test123!',
  firstName: 'Reset',
  lastName: 'Test'
};

let resetToken = '';

async function testPasswordResetFlow() {
  try {
    console.log('🚀 Starting Password Reset Flow Tests...\n');

    // 1. Register a test user
    console.log('1. Creating test user...');
    try {
      const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
      console.log('✅ Test user created');
    } catch (error) {
      if (error.response?.data?.error === 'User with this email or username already exists') {
        console.log('Test user already exists, continuing...');
      } else {
        throw error;
      }
    }

    // 2. Request password reset
    console.log('\n2. Testing password reset request...');
    const resetRequestResponse = await axios.post(`${API_URL}/auth/forgot-password`, {
      email: testUser.email
    });
    console.log('✅ Password reset requested');
    console.log('Response:', resetRequestResponse.data);

    // Note: In a real application, you would get the reset token from your email
    // For testing, we'll get it from the database directly
    console.log('\nℹ️ Check your console for the test email preview URL');
    console.log('Copy the reset token from the email link and use it in the next step');

    // Wait for user to get token
    console.log('\n⚠️ This test is incomplete because we need manual intervention');
    console.log('To complete the test:');
    console.log('1. Check the console for the test email preview URL');
    console.log('2. Open the URL and copy the reset token from the link');
    console.log('3. Use the token to reset the password using this endpoint:');
    console.log(`POST ${API_URL}/auth/reset-password`);
    console.log('Request body:', {
      token: 'your-reset-token',
      newPassword: 'NewPassword123!'
    });

  } catch (error) {
    console.log('\n❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the tests
testPasswordResetFlow();
