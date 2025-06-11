#!/bin/bash

# Auto-Pilot-Max Team Dashboard Deployment Script
# Deploy to legonow team (Pro Account)

echo "🚀 Deploying Auto-Pilot-Max Team Dashboard to legonow team..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Set team context
echo "🔧 Setting team context to legonow..."
vercel teams switch legonow

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️ Building project..."
npm run build

# Deploy to production
echo "🚀 Deploying to production..."
vercel deploy --prod --team legonow

# Set environment variables (if not already set)
echo "⚙️ Configuring environment variables..."
vercel env add NEXT_PUBLIC_MCP_SERVER_URL "https://auto-pilot-max-mcp-v2.fly.dev" production --team legonow --yes
vercel env add NEXT_PUBLIC_USER_EMAIL "colby@bit9.ai" production --team legonow --yes
vercel env add NEXT_PUBLIC_USER_ID "Q11wu5ZabHa2JdfCqzIQcUxM" production --team legonow --yes
vercel env add NEXT_PUBLIC_ENABLE_ANALYTICS "true" production --team legonow --yes
vercel env add NEXT_PUBLIC_REFRESH_INTERVAL "30000" production --team legonow --yes

# Sensitive environment variable (prompt for admin key)
echo "🔐 Setting MCP Admin Key (enter when prompted)..."
vercel env add MCP_ADMIN_KEY production --team legonow

echo "✅ Deployment complete! 🎉"
echo ""
echo "📊 Dashboard URL: https://auto-pilot-max-team-dashboard-legonow.vercel.app"
echo "🔧 Team: legonow (Pro Account)"
echo "👤 Contact: colby@bit9.ai"
echo ""
echo "Next steps:"
echo "1. Visit your dashboard URL"
echo "2. Add team members by department"
echo "3. Generate API keys for each department"
echo "4. Monitor team performance in real-time"
echo ""
echo "🚀 Your 378x acceleration system is ready for team use!" 