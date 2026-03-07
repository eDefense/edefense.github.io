# GitHub Pages Setup Guide - eDefense Systems

## Repository Creation

### Step 1: Create GitHub Repository

1. **Navigate to GitHub**: Go to https://github.com/new
2. **Repository Name**:
   - For organization site: `edefense.github.io` (assuming organization name is "edefense")
   - For personal site: `username.github.io` (replace with your GitHub username)
3. **Visibility**: Set to **Public** (required for free GitHub Pages)
4. **Initialize Repository**:
   - ✅ Add README file
   - ✅ Add .gitignore (select "Node" template)
   - ✅ Choose license (MIT License recommended)
5. **Click**: "Create repository"

### Step 2: Clone Repository Locally

```bash
# Clone the repository (replace 'edefense' with your organization/username)
git clone https://github.com/edefense/edefense.github.io.git

# Navigate into the repository
cd edefense.github.io
```

### Step 3: Add Project Files

```bash
# Copy your static site files to the repository
# Your directory structure should look like:
# edefense.github.io/
# ├── index.html
# ├── css/
# ├── js/
# ├── images/
# └── README.md

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit: eDefense Systems static site"

# Push to GitHub
git push origin main
```

### Step 4: Enable GitHub Pages

1. **Go to Repository Settings**:
   - Navigate to your repository on GitHub
   - Click **Settings** tab (top right)

2. **Access Pages Settings**:
   - In the left sidebar, click **Pages**

3. **Configure Source**:
   - Under "Source" section:
     - Branch: Select **`main`**
     - Folder: Select **`/ (root)`**
   - Click **Save**

4. **Wait for Deployment**:
   - Initial deployment takes 1-5 minutes
   - GitHub will display: "Your site is live at https://edefense.github.io"
   - Check deployment status in **Actions** tab

### Step 5: Verify Deployment

1. **Check Actions Tab**:
   - Click **Actions** tab in repository
   - Look for "pages build and deployment" workflow
   - Wait until green checkmark appears (✅ Success)

2. **Visit Your Site**:
   - Open browser to: `https://edefense.github.io`
   - Site should load within 1-10 minutes

## Custom Domain Configuration (Optional)

### Step 1: Add CNAME File

Create a file named `CNAME` in the root of your repository with your custom domain:

```bash
# Create CNAME file
echo "www.edefense-systems.com" > CNAME

# OR for apex domain
echo "edefense-systems.com" > CNAME

# Commit and push
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

### Step 2: Configure DNS Records

Log in to your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare) and add these DNS records:

**For Apex Domain (edefense-systems.com)**:
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     edefense.github.io
```

**For WWW Subdomain Only (www.edefense-systems.com)**:
```
Type    Name    Value
CNAME   www     edefense.github.io
```

### Step 3: Enable Custom Domain in GitHub

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter: `www.edefense-systems.com`
3. Click **Save**
4. Wait for DNS check (may take 24-48 hours)
5. Once verified, enable **"Enforce HTTPS"**

### Step 4: Verify DNS Propagation

```bash
# Check DNS propagation (may take up to 48 hours)
nslookup www.edefense-systems.com

# Or use online tool: https://dnschecker.org
```

## Automated Deployment with GitHub Actions

### Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests
3. Click **Save**

## Branch Protection Rules (Recommended)

### Protect Main Branch

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Branch name pattern: `main`
4. Enable rules:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
5. Click **Create**

## Troubleshooting

### Issue: 404 Error on GitHub Pages

**Possible Causes**:
- `index.html` not in root directory or `/docs` folder
- Wrong branch/folder selected in Pages settings
- Site not yet deployed (wait 5-10 minutes)

**Solutions**:
1. Verify `index.html` exists in correct location
2. Check **Settings** → **Pages** for correct source
3. Check **Actions** tab for deployment status
4. Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)

### Issue: Changes Not Appearing

**Solutions**:
1. Clear browser cache and hard refresh
2. Check **Actions** tab for deployment completion
3. Wait 5-10 minutes for GitHub Pages cache
4. Check commit was pushed (`git log origin/main`)

### Issue: CSS/JavaScript Not Loading

**Possible Causes**:
- Incorrect file paths (relative vs absolute)
- Case sensitivity (GitHub Pages is case-sensitive)
- Mixed content (HTTP resources on HTTPS page)

**Solutions**:
1. Use absolute paths: `/css/main.css` instead of `css/main.css`
2. Verify file case matches exactly: `style.css` vs `Style.css`
3. Ensure all resources use HTTPS
4. Check browser console for errors (F12)

### Issue: Custom Domain Not Working

**Solutions**:
1. Verify CNAME file contains correct domain
2. Check DNS records are correct (use `nslookup` or `dig`)
3. Wait 24-48 hours for DNS propagation
4. Verify domain is not already in use by another GitHub Pages site
5. Check DNS provider documentation for specific instructions

### Issue: Build Failing in GitHub Actions

**Solutions**:
1. Check **Actions** tab for error messages
2. Verify `package.json` scripts are correct
3. Ensure all dependencies are in `package.json`
4. Test build locally: `npm run build`
5. Check Node.js version compatibility

## Best Practices

### Security
- ✅ Enable **"Enforce HTTPS"** in Pages settings
- ✅ Add Content Security Policy meta tags
- ✅ Use Subresource Integrity (SRI) for CDN resources
- ✅ Run `npm audit` regularly for vulnerabilities
- ✅ Never commit secrets, API keys, or passwords

### Performance
- ✅ Optimize images (WebP format, < 500KB total)
- ✅ Minify CSS and JavaScript
- ✅ Use CDN for large libraries (Bootstrap, jQuery)
- ✅ Enable browser caching
- ✅ Lazy load images and videos

### SEO
- ✅ Include meta description and keywords
- ✅ Create `sitemap.xml` and submit to search engines
- ✅ Add `robots.txt` file
- ✅ Use semantic HTML (H1-H6 hierarchy)
- ✅ Add Open Graph and Twitter Card meta tags

### Maintenance
- ✅ Update dependencies monthly (`npm update`)
- ✅ Run Lighthouse audits quarterly
- ✅ Monitor GitHub Dependabot alerts
- ✅ Keep documentation up-to-date
- ✅ Review and respond to Issues/PRs

## Useful Commands

```bash
# Check repository status
git status

# Pull latest changes
git pull origin main

# Add all files
git add .

# Commit with message
git commit -m "Update hero section design"

# Push to GitHub
git push origin main

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/new-section

# Merge branch
git checkout main
git merge feature/new-section

# Delete branch
git branch -d feature/new-section
```

## Resources

### Official Documentation
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Tools
- [DNS Checker](https://dnschecker.org) - Verify DNS propagation
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing
- [W3C Validator](https://validator.w3.org/) - HTML validation
- [SSL Labs](https://www.ssllabs.com/ssltest/) - HTTPS/SSL testing

### Support
- [GitHub Community Forum](https://github.community/)
- [Stack Overflow (GitHub Pages)](https://stackoverflow.com/questions/tagged/github-pages)
- [GitHub Status](https://www.githubstatus.com/) - Check service status

---

**Need Help?** Open an issue on the repository or contact the development team.
