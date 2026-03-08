# DNS Setup Guide for edefense.nz

**Domain**: edefense.nz
**Hosting**: GitHub Pages
**Repository**: eDefense/edefense.github.io
**Last Updated**: March 7, 2026

## 📋 Overview

This guide provides step-by-step instructions for configuring DNS records to point your custom domain `edefense.nz` to GitHub Pages. After completing this setup, your website will be accessible at:

- **Primary**: https://www.edefense.nz
- **Apex/Root**: https://edefense.nz (redirects to www)

## ⏱️ Time Required

- **DNS Configuration**: 10-15 minutes
- **DNS Propagation**: 1-48 hours (typically 4-6 hours)
- **HTTPS Certificate**: Automatic (after DNS propagates)

## 📝 Prerequisites

Before starting, ensure you have:

- [ ] **Domain Registered**: edefense.nz purchased from a domain registrar
- [ ] **Registrar Access**: Login credentials for your domain registrar
- [ ] **GitHub Repository**: edefense.github.io repository created and deployed
- [ ] **Repository Permissions**: Admin access to the GitHub repository

## 🎯 DNS Configuration Strategy

GitHub Pages supports two approaches for custom domains:

### Option A: www Subdomain (Recommended) ⭐

**Pros**:
- ✅ Faster performance (CDN can be configured more easily)
- ✅ More flexible (easier to change hosting providers)
- ✅ Industry standard for web services
- ✅ Better cookie scope control

**Cons**:
- ❌ Requires CNAME record (most registrars support this)
- ❌ Slightly longer URL

**Configuration**:
- Primary URL: https://www.edefense.nz
- Apex redirects to www automatically

### Option B: Apex Domain (edefense.nz)

**Pros**:
- ✅ Shorter, cleaner URL
- ✅ Looks more professional to some users

**Cons**:
- ❌ Requires A records (less flexible)
- ❌ If GitHub changes IPs, you must update manually
- ❌ Can't use CNAME at apex (DNS limitation)

**Configuration**:
- Primary URL: https://edefense.nz
- www subdomain points to apex

**Recommendation**: Use **Option A (www subdomain)** for best performance and flexibility.

## 🚀 Step-by-Step Setup

### Step 1: Create CNAME File in Repository

The CNAME file tells GitHub Pages which custom domain to use.

1. **Navigate to Repository Root**:
   ```bash
   cd d:\GIT\eDefense\edefense.github.io
   ```

2. **Create CNAME File**:

   **For www subdomain (Recommended)**:
   ```bash
   echo www.edefense.nz > CNAME
   ```

   **OR for apex domain**:
   ```bash
   echo edefense.nz > CNAME
   ```

3. **Verify File Contents**:
   ```bash
   cat CNAME
   # Should output: www.edefense.nz (or edefense.nz)
   ```

4. **Commit and Push**:
   ```bash
   git add CNAME
   git commit -m "Add CNAME file for custom domain configuration"
   git push origin main
   ```

**Important Notes**:
- ⚠️ CNAME file must contain **only one domain** (no http://, no trailing slash)
- ⚠️ CNAME file must be in the **repository root** (not in subdirectories)
- ⚠️ CNAME file is **case-sensitive** (use lowercase)

### Step 2: Configure DNS Records at Your Registrar

Now configure DNS records at your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare, etc.).

#### Option A: www Subdomain Configuration (Recommended)

**Required DNS Records**:

| Type  | Name/Host | Value/Points To        | TTL  | Priority |
|-------|-----------|------------------------|------|----------|
| A     | @         | 185.199.108.153        | 3600 | N/A      |
| A     | @         | 185.199.109.153        | 3600 | N/A      |
| A     | @         | 185.199.110.153        | 3600 | N/A      |
| A     | @         | 185.199.111.153        | 3600 | N/A      |
| CNAME | www       | edefense.github.io.    | 3600 | N/A      |

**Explanation**:
- **A Records (@)**: Point apex domain (edefense.nz) to GitHub Pages servers
- **CNAME (www)**: Point www subdomain to your GitHub Pages URL
- **TTL**: Time To Live (3600 seconds = 1 hour is standard)

**Notes**:
- ⚠️ Some registrars use `@` for apex/root, others use blank field or `edefense.nz`
- ⚠️ CNAME value may require trailing dot: `edefense.github.io.` (check registrar docs)
- ⚠️ Remove any existing A or CNAME records for @ and www

#### Option B: Apex Domain Configuration

**Required DNS Records**:

| Type  | Name/Host | Value/Points To        | TTL  | Priority |
|-------|-----------|------------------------|------|----------|
| A     | @         | 185.199.108.153        | 3600 | N/A      |
| A     | @         | 185.199.109.153        | 3600 | N/A      |
| A     | @         | 185.199.110.153        | 3600 | N/A      |
| A     | @         | 185.199.111.153        | 3600 | N/A      |
| CNAME | www       | edefense.github.io.    | 3600 | N/A      |

**Explanation**:
- **A Records (@)**: Point apex domain to GitHub Pages
- **CNAME (www)**: Point www to GitHub Pages (for users who type www)

### Step 3: Registrar-Specific Instructions

#### GoDaddy

1. Log in to [GoDaddy Account Manager](https://account.godaddy.com/)
2. Navigate to: **My Products** → **Domains** → **edefense.nz**
3. Click **DNS** or **Manage DNS**
4. Find existing A records for `@` and click **Edit** or **Delete**
5. Add new A records:
   - Click **Add** → Select **A Record**
   - **Name**: @ (or leave blank)
   - **Value**: 185.199.108.153
   - **TTL**: 1 Hour
   - Repeat for all 4 IP addresses
6. Add or edit CNAME record:
   - **Name**: www
   - **Value**: edefense.github.io
   - **TTL**: 1 Hour
7. Click **Save** and wait for DNS propagation

#### Namecheap

1. Log in to [Namecheap Dashboard](https://ap.www.namecheap.com/)
2. Navigate to: **Domain List** → **edefense.nz** → **Manage**
3. Click **Advanced DNS** tab
4. Under **Host Records**, delete existing A records for `@`
5. Add new A records:
   - Click **Add New Record**
   - **Type**: A Record
   - **Host**: @
   - **Value**: 185.199.108.153
   - **TTL**: Automatic
   - Repeat for all 4 IP addresses
6. Add or edit CNAME:
   - **Type**: CNAME Record
   - **Host**: www
   - **Value**: edefense.github.io.
   - **TTL**: Automatic
7. Click **Save All Changes**

#### Cloudflare

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account → **edefense.nz** domain
3. Click **DNS** in left sidebar
4. Delete existing A records for `@` or `edefense.nz`
5. Add new A records:
   - Click **Add record**
   - **Type**: A
   - **Name**: @ (or edefense.nz)
   - **IPv4 address**: 185.199.108.153
   - **Proxy status**: DNS only (gray cloud) ⚠️ **Important: Disable proxy**
   - **TTL**: Auto
   - Repeat for all 4 IP addresses
6. Add or edit CNAME:
   - **Type**: CNAME
   - **Name**: www
   - **Target**: edefense.github.io
   - **Proxy status**: DNS only (gray cloud) ⚠️
   - **TTL**: Auto
7. Click **Save**

**Cloudflare Important Note**:
- ⚠️ **Disable Cloudflare proxy** (gray cloud icon) for GitHub Pages
- Orange cloud icon = proxied (will break GitHub Pages HTTPS)
- Gray cloud icon = DNS only (correct setting)

#### Other Registrars (Generic Instructions)

1. Log in to your domain registrar's control panel
2. Find DNS management section (may be called "DNS Settings", "Name Servers", "Zone File", or "Advanced DNS")
3. Look for options to add/edit DNS records
4. Delete any existing A records for root/apex domain
5. Add 4 new A records pointing @ to GitHub's IPs (see table above)
6. Add or edit CNAME record pointing www to edefense.github.io
7. Save changes

**Common registrar interfaces**:
- **Google Domains**: Cloud DNS → DNS → Manage Custom Records
- **Hover**: DNS tab → Add New Record
- **DNSimple**: DNS → Manage → Add Record
- **AWS Route 53**: Hosted zones → Create Record Set

### Step 4: Configure Custom Domain in GitHub

1. **Navigate to Repository Settings**:
   - Go to: https://github.com/eDefense/edefense.github.io
   - Click **Settings** tab
   - Click **Pages** in left sidebar

2. **Add Custom Domain**:
   - Under **Custom domain** section
   - Enter: `www.edefense.nz` (or `edefense.nz` if using apex)
   - Click **Save**

3. **Wait for DNS Check**:
   - GitHub will verify DNS records
   - This can take a few minutes
   - You'll see: "DNS check in progress..."
   - Once successful: "DNS check successful"

4. **Enable HTTPS** (After DNS propagates):
   - Wait for "Enforce HTTPS" checkbox to become available
   - This can take **1-48 hours** (typically 4-6 hours)
   - Once available, check **Enforce HTTPS**
   - GitHub will automatically provision SSL certificate

**Common Issues**:
- ❌ "DNS check failed" → Wait longer, DNS may not have propagated yet
- ❌ "HTTPS unavailable" → DNS not fully propagated, wait 24-48 hours
- ❌ "Improperly configured" → Double-check CNAME file and DNS records match

### Step 5: Verify DNS Configuration

Use these tools to verify DNS records are configured correctly:

#### Command Line Verification

**Windows (PowerShell)**:
```powershell
# Check A records (apex domain)
nslookup edefense.nz

# Check CNAME record (www subdomain)
nslookup www.edefense.nz

# Should see GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

**Linux/macOS (Terminal)**:
```bash
# Check A records
dig edefense.nz +short

# Check CNAME record
dig www.edefense.nz +short

# Detailed query
dig edefense.nz ANY
```

#### Online Tools

1. **DNS Checker** (https://dnschecker.org/)
   - Enter: `edefense.nz`
   - Check global propagation status
   - Green checkmarks = DNS propagated in that region

2. **MXToolbox** (https://mxtoolbox.com/DNSLookup.aspx)
   - Enter: `edefense.nz`
   - Click "DNS Lookup"
   - Verify A records match GitHub IPs

3. **What's My DNS** (https://www.whatsmydns.net/)
   - Enter: `www.edefense.nz`
   - Type: CNAME
   - Check worldwide propagation

4. **GitHub's DNS Checker**:
   - Repository → Settings → Pages
   - GitHub automatically checks and displays status

#### Expected Results

**For edefense.nz** (apex):
```
edefense.nz.            3600    IN    A    185.199.108.153
edefense.nz.            3600    IN    A    185.199.109.153
edefense.nz.            3600    IN    A    185.199.110.153
edefense.nz.            3600    IN    A    185.199.111.153
```

**For www.edefense.nz**:
```
www.edefense.nz.        3600    IN    CNAME    edefense.github.io.
```

### Step 6: Test the Website

Once DNS propagates (1-48 hours), test access:

1. **Test HTTP Access** (before HTTPS enabled):
   ```
   http://edefense.nz
   http://www.edefense.nz
   ```

2. **Test HTTPS Access** (after SSL certificate provisioned):
   ```
   https://edefense.nz
   https://www.edefense.nz
   ```

3. **Test Redirect**:
   - If using www as primary: http://edefense.nz should redirect to https://www.edefense.nz
   - If using apex as primary: http://www.edefense.nz should redirect to https://edefense.nz

4. **Browser Cache**:
   - Clear browser cache if site doesn't load
   - Try incognito/private browsing mode
   - Try different browser or device

5. **Mobile Testing**:
   - Test on mobile device (use mobile data, not WiFi with cached DNS)
   - Verify responsive design works

## 🔧 Troubleshooting

### DNS Not Propagating

**Symptom**: DNS records not showing after configuration

**Solutions**:
1. ✅ **Wait Longer**: DNS can take up to 48 hours (usually 4-6 hours)
2. ✅ **Check TTL**: Lower TTL = faster propagation (set to 300-600 seconds)
3. ✅ **Flush DNS Cache**:
   ```bash
   # Windows
   ipconfig /flushdns

   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

   # Linux
   sudo systemd-resolve --flush-caches
   ```
4. ✅ **Use Different DNS Server**: Try Google DNS (8.8.8.8) or Cloudflare (1.1.1.1)
5. ✅ **Verify at Registrar**: Log in and confirm records saved correctly

### "DNS Check Failed" in GitHub

**Symptom**: GitHub Pages shows "DNS check failed" or "Improperly configured"

**Solutions**:
1. ✅ **Verify CNAME File**: Must match custom domain in GitHub settings exactly
2. ✅ **Check DNS Records**: Ensure all 4 A records exist and point to correct IPs
3. ✅ **Wait for Propagation**: GitHub checks DNS globally, may need 24+ hours
4. ✅ **Remove and Re-add Domain**: In GitHub settings, remove custom domain, wait 5 minutes, add again
5. ✅ **Check CNAME Syntax**: No http://, no www if using apex, no trailing slash

### HTTPS Not Available

**Symptom**: "Enforce HTTPS" checkbox disabled or grayed out

**Solutions**:
1. ✅ **Wait Longer**: SSL provisioning takes 1-24 hours after DNS propagates
2. ✅ **Verify DNS**: GitHub can't issue cert until DNS fully propagated
3. ✅ **Check CAA Records**: If you have CAA records, add:
   ```
   CAA    @    0 issue "letsencrypt.org"
   ```
4. ✅ **Remove Domain and Re-add**: Forces GitHub to re-provision certificate
5. ✅ **Check for DNSSEC Issues**: Some DNSSEC configurations conflict with GitHub Pages

### Site Shows 404 Error

**Symptom**: Domain loads but shows "404 - File not found"

**Solutions**:
1. ✅ **Verify Repository Name**: Must be `edefense.github.io` (matches organization name)
2. ✅ **Check CNAME File**: Must exist in repository root
3. ✅ **Verify index.html**: Must exist in repository root (or configured source folder)
4. ✅ **Check GitHub Pages Settings**: Ensure Pages is enabled and building from correct branch
5. ✅ **Wait for Deployment**: Check Actions tab for build status

### Mixed Content Warnings

**Symptom**: HTTPS works but browser shows "not secure" or mixed content warnings

**Solutions**:
1. ✅ **Update HTTP Links**: Change all `http://` to `https://` in HTML/CSS/JS
2. ✅ **Use Protocol-Relative URLs**: `//cdn.example.com/file.js` (inherits page protocol)
3. ✅ **Check External Resources**: Ensure CDN links use HTTPS
4. ✅ **Verify CSP Headers**: Content Security Policy must allow HTTPS resources

### Redirect Loop

**Symptom**: Browser shows "Too many redirects" error

**Solutions**:
1. ✅ **Check Cloudflare Proxy**: Disable orange cloud (use DNS only)
2. ✅ **Verify CNAME File**: Should match primary domain choice (apex or www)
3. ✅ **Clear Browser Cache and Cookies**
4. ✅ **Check for Conflicting Redirects**: Remove any JavaScript redirects in code

### Domain Showing Old Content

**Symptom**: Domain loads but shows outdated content

**Solutions**:
1. ✅ **Clear Browser Cache**: Ctrl+F5 or Cmd+Shift+R
2. ✅ **Check Git Push**: Verify latest commit on GitHub
3. ✅ **Check Actions Tab**: Ensure GitHub Pages build succeeded
4. ✅ **Wait for CDN**: GitHub CDN can take 10 minutes to update globally
5. ✅ **Purge CDN Cache**: Remove and re-add custom domain to force refresh

## 🔐 Security & Best Practices

### SSL/TLS Certificate

- ✅ **Always Enable HTTPS**: Protects user data and improves SEO
- ✅ **Use HTTP Strict Transport Security (HSTS)**: Add to HTML meta tags
- ✅ **Enable Enforce HTTPS**: Force HTTPS in GitHub Pages settings

### DNS Security

- ✅ **Enable DNSSEC** (if registrar supports): Prevents DNS spoofing
- ✅ **Use Strong Registrar Password**: Enable 2FA on domain account
- ✅ **Lock Domain**: Enable registrar lock to prevent unauthorized transfers
- ✅ **Monitor DNS Changes**: Set up alerts for DNS record modifications

### Redundancy

- ✅ **Use All 4 A Records**: Provides redundancy if one GitHub IP fails
- ✅ **Document DNS Settings**: Keep record of DNS configuration
- ✅ **Test Regularly**: Verify domain resolution weekly/monthly

## 📊 DNS Propagation Timeline

| Time     | Status                                                      |
|----------|-------------------------------------------------------------|
| 0 min    | DNS records configured at registrar                         |
| 5-10 min | Registrar's nameservers updated                             |
| 30 min   | DNS starts propagating to global DNS servers                |
| 1-2 hrs  | 50-70% of global DNS servers updated                        |
| 4-6 hrs  | 90-95% of global DNS servers updated (typical completion)   |
| 24 hrs   | 99% of global DNS servers updated                           |
| 48 hrs   | Maximum propagation time (worst case)                       |

**Factors Affecting Speed**:
- ⏱️ **TTL Value**: Lower TTL = faster updates (but more DNS queries)
- ⏱️ **Registrar**: Some registrars push updates faster than others
- ⏱️ **Geographic Location**: Updates reach some regions faster
- ⏱️ **ISP DNS Caching**: Some ISPs cache longer than TTL specifies

## 📞 Getting Help

### GitHub Support

- **GitHub Pages Docs**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **GitHub Community**: https://github.community/
- **GitHub Support**: https://support.github.com/ (if you have paid account)

### DNS/Registrar Support

- **GoDaddy**: https://www.godaddy.com/help
- **Namecheap**: https://www.namecheap.com/support/
- **Cloudflare**: https://support.cloudflare.com/
- **Contact Your Registrar**: Most have 24/7 chat support

### Community Resources

- **Stack Overflow**: Search "GitHub Pages custom domain"
- **Reddit**: r/webdev, r/github
- **DNS Learning**: https://www.cloudflare.com/learning/dns/what-is-dns/

## ✅ Pre-Launch Checklist

Before announcing your site publicly:

- [ ] **DNS Records Configured**: All A and CNAME records added
- [ ] **CNAME File Created**: Committed and pushed to repository
- [ ] **GitHub Pages Settings**: Custom domain added and verified
- [ ] **DNS Propagated**: Verified with online tools (90%+ green)
- [ ] **HTTPS Enabled**: "Enforce HTTPS" checkbox enabled in settings
- [ ] **SSL Certificate Valid**: No browser warnings when visiting site
- [ ] **Redirects Working**: Both apex and www redirect to primary domain
- [ ] **Mobile Tested**: Site loads correctly on mobile devices
- [ ] **Multiple Browsers**: Tested in Chrome, Firefox, Safari, Edge
- [ ] **SEO Configured**: sitemap.xml, robots.txt, meta tags updated
- [ ] **Analytics Setup**: Google Analytics or alternative configured
- [ ] **Monitoring**: Uptime monitoring configured (UptimeRobot, etc.)
- [ ] **Email Configured**: Contact form email delivery working (when ready)
- [ ] **Documentation Updated**: README.md references correct domain

## 🎯 Quick Reference

### GitHub Pages A Record IPs
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### CNAME Target
```
edefense.github.io
```

### Minimum DNS Records (www primary)
```
A     @      185.199.108.153
A     @      185.199.109.153
A     @      185.199.110.153
A     @      185.199.111.153
CNAME www    edefense.github.io
```

### CNAME File Content
```
www.edefense.nz
```

### Verification Commands
```bash
# Check A records
nslookup edefense.nz

# Check CNAME
nslookup www.edefense.nz

# Full DNS query
dig edefense.nz ANY
```

---

**Document Version**: 1.0.0
**Last Updated**: March 7, 2026
**Maintained By**: eDefense Systems Development Team
**Related Documents**: [EMAIL_SETUP.md](EMAIL_SETUP.md), [SETUP.md](SETUP.md), [README.md](README.md)
