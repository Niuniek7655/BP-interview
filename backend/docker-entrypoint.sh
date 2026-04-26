#!/bin/sh
set -e

export DB_HOST=${DB_HOST:-db}

echo "Waiting for database to be ready..."
while ! nc -z "$DB_HOST" 3306; do
  echo "Waiting for MySQL at $DB_HOST:3306..."
  sleep 2
done

echo "Database is ready!"

echo "Running database migrations..."
npx sequelize-cli db:migrate

echo "Running database seeders..."
npx sequelize-cli db:seed:all

echo "Starting application..."
exec npm start