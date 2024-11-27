@echo off
echo Creating database and user...

REM Set PostgreSQL path
set PGBIN="C:\Program Files\PostgreSQL\17.2\bin"

echo Using PostgreSQL at: %PGBIN%

REM Connect to PostgreSQL as postgres user and execute SQL commands
%PGBIN%\psql -U postgres -c "CREATE USER emmanuelmoiwohjr WITH PASSWORD 'EMAN19yrs';"
%PGBIN%\psql -U postgres -c "CREATE DATABASE ecommerce;"
%PGBIN%\psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ecommerce TO emmanuelmoiwohjr;"
%PGBIN%\psql -U postgres -d ecommerce -c "GRANT ALL ON SCHEMA public TO emmanuelmoiwohjr;"

echo Database setup complete!
pause
