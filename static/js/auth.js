// Handle Registration
async function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = '/login';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Login successful!');
            window.location.href = '/'; // Redirect to home page
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
}

// Handle Logout
async function handleLogout() {
    try {
        const response = await fetch('/logout');
        const data = await response.json();
        
        if (response.ok) {
            alert('Logged out successfully');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during logout');
    }
}
