-- Create new user
CREATE USER emmanuelmoiwohjr WITH PASSWORD 'EMAN19yrs';

-- Create database if it doesn't exist
CREATE DATABASE ecommerce;

-- Grant privileges to the new user
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO emmanuelmoiwohjr;

-- Connect to ecommerce database
\c ecommerce

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO emmanuelmoiwohjr;
