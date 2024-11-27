@echo off
echo Creating database and user...

REM Connect to PostgreSQL as postgres user and execute SQL commands
psql -U postgres -c "CREATE USER emmanuelmoiwohjr WITH PASSWORD 'EMAN19yrs';"
psql -U postgres -c "CREATE DATABASE ecommerce;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ecommerce TO emmanuelmoiwohjr;"
psql -U postgres -d ecommerce -c "GRANT ALL ON SCHEMA public TO emmanuelmoiwohjr;"

echo Database setup complete!
