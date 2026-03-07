# eDefense Systems - Official Website

![Build Status](https://img.shields.io/github/actions/workflow/status/edefense/edefense.github.io/deploy.yml?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Last Commit](https://img.shields.io/github/last-commit/edefense/edefense.github.io)

## 📖 About

Official static website for **eDefense Systems** - a cybersecurity company specializing in intrusion detection, intrusion prevention, antivirus protection, and network security solutions. This website showcases our product portfolio and provides information for potential customers and partners.

**Live Site**: [https://edefense.github.io](https://edefense.github.io)

## ✨ Features

### Marketing & Product Showcase
- 🎯 **Hero Section** - Compelling value proposition with call-to-action
- 🛡️ **Product Portfolio** - IDS, IPS, AntiVirus, and ICE-Core solutions
- 💼 **Company Overview** - Mission, vision, and expertise
- 📧 **Contact Form** - Lead generation with secure data handling
- 📱 **Responsive Design** - Mobile-first, works on all devices

### Technical Features
- ⚡ **Performance Optimized** - Lighthouse score >90
- ♿ **WCAG 2.1 AA Compliant** - Accessible to all users
- 🔒 **Security Hardened** - CSP, HTTPS, SRI for CDN resources
- 🚀 **Fast Loading** - Core Web Vitals in "Good" range
- 🔍 **SEO Optimized** - Structured data, semantic HTML, sitemap.xml

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern layouts (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+** - Progressive enhancem ent (no framework overhead)
- **Bootstrap 5** - Responsive UI components
- **Font Awesome** - Icon library

### Build & Deployment
- **GitHub Pages** - Static site hosting (free, HTTPS enabled)
- **GitHub Actions** - Automated CI/CD pipeline
- **npm** - Dependency management (if using build tools)

### Quality Assurance
- **Lighthouse** - Performance, accessibility, best practices audits
- **axe DevTools** - Accessibility testing
- **W3C Validator** - HTML/CSS validation
- **ESLint** - JavaScript linting

## 🚀 Quick Start

### Prerequisites
- **Git** - Version control
- **Modern Browser** - Chrome, Firefox, Safari, or Edge (latest version)
- **Text Editor** - VS Code recommended (with GitHub Copilot agents)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/edefense/edefense.github.io.git
cd edefense.github.io

# 2. Open in browser
# Option A: Use VS Code Live Server extension
# - Install "Live Server" extension
# - Right-click index.html → "Open with Live Server"

# Option B: Use Python's built-in server
python -m http.server 8000
# Visit: http://localhost:8000

# Option C: Use Node.js http-server
npx http-server -p 8000
# Visit: http://localhost:8000

# 3. Make changes to HTML/CSS/JS files

# 4. Refresh browser to see changes
```

### Deployment

```bash
# 1. Stage changes
git add .

# 2. Commit with descriptive message
git commit -m "Update product descriptions"

# 3. Push to GitHub
git push origin main

# 4. GitHub Actions automatically deploys to GitHub Pages
# Check deployment status in "Actions" tab
# Site updates in 1-5 minutes at https://edefense.github.io
```

## 📁 Project Structure

```
edefense.github.io/
├── index.html              # Homepage
├── css/
│   ├── main.css           # Main stylesheet
│   └── components/        # Component-specific styles (if using)
├── js/
│   ├── main.js            # Main JavaScript
│   └── modules/           # JavaScript modules (if using)
├── images/
│   ├── logo.svg           # eDefense Systems logo
│   ├── products/          # Product screenshots/images
│   └── icons/             # Icon assets
├── .github/
│   ├── workflows/
│   │   └── deploy.yml     # GitHub Actions CI/CD
│   └── copilot/
│       ├── code-reviewer.agent.md
│       ├── security-reviewer.agent.md
│       ├── best-practice-advisor.agent.md
│       ├── doc-maintainer.agent.md
│       └── quality-engineer.agent.md
├── .gitignore              # Git ignore rules
├── CNAME                   # Custom domain (if applicable)
├── README.md               # This file
├── SETUP.md                # GitHub Pages setup instructions
├── robots.txt              # Search engine crawler rules
├── sitemap.xml             # Site structure for SEO
└── LICENSE                 # MIT License
```

## 🏗️ GitHub Pages Setup

**New to GitHub Pages?** See comprehensive setup instructions in [SETUP.md](SETUP.md)

### Quick Setup
1. Create repository: `edefense.github.io` (organization name must match)
2. Push code to `main` branch
3. Go to **Settings** → **Pages**
4. Source: `main` branch, `/ (root)` folder
5. Wait 1-5 minutes
6. Visit: `https://edefense.github.io`

### Custom Domain (Optional)
1. Add `CNAME` file with your domain
2. Configure DNS records (A records + CNAME)
3. Enable "Enforce HTTPS" in Pages settings
4. See [SETUP.md](SETUP.md) for detailed instructions

## 🧪 Testing & Quality

### Manual Testing
```bash
# Check HTML validity
# Visit: https://validator.w3.org/
# Upload: index.html

# Test accessibility
# Install: axe DevTools browser extension
# Run audit on each page

# Run Lighthouse audit (Chrome DevTools)
# Press F12 → Lighthouse tab → Generate report
# Target: All scores >90
```

### Automated Testing (Optional)
```bash
# Install testing dependencies
npm install --save-dev playwright @axe-core/playwright lighthouse

# Run tests
npm test

# Run Lighthouse CI
npm run lighthouse
```

### Browser Compatibility
- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

## 📊 Performance Metrics

**Target Metrics** (verified with Lighthouse):
- **Performance**: >90
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: >90

**Core Web Vitals**:
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

## 🔒 Security

### Implemented Security Measures
- ✅ **HTTPS Enforced** - GitHub Pages enforces HTTPS
- ✅ **Content Security Policy** - CSP meta tags prevent XSS
- ✅ **Subresource Integrity** - SRI hashes for CDN resources
- ✅ **No Inline Scripts** - All JavaScript in external files
- ✅ **Input Sanitization** - Contact form validates/sanitizes data
- ✅ **Dependency Scanning** - Automated npm audit checks

### Security Headers (via CSP meta tag)
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net;
  style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline';
  img-src 'self' https: data:;
  font-src 'self' https://cdn.jsdelivr.net;
">
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Contribution Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-section`
3. Make changes (follow code style guidelines)
4. Test thoroughly (cross-browser, accessibility, performance)
5. Commit: `git commit -m "feat: add testimonials section"`
6. Push: `git push origin feature/new-section`
7. Open Pull Request with description

### Code Style
- **HTML**: Semantic elements, 2-space indentation, lowercase attributes
- **CSS**: BEM methodology, mobile-first, 2-space indentation
- **JavaScript**: ES6+, semicolons, 2-space indentation, JSDoc comments
- **Commits**: Conventional Commits format (`feat:`, `fix:`, `docs:`, etc.)

### Quality Requirements
- ✅ HTML validates (W3C Validator)
- ✅ Lighthouse score >90 (all categories)
- ✅ Zero accessibility violations (axe DevTools)
- ✅ Mobile responsive (test 320px-1920px)
- ✅ Cross-browser tested (Chrome, Firefox, Safari, Edge)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 eDefense Systems

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

## 📧 Contact & Support

### eDefense Systems
- **Website**: [https://edefense.github.io](https://edefense.github.io)
- **Email**: info@edefense-systems.com
- **GitHub**: [@edefense](https://github.com/edefense)
- **Issues**: [Report a Bug](https://github.com/edefense/edefense.github.io/issues)

### Project Maintainers
- **Technical Lead**: Development Team
- **Security**: Security Team
- **Documentation**: Documentation Team

### Getting Help
1. **Bug Reports**: Open an issue with detailed description
2. **Feature Requests**: Open an issue with "enhancement" label
3. **Questions**: Use Discussions tab or contact via email

## 🔗 Related Projects

### eDefense Product Suite
- **[IDS](https://github.com/rhm002/IDS)** - Intrusion Detection System with CVE management
- **[IPS](https://github.com/rhm002/IPS)** - Intrusion Prevention System with real-time threat response
- **[AntiVirus](https://github.com/rhm002/AntiVirus)** - Real-time malware detection and quarantine
- **[ICE-Core](https://github.com/rhm002/ICE-Core)** - Network packet capture and analysis engine
- **[WebSite](https://github.com/rhm002/eDefense-Website)** - Spring Boot marketing website (in development)

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

### Latest Release: v1.0.0 (2026-03-07)
- ✨ Initial static site launch
- 🎨 Modern responsive design
- 🛡️ Product showcase sections
- 📧 Contact form with validation
- ♿ WCAG 2.1 AA accessibility
- ⚡ Performance optimized (Lighthouse >90)

---

**Built with ❤️ by eDefense Systems** | Protecting your digital assets since 2026
