# C2S2 Agent 🤖

A specialized AI-powered web application that serves as an expert assistant for Amazon's Customs Clearance and Shipping Services (C2S2) between UK and EU marketplaces. It helps FBA sellers navigate complex shipping requirements, customs compliance, and logistics processes through an intelligent chat interface powered by Anthropic's Claude AI.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://c2s2-agent-7qwm0avqa-mason-woods-projects-44f9efc8.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/16mlwood-afk/c2s2-agent)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC)](https://tailwindcss.com/)

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Development Setup](#️-development-setup)
- [📦 Available Scripts](#-available-scripts)
- [🚀 Deployment](#-deployment)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🧠 AI Knowledge Base](#-ai-knowledge-base)
- [🔒 Security](#-security)
- [🧪 Testing](#-testing)
- [🚧 Known Issues & Roadmap](#-known-issues--roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended: 20.x)
- Git
- Anthropic API key ([get one here](https://console.anthropic.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/16mlwood-afk/c2s2-agent.git
cd c2s2-agent

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app running locally!

## ✨ Features

### 🤖 AI-Powered Assistance
- Real-time chat with Claude AI specialized in C2S2 shipping
- Comprehensive knowledge base covering all Amazon shipping solutions
- Intelligent responses based on official Amazon documentation

### 📦 Shipping Solutions Coverage
- **ATS (Rochester/LCY8)**: Small parcels via sort centre
- **UPS AVASK**: Direct carrier integration with account numbers
- **RXO AVASK**: Pallet shipping with customs compliance
- **Customs Requirements**: SKU-level compliance and documentation

### 🎨 Modern UI/UX
- Beautiful, responsive design with Tailwind CSS
- Mobile-first approach with progressive enhancement
- Accessible components with proper semantic HTML
- Smooth animations and loading states

### 🔧 Developer Experience
- Hot reload development server
- CORS proxy for local API testing
- Vercel serverless functions for production
- Comprehensive error handling and logging

## 🏗️ Architecture

### Frontend Stack
- **Framework:** React 19.2.0 with Create React App
- **Styling:** Tailwind CSS 3.4.18 with PostCSS
- **Icons:** Lucide React
- **State Management:** React hooks (useState, useEffect, useRef)
- **HTTP Client:** Native fetch API with CORS handling

### Backend Stack
- **Runtime:** Vercel Serverless Functions (Node.js)
- **AI Integration:** Anthropic Claude API (claude-sonnet-4-20250514)
- **CORS Handling:** Server-side proxy with comprehensive headers
- **Security:** Environment variables for API keys

### Infrastructure
- **Deployment:** Vercel with global CDN
- **Version Control:** Git with GitHub
- **CI/CD:** Automated Vercel deployments
- **Monitoring:** Vercel Analytics (available)

## 🛠️ Development Setup

### Local Development

```bash
# Install dependencies
npm install

# Start with proxy server (recommended for API testing)
npm run dev

# Alternative: Use Vercel dev server
npm run dev:vercel
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Anthropic API Key
# Get your key from: https://console.anthropic.com/
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### API Endpoints

The app automatically detects the environment:

- **Development:** `http://localhost:3001/api/anthropic/v1/messages` (proxy server)
- **Production:** `/api/chat` (Vercel serverless function)

## 📦 Available Scripts

```bash
# Development
npm start              # React development server only
npm run proxy          # CORS proxy server for API testing
npm run dev            # Both React + proxy servers concurrently
npm run dev:vercel     # Vercel development environment

# Production
npm run build          # Create production build
npm run deploy         # Deploy to Vercel production

# Testing
npm test               # Run test suite

# Utilities
npm run eject          # Eject from Create React App (irreversible)
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Login to Vercel
vercel login

# Link project (first time only)
vercel link

# Add environment variable
vercel env add ANTHROPIC_API_KEY

# Deploy to production
npm run deploy
```

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy build folder to any static hosting service
# (Netlify, GitHub Pages, AWS S3, etc.)
```

## 📁 Project Structure

```
c2s2-agent/
├── api/
│   └── chat.js              # Vercel serverless function
├── public/
│   ├── index.html          # Main HTML template
│   ├── favicon.ico         # App favicon
│   └── [assets...]         # Static files
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Component styles
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles + Tailwind
│   └── [other files...]    # Additional React files
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## 🔧 Configuration

### Tailwind CSS (`tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

### PostCSS Configuration (`postcss.config.js`)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🧠 AI Knowledge Base

The C2S2 Agent includes a comprehensive knowledge base covering:

### Shipping Solutions
- **ATS (Rochester/LCY8)**: Small parcels via UK sort centre
- **UPS AVASK**: Direct carrier integration with specific account numbers
- **RXO AVASK**: Pallet shipping via AVASK portal

### Process Workflows
- **6-Step Shipping Process**: Create → Customs → Labels → Collection → Track → Pay
- **Customs Compliance**: SKU-level requirements and documentation
- **Technical Specifications**: Box dimensions, weight limits, pallet requirements

### Support Resources
- **C2S2 Support**: c2s2-customer-service@amazon.co.uk
- **RXO Contacts**: upsamazon@ups.com, tgibbons@ups.com
- **Key Numbers**: 200 parcel limit, 2-day review period, 10% loyalty discount

## 🔒 Security

### API Key Management
- ✅ API keys stored in environment variables (never in code)
- ✅ Vercel environment variables are encrypted
- ✅ Client-side storage uses localStorage (user's responsibility)
- ✅ No sensitive data exposed in repository

### CORS Configuration
- ✅ Serverless function handles all CORS headers
- ✅ Development proxy server configured for local testing
- ✅ Preflight requests properly handled

### Best Practices
- ✅ Sensitive files in `.gitignore`
- ✅ No hardcoded secrets
- ✅ Secure API key transmission
- ✅ Error handling prevents information leakage

## 🧪 Testing

```bash
# Run test suite
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API endpoint and data flow tests
- **E2E Tests**: User interaction flow tests (future)

## 🚧 Known Issues & Roadmap

### Current Limitations
- [ ] API key must be provided by users
- [ ] No conversation history persistence
- [ ] Rate limiting not implemented
- [ ] Single language support (English only)

### High Priority Features
- [ ] User authentication system
- [ ] Conversation history with local storage
- [ ] Error boundaries for better UX
- [ ] Rate limiting and abuse prevention

### Future Enhancements
- [ ] Multi-language support (German, French)
- [ ] Document template generators
- [ ] Cost calculator for shipping estimates
- [ ] Real-time shipment tracking
- [ ] Progressive Web App features
- [ ] Admin dashboard for bulk operations

### Technical Improvements
- [ ] TypeScript migration
- [ ] State management (Context/Redux)
- [ ] Performance monitoring
- [ ] Code splitting and lazy loading
- [ ] Comprehensive test suite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use semantic HTML and accessible components
- Maintain Tailwind CSS class organization
- Keep functions focused and well-documented
- Test all changes locally before committing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anthropic** for the Claude AI API
- **Amazon** for C2S2 shipping services documentation
- **Vercel** for hosting and serverless functions
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/16mlwood-afk/c2s2-agent/issues)
- **Discussions**: [GitHub Discussions](https://github.com/16mlwood-afk/c2s2-agent/discussions)
- **Email**: [Project Owner](mailto:16mlwood-afk@github.com)

---

**Built with ❤️ using React, Tailwind CSS, and Claude AI**

⭐ **Star this repo** if you find it helpful!
