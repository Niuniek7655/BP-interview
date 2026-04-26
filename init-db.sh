#!/bin/bash
set -e

# This script creates the database and application user
# It uses environment variables passed from docker-compose

mysql -u root -p"${MYSQL_ROOT_PASSWORD}" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS ${DB_NAME:-interview};
    USE ${DB_NAME:-interview};
    
    -- Create application user with privileges needed for migrations and application
    CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';
    GRANT ALL PRIVILEGES ON ${DB_NAME:-interview}.* TO '${DB_USER}'@'%';
    FLUSH PRIVILEGES;
EOSQL

