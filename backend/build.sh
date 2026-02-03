#!/bin/bash
# Build script for production deployment

echo "Building Multi-Tenant SaaS Application..."

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Run migrations
echo "Running database migrations..."
node src/init.js

echo "Build complete!"
