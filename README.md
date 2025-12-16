# 🎫 MlangoniTix

<div align="center">

![MlangoniTix Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**A modern, AI-powered digital ticketing platform for events**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Production Build](#production-build)
- [Architecture](#architecture)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**MlangoniTix** is a modern digital event ticketing platform that enables event organizers to create and manage events while providing attendees with a seamless ticket purchasing experience. The platform features an AI-powered concierge to answer event-related questions and QR code-based ticket verification.

### Key Highlights

- 🎨 Modern, responsive UI with dark/light theme support
- 🤖 AI-powered event concierge using Google Gemini
- 🎟️ QR code-based ticket generation and verification
- 👥 Role-based access control (Admin, Manager, User)
- 📊 Comprehensive admin dashboard for event management
- ⚡ Built with cutting-edge technologies (React 19, TypeScript, Vite)

---

## ✨ Features

### For Event Attendees
- Browse upcoming events across multiple categories
- View detailed event information
- Ask questions about events using AI concierge
- Purchase tickets with instant QR code generation
- Manage purchased tickets
- Dark/Light theme preference

### For Event Organizers
- Create and manage events
- Track ticket sales and revenue
- Verify tickets using QR scanner
- Event analytics dashboard
- Cancel events with automatic refund processing

### For System Administrators
- Platform-wide event management
- User management interface
- System-wide analytics
- Multi-tenant support

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.3** - UI library
- **TypeScript 5.8** - Type-safe JavaScript
- **Vite 6.2** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### AI Integration
- **Google Gemini 2.5 Flash** - AI-powered event concierge

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript Strict Mode** - Enhanced type checking

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git**

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mlangoni_tix.git
cd mlangoni_tix
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> **Get your API key:** Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to obtain your Gemini API key.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |
| `VITE_APP_NAME` | Application name | No |
| `VITE_APP_ENV` | Environment (development/production) | No |

### Example `.env.local`

```env
# Gemini API Configuration
GEMINI_API_KEY=AIza...your_key_here

# Application Configuration
VITE_APP_NAME=MlangoniTix
VITE_APP_ENV=development
```

> ⚠️ **Security Warning:** Never commit `.env.local` or any file containing API keys to version control!

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |

### Development Workflow

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Make changes** to the code

3. **Run linting and type checking:**
   ```bash
   npm run lint
   npm run type-check
   ```

4. **Format your code:**
   ```bash
   npm run format
   ```

---

## 🏗️ Production Build

### Building for Production

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

### Preview Production Build Locally

```bash
npm run preview
```

### Deployment

The application can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Configure GitHub Actions (see `.github/workflows/`)
- **Docker**: Use the provided `Dockerfile`

---

## 📐 Architecture

### Project Structure

```
mlangoni_tix/
├── components/          # React components
│   ├── ErrorBoundary.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── EventCard.tsx
│   ├── TicketModal.tsx
│   ├── AdminDashboard.tsx
│   └── ...
├── services/           # Business logic and API calls
│   └── geminiService.ts
├── types.ts            # TypeScript type definitions
├── constants.ts        # Application constants
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
└── package.json        # Dependencies and scripts
```

### Component Architecture

- **App.tsx**: Main application logic and routing
- **ErrorBoundary**: Global error handling
- **Navbar**: Navigation and authentication
- **Hero**: Landing page hero section
- **EventCard**: Event display component
- **TicketModal**: Ticket purchase flow with AI concierge
- **AdminDashboard**: Event management interface

---

## 🔒 Security Considerations

### Current Limitations (Demo Version)

⚠️ **This is a DEMO application with the following security limitations:**

1. **Client-Side API Keys**: The Gemini API key is exposed in the client bundle
2. **No Backend**: All logic runs client-side with no persistence
3. **Simulated Authentication**: Login is simulated, not real authentication
4. **No Payment Processing**: Payment flow is simulated
5. **No Rate Limiting**: AI service can be abused

### Production Requirements

For a production deployment, you MUST implement:

1. **Backend API Server**
   - Move API calls server-side
   - Implement proper authentication (JWT, OAuth)
   - Add rate limiting and request validation

2. **Database**
   - Persistent data storage
   - User authentication and sessions
   - Transaction logging

3. **Payment Integration**
   - Stripe, PayPal, or similar payment processor
   - PCI compliance for card data
   - Secure webhook handling

4. **Security Headers**
   - Content Security Policy (CSP)
   - CORS configuration
   - XSS protection

5. **Monitoring & Logging**
   - Error tracking (Sentry, LogRocket)
   - Analytics (Google Analytics, Mixpanel)
   - Performance monitoring (Web Vitals)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests and linting: `npm run lint && npm run type-check`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Follow the existing code style
- Run `npm run format` before committing
- Ensure all tests pass
- Add tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**MlangoniTix Team**

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons

---

## 📞 Support

For support, please open an issue in the GitHub repository or contact us at support@mlangonitix.com

---

## 🗺️ Roadmap

- [ ] Backend API implementation
- [ ] Real authentication system
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Seat selection for venues
- [ ] Integration with calendar apps
- [ ] Social media sharing

---

<div align="center">

**Made with ❤️ by the MlangoniTix Team**

[⬆ Back to Top](#-mlangonitix)

</div>
