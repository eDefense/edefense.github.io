---
applyTo: "**"
---

# edefense.github.io — GitHub Copilot Instructions

This project is the **eDefense Systems official website** — a static HTML/CSS/JS site hosted on
GitHub Pages at [https://edefense.github.io](https://edefense.github.io).

## Project Context

- **Type**: Static website (no build tool, no framework)
- **Hosting**: GitHub Pages (branch: `main`)
- **Stack**: Plain HTML5, CSS3, vanilla JavaScript
- **Domain**: edefense.github.io (CNAME configured)
- **Purpose**: Corporate product portal — IDS, IPS, AntiVirus, ICE product showcase, contact/lead capture

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main website entry point |
| `css/` | Stylesheets |
| `js/` | Client-side JavaScript |
| `images/` | Product and site imagery |
| `sitemap.xml` | SEO sitemap |
| `robots.txt` | Search engine directives |
| `CNAME` | Custom domain configuration |
| `DNS_SETUP.md` | DNS configuration guide |
| `EMAIL_SETUP.md` | Email configuration guide |
| `SETUP.md` | Site setup and deployment guide |

## Coding Standards

1. **No inline scripts** — all JavaScript in `js/` files; no `<script>` in HTML.
2. **No inline styles** — all CSS in `css/` files; no `style=""` on elements.
3. **Semantic HTML** — use correct elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
4. **XSS prevention** — never use `innerHTML` with user-supplied data; use `textContent`.
5. **Contact form security** — validate and sanitise all form inputs client-side before submission.
6. **HTTPS only** — all external resources (fonts, analytics) must load over HTTPS.
7. **Mobile-first** — responsive breakpoints: 576px, 768px, 992px, 1200px.
8. **Accessibility** — `alt` text on all images, `aria-label` on icon-only buttons, WCAG AA contrast.

## Content Policy

- NEVER commit API keys, email credentials, or analytics tokens to the repository
- Environment-specific config (e.g., form endpoints) must use placeholder comments
- Product descriptions must be consistent with the actual product feature sets
- Contact form submissions should route through a secure backend or third-party form service — never expose email addresses in HTML source

## SEO Requirements

- `<title>` and `<meta name="description">` on every page
- `sitemap.xml` updated when new pages are added
- `robots.txt` must allow indexing of public pages
- Open Graph tags (`og:title`, `og:description`, `og:image`) on the index page

## Deployment

- Deployments are automatic on push to `main` via GitHub Pages
- No build step required — files are served directly
- `CNAME` file controls the custom domain — do not delete

## Agent Instructions

This workspace has specialised Copilot agents. When the appropriate context applies, apply these agents automatically:

- **Security audit** → use `.github/security-reviewer.agent.md`
- **Documentation generation/review** → use `.github/doc-maintainer.agent.md`

## File Naming Conventions

| Type | Location | Pattern |
|------|----------|---------|
| HTML pages | `/` | `*.html` (lowercase, kebab-case) |
| Stylesheets | `css/` | `*.css` |
| Scripts | `js/` | `*.js` |
| Images | `images/` | lowercase, descriptive names |
| Docs | `/` | `SCREAMING_SNAKE_CASE.md` |
