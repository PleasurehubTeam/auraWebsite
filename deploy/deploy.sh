#!/bin/bash
# ==============================================
# Aura Website - Deploy / Update Script
# ==============================================
# Run this script for first deploy and subsequent updates
# Usage: bash deploy.sh
# ==============================================

set -e

APP_DIR="/home/aurawebsite"
REPO_URL=""  # <-- Fill in your git repo URL here

echo "=========================================="
echo "  Aura Website - Deploy"
echo "=========================================="

cd "$APP_DIR"

# ----- Clone or Pull -----
if [ ! -f "$APP_DIR/package.json" ]; then
    echo ""
    echo "[1/4] Cloning repository..."
    if [ -z "$REPO_URL" ]; then
        echo "ERROR: REPO_URL is empty. Please edit this script and set your git repo URL."
        exit 1
    fi
    git clone "$REPO_URL" .
else
    echo ""
    echo "[1/4] Pulling latest code..."
    git pull
fi

# ----- Install dependencies -----
echo ""
echo "[2/4] Installing dependencies..."
pnpm install --frozen-lockfile

# ----- Build -----
echo ""
echo "[3/4] Building project..."
pnpm build

# ----- Restart with PM2 -----
echo ""
echo "[4/4] Starting/Restarting PM2 process..."
mkdir -p "$APP_DIR/logs"

if pm2 describe aura-website > /dev/null 2>&1; then
    pm2 restart ecosystem.config.js
    echo "PM2 process restarted"
else
    pm2 start ecosystem.config.js
    pm2 save
    echo "PM2 process started for the first time"
    echo ""
    echo "Setting up PM2 startup (auto-start on reboot)..."
    pm2 startup | tail -1
    echo ""
    echo ">>> Run the command above if prompted <<<"
fi

echo ""
echo "=========================================="
echo "  Deploy Complete!"
echo "=========================================="
echo ""
pm2 status
echo ""
echo "  App running at: http://localhost:3000"
echo "  Logs: pm2 logs aura-website"
echo "=========================================="
