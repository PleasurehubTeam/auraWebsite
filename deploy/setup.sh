#!/bin/bash
# ==============================================
# Aura Website - Server Initial Setup Script
# ==============================================
# Run this script ONCE on a fresh server
# Usage: bash setup.sh
# ==============================================

set -e

echo "=========================================="
echo "  Aura Website - Server Setup"
echo "=========================================="

# ----- 1. System Update -----
echo ""
echo "[1/6] Updating system packages..."
sudo apt update && sudo apt upgrade -y

# ----- 2. Install basic tools -----
echo ""
echo "[2/6] Installing basic tools..."
sudo apt install -y git curl wget

# ----- 3. Install Node.js 20 -----
echo ""
echo "[3/6] Installing Node.js 20..."
if command -v node &> /dev/null; then
    echo "Node.js already installed: $(node -v)"
else
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    echo "Node.js installed: $(node -v)"
fi

# ----- 4. Install pnpm -----
echo ""
echo "[4/6] Installing pnpm..."
if command -v pnpm &> /dev/null; then
    echo "pnpm already installed: $(pnpm -v)"
else
    npm install -g pnpm
    echo "pnpm installed: $(pnpm -v)"
fi

# ----- 5. Install PM2 -----
echo ""
echo "[5/6] Installing PM2..."
if command -v pm2 &> /dev/null; then
    echo "PM2 already installed: $(pm2 -v)"
else
    npm install -g pm2
    echo "PM2 installed: $(pm2 -v)"
fi

# ----- 6. Install Nginx -----
echo ""
echo "[6/6] Installing Nginx..."
if command -v nginx &> /dev/null; then
    echo "Nginx already installed: $(nginx -v 2>&1)"
else
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    echo "Nginx installed and started"
fi

# ----- Create project directory -----
echo ""
echo "Creating project directory..."
sudo mkdir -p /home/aurawebsite/logs
sudo chown -R $USER:$USER /home/aurawebsite

# ----- Summary -----
echo ""
echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo "  Node.js: $(node -v)"
echo "  npm:     $(npm -v)"
echo "  pnpm:    $(pnpm -v)"
echo "  PM2:     $(pm2 -v)"
echo "  Nginx:   $(nginx -v 2>&1)"
echo ""
echo "  Next step: Run deploy.sh to deploy the project"
echo "=========================================="
