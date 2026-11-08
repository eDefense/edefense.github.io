# edefense.github.io

Official static marketing website for eDefense Systems, served by GitHub Pages at https://edefense.github.io (custom domain via `CNAME`). Plain HTML / CSS / JS — no build step, no framework.

## Layout

`index.html`, `css/`, `js/`, `images/`, `dns/`, `sitemap.xml`, `robots.txt`, `CNAME`. Setup notes: `SETUP.md`, `DNS_SETUP.md`, `EMAIL_SETUP.md`. History: `CHANGELOG.md`.

## Preview

Open `index.html` or serve the folder, e.g. `python -m http.server 8000`.

## Rules

- Pushes to `main` deploy the live site (GitHub Actions `deploy.yml`). Never commit to `main` directly — use a feature branch and PR.
- **Do not edit or delete `CNAME`** — it would break the custom domain.
- When pages or products are added, update `sitemap.xml` and `CHANGELOG.md`.
- Keep the site static and dependency-light; no secrets, tracking keys or personal data in the repo.
- Keep product claims consistent with `Documentation/` (the product docs are the source of truth).
- Preserve accessibility: alt text, heading order, colour contrast, keyboard focus.
