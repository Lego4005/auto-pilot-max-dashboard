# 🚀 Auto-Pilot-Max Team Dashboard

Professional team management dashboard for Auto-Pilot-Max MCP system with GitHub integration, real-time analytics, and department-based organization.

![Team Dashboard](https://img.shields.io/badge/Status-Live-brightgreen)
![Bun](https://img.shields.io/badge/Bun-Lightning%20Fast-orange)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vercel](https://img.shields.io/badge/Vercel-Ready-black)

## ✨ Features

- **🎯 Professional Team Management** - Department-based organization (Engineering, Design, Product, DevOps, etc.)
- **⚡ Real-time Analytics** - Live usage tracking and performance metrics
- **🔗 GitHub Integration** - Track commits, PRs, and development velocity
- **📊 MCP Correlation** - Monitor 378x acceleration alongside development output
- **🔐 Secure API Keys** - Department-based key generation and management
- **📱 Responsive Design** - Beautiful UI with Tailwind CSS and Radix components
- **🚀 Blazing Fast** - Built with Bun for lightning deployments

## 🚀 Quick Deploy

### Option 1: One-Click Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Lego4005/auto-pilot-max-dashboard&env=NEXT_PUBLIC_MCP_SERVER_URL,MCP_ADMIN_KEY,GITHUB_TOKEN&envDescription=Configure%20MCP%20server%20and%20GitHub%20integration&demo-title=Auto-Pilot-Max%20Dashboard&demo-description=Professional%20team%20management%20for%20MCP%20systems)

### Option 2: Manual Deployment

```bash
# Clone repository
git clone https://github.com/Lego4005/auto-pilot-max-dashboard.git
cd auto-pilot-max-dashboard

# Install dependencies with Bun (recommended)
bun install

# Or use npm/yarn
npm install

# Build and deploy
bun run deploy:legonow
```

## ⚙️ Environment Variables

Create a `.env.local` file with these variables:

```bash
# Required: MCP Server Configuration
NEXT_PUBLIC_MCP_SERVER_URL=https://your-mcp-server.fly.dev
MCP_ADMIN_KEY=your-admin-key

# Required: Team Information  
NEXT_PUBLIC_USER_EMAIL=your-email@company.com
NEXT_PUBLIC_USER_ID=your-user-id
VERCEL_TEAM=your-team-slug

# Optional: GitHub Integration
GITHUB_TOKEN=ghp_your-github-personal-access-token

# Optional: Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_REFRESH_INTERVAL=30000
```

## 🔧 GitHub Integration Setup

1. **Create GitHub Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo`, `read:user`, and `read:org` scopes
   - Add token to `GITHUB_TOKEN` environment variable

2. **Configure Repository**:
   - Update the repository owner/name in `/api/github/stats/route.ts`
   - Set up webhooks for real-time updates (optional)

3. **Team Correlation**:
   - GitHub usernames are matched with team member emails
   - Development velocity correlates with MCP usage automatically

## 🏗️ Architecture

```
vercel-dashboard/
├── src/
│   ├── app/
│   │   ├── api/github/         # GitHub integration APIs
│   │   ├── globals.css         # Global styles with Tailwind
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main dashboard
│   ├── components/
│   │   ├── ui/                 # Radix UI components
│   │   ├── github-activity.tsx # GitHub analytics
│   │   ├── team-member-card.tsx # Team management
│   │   └── usage-chart.tsx     # Performance charts
│   └── lib/
│       └── utils.ts            # Utilities and helpers
├── package.json                # Bun-optimized dependencies
├── tailwind.config.js          # Tailwind configuration
├── vercel.json                 # Vercel deployment config
└── deploy.sh                   # Team deployment script
```

## 🎨 UI Components

Built with professional-grade components:

- **Team Management**: Department filtering, role-based access
- **Analytics Dashboard**: Real-time usage charts and metrics  
- **GitHub Activity**: Commit tracking, PR analysis, velocity correlation
- **Performance Metrics**: MCP acceleration and success rates
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 📊 Analytics Features

### Team Performance
- **Usage Tracking**: API calls per member and department
- **Acceleration Metrics**: 378x factor monitoring
- **Success Rates**: Error tracking and performance insights
- **Department Analytics**: Cross-team comparisons

### GitHub Integration
- **Commit Analysis**: Track commits, files changed, lines of code
- **Pull Request Monitoring**: PR creation, review, and merge tracking
- **Development Velocity**: Correlate GitHub activity with MCP usage
- **Team Productivity**: Identify high-performing combinations

## 🚀 Deployment Options

### Vercel (Recommended)
- Optimized for Next.js with edge functions
- Built-in environment variable management
- Automatic deployments from GitHub
- Team collaboration features

### Other Platforms
- **Netlify**: Use `npm run build && npm run export`
- **Railway**: Docker deployment ready
- **Fly.io**: Can integrate with existing MCP infrastructure

## 🔐 Security

- **API Key Management**: Secure generation and storage
- **Environment Isolation**: Separate dev/staging/production configs
- **Access Control**: Role-based permissions system
- **Rate Limiting**: Built-in protection against abuse

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Auto-Pilot-Max**: 378x development acceleration
- **MetaMCP**: Inspiration for professional MCP UX
- **legonow Team**: Pro account and deployment infrastructure
- **Vercel**: Blazing fast hosting platform
- **Bun**: Lightning-fast JavaScript runtime

---

**Live Dashboard**: https://autopilot-goa21patc-legonow.vercel.app

Built with ❤️ for the Auto-Pilot-Max ecosystem