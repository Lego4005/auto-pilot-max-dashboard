# Auto-Pilot-Max Team Dashboard

Professional team management dashboard for Auto-Pilot-Max MCP system with department-based API key generation and real-time analytics.

## Quick Deploy to Vercel

### Prerequisites

- **Vercel Team**: **legonow** (Pro Account)
- **User**: lego4005
- User email: **<colby@bit9.ai>**
- User ID: **Q11wu5ZabHa2JdfCqzIQcUxM**
- MCP Server: **auto-pilot-max-mcp-v2.fly.dev**

### 1-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/vercel-dashboard&team-slug=legonow)

### Manual Deployment

```bash
# Clone and deploy to legonow team
cd vercel-dashboard
npm install
vercel deploy --team legonow

# Set environment variables during deployment:
# NEXT_PUBLIC_MCP_SERVER_URL: https://auto-pilot-max-mcp-v2.fly.dev
# MCP_ADMIN_KEY: autopilot-admin-64dd7aa8c9b0454a
# NEXT_PUBLIC_USER_EMAIL: colby@bit9.ai
# NEXT_PUBLIC_USER_ID: Q11wu5ZabHa2JdfCqzIQcUxM
```

## Features

### Department-Based API Key Management

- **Engineering**: `autopilot-engineering-{role}-{id}`
- **Design**: `autopilot-design-{role}-{id}`
- **Product**: `autopilot-product-{role}-{id}`
- **Data Science**: `autopilot-datascience-{role}-{id}`
- **DevOps**: `autopilot-devops-{role}-{id}`
- **QA**: `autopilot-qa-{role}-{id}`
- **Management**: `autopilot-management-{role}-{id}`

### Real-Time Analytics

- Team performance metrics (refreshes every 30s)
- Usage tracking and quotas
- Department filtering and role management
- Export functionality for reports

### Security Features

- Protected API key generation
- Role-based access control (Admin, Developer, Team Lead, Viewer)
- Usage quota enforcement
- Audit logging

## Configuration

### Environment Variables

```bash
# Required
NEXT_PUBLIC_MCP_SERVER_URL=https://auto-pilot-max-mcp-v2.fly.dev
MCP_ADMIN_KEY=autopilot-admin-64dd7aa8c9b0454a
NEXT_PUBLIC_USER_EMAIL=colby@bit9.ai
NEXT_PUBLIC_USER_ID=Q11wu5ZabHa2JdfCqzIQcUxM

# Optional
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_REFRESH_INTERVAL=30000
VERCEL_TEAM=legonow
```

### Vercel Project Settings

1. **Framework Preset**: Next.js
2. **Node.js Version**: 18.x
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`
5. **Install Command**: `npm install`
6. **Team**: legonow (Pro Account)

## API Integration

The dashboard connects to your existing Fly.io MCP server:

```typescript
// API endpoints available:
// GET /api/team - List all team members
// POST /api/team/member - Add new team member
// PUT /api/team/member/:id - Update member
// DELETE /api/team/member/:id - Remove member
// GET /api/analytics - Get usage analytics
// POST /api/keys/generate - Generate department API key
```

## Usage Quotas

- **Standard**: 10,000 requests/month
- **Premium**: 50,000 requests/month  
- **Unlimited**: No limits (Management/Admin only)

## Development

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Team Roles

1. **Admin**: Full access, can manage all departments
2. **Team Lead**: Department management, view analytics
3. **Developer**: Standard access, own department only
4. **Viewer**: Read-only access, basic analytics

## Support

- **Primary Contact**: <colby@bit9.ai>
- **Vercel Team**: legonow (Pro Account)
- **Team Member**: lego4005
- **MCP Server**: auto-pilot-max-mcp-v2.fly.dev
- **Admin Key**: autopilot-admin-64dd7aa8c9b0454a

## Architecture

```
Vercel Dashboard (Frontend)
    ↓ API calls
Fly.io MCP Server (Backend)
    ↓ SQLite Database
Team Management + Analytics
```

## Next Steps

1. Deploy to Vercel using the **legonow** team (Pro Account)
2. Configure environment variables with provided credentials
3. Add team members through the dashboard
4. Generate department-specific API keys
5. Monitor usage through real-time analytics

The dashboard will be accessible at your Vercel domain under the **legonow** team and will provide full team management for your Auto-Pilot-Max system with 378x acceleration capabilities.
