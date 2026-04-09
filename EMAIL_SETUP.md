# Contact Form Email Configuration Guide

**Status**: Contact form currently disabled (awaiting email configuration)
**Last Updated**: March 7, 2026

## 📋 Overview

The "Get In Touch" contact form has been temporarily disabled until email functionality is properly configured. This document provides detailed instructions for setting up email integration and re-enabling the contact form.

## 🔴 What Was Disabled

The following components have been temporarily disabled:

### 1. Contact Form Section
- **Location**: `index.html` (lines ~285-345)
- **Status**: Commented out with HTML comments
- **Label**: `<!-- Contact Section - DISABLED: Awaiting email configuration -->`

### 2. Navigation Links
- **Top Navigation**: "Contact" menu item commented out
- **Hero CTA Button**: Changed from "Get Started" (→ #contact) to "Learn More" (→ #about)

### 3. Footer Contact Information
- **Email Link**: Temporarily hidden (prepared for info@edefense.nz)
- **Section Title**: Changed from "Contact" to "Links"
- **Domain**: Updated to edefense.nz (from edefense.github.io)

## 🟢 How to Re-Enable the Contact Form

### Step 1: Choose Email Integration Method

Select one of the following email integration options:

#### **Option A: Formspree (Recommended for Quick Setup)**

**Pros**:
- ✅ 5-minute setup
- ✅ No backend required
- ✅ 50 submissions/month free
- ✅ Spam protection included
- ✅ Email notifications
- ✅ No server maintenance

**Cons**:
- ❌ Monthly submission limits
- ❌ Formspree branding (free tier)
- ❌ Limited customization

**Setup Instructions**:

1. **Create Formspree Account**:
   - Visit: https://formspree.io
   - Sign up with your edefense.nz email address
   - Verify your email

2. **Create New Form**:
   - Click "New Form" in dashboard
   - Form name: "eDefense Contact Form"
   - Email: `info@edefense.nz` (or your preferred email)
   - Copy the form endpoint: `https://formspree.io/f/YOUR_FORM_ID`

3. **Update `js/main.js`**:

   Find the `submitForm()` function (around line 70-88) and replace with:

   ```javascript
   /**
    * Submit contact form to Formspree
    * @param {FormData} formData - The form data to submit
    */
   async function submitForm(formData) {
       const formFeedback = document.getElementById('formFeedback');

       try {
           const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
               method: 'POST',
               body: formData,
               headers: {
                   'Accept': 'application/json'
               }
           });

           if (response.ok) {
               formFeedback.style.display = 'block';
               formFeedback.className = 'alert alert-success mt-3';
               formFeedback.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';

               // Reset form
               document.getElementById('contactForm').reset();
               document.getElementById('contactForm').classList.remove('was-validated');
           } else {
               throw new Error('Form submission failed');
           }
       } catch (error) {
           formFeedback.style.display = 'block';
           formFeedback.className = 'alert alert-danger mt-3';
           formFeedback.textContent = 'Oops! Something went wrong. Please email us directly at info@edefense.nz';
       }
   }
   ```

   **Replace `YOUR_FORM_ID`** with the ID from step 2.

4. **Test the form**:
   - Open `index.html` in a browser
   - Fill out and submit the form
   - Check that you receive the email at info@edefense.nz

#### **Option B: EmailJS**

**Pros**:
- ✅ 200 emails/month free
- ✅ Multiple email services (Gmail, Outlook, etc.)
- ✅ Template engine
- ✅ No backend required

**Cons**:
- ❌ Requires API keys in frontend
- ❌ More complex setup

**Setup Instructions**:

1. **Create EmailJS Account**:
   - Visit: https://www.emailjs.com
   - Sign up and verify email

2. **Configure Email Service**:
   - Add email service (Gmail, Outlook, etc.)
   - Connect your info@edefense.nz account
   - Create email template with form fields

3. **Update `index.html`**:

   Add EmailJS SDK before closing `</body>` tag:

   ```html
   <!-- EmailJS SDK -->
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script type="text/javascript">
       (function(){
           emailjs.init("YOUR_PUBLIC_KEY");
       })();
   </script>
   ```

4. **Update `js/main.js`**:

   Replace `submitForm()` function:

   ```javascript
   async function submitForm(formData) {
       const formFeedback = document.getElementById('formFeedback');

       const templateParams = {
           from_name: formData.get('name'),
           from_email: formData.get('email'),
           company: formData.get('company'),
           product: formData.get('product'),
           message: formData.get('message')
       };

       try {
           await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);

           formFeedback.style.display = 'block';
           formFeedback.className = 'alert alert-success mt-3';
           formFeedback.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';

           document.getElementById('contactForm').reset();
           document.getElementById('contactForm').classList.remove('was-validated');
       } catch (error) {
           formFeedback.style.display = 'block';
           formFeedback.className = 'alert alert-danger mt-3';
           formFeedback.textContent = 'Oops! Something went wrong. Please email us directly at info@edefense.nz';
       }
   }
   ```

#### **Option C: Spring Boot Backend (Recommended for Enterprise)**

**Pros**:
- ✅ Full control over email delivery
- ✅ Unlimited submissions
- ✅ Custom validation & spam filtering
- ✅ Integration with existing infrastructure
- ✅ Database logging of submissions

**Cons**:
- ❌ Requires backend deployment
- ❌ More complex setup
- ❌ Server maintenance required

**Setup Instructions**:

1. **Create Email Endpoint in WebSite Project**:

   Add to `WebSite` Spring Boot project (Spring Boot 4.0.5):

   ```java
   @RestController
   @RequestMapping("/api/contact")
   @CrossOrigin(origins = "https://edefense.nz")
   public class ContactController {

       @Autowired
       private JavaMailSender mailSender;

       @PostMapping("/submit")
       public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactFormDto form) {
           try {
               SimpleMailMessage message = new SimpleMailMessage();
               message.setTo("info@edefense.nz");
               message.setSubject("Contact Form: " + form.getProduct());
               message.setText(
                   "Name: " + form.getName() + "\n" +
                   "Email: " + form.getEmail() + "\n" +
                   "Company: " + form.getCompany() + "\n" +
                   "Product: " + form.getProduct() + "\n" +
                   "Message: " + form.getMessage()
               );

               mailSender.send(message);
               return ResponseEntity.ok(Map.of("success", true));
           } catch (Exception e) {
               return ResponseEntity.status(500)
                   .body(Map.of("success", false, "error", "Failed to send message"));
           }
       }
   }
   ```

2. **Configure Spring Mail Properties**:

   Add to `application.yml`:

   ```yaml
   spring:
     mail:
       host: smtp.gmail.com  # or your SMTP server
       port: 587
       username: ${MAIL_USERNAME}
       password: ${MAIL_PASSWORD}
       properties:
         mail:
           smtp:
             auth: true
             starttls:
               enable: true
   ```

3. **Update `js/main.js`**:

   Replace `submitForm()` function:

   ```javascript
   async function submitForm(formData) {
       const formFeedback = document.getElementById('formFeedback');

       const data = {
           name: formData.get('name'),
           email: formData.get('email'),
           company: formData.get('company'),
           product: formData.get('product'),
           message: formData.get('message')
       };

       try {
           const response = await fetch('https://api.edefense.nz/api/contact/submit', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
           });

           const result = await response.json();

           if (result.success) {
               formFeedback.style.display = 'block';
               formFeedback.className = 'alert alert-success mt-3';
               formFeedback.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';

               document.getElementById('contactForm').reset();
               document.getElementById('contactForm').classList.remove('was-validated');
           } else {
               throw new Error(result.error || 'Submission failed');
           }
       } catch (error) {
           formFeedback.style.display = 'block';
           formFeedback.className = 'alert alert-danger mt-3';
           formFeedback.textContent = 'Oops! Something went wrong. Please email us directly at info@edefense.nz';
       }
   }
   ```

4. **Deploy Spring Boot Backend**:
   - Deploy WebSite project to your server
   - Set environment variables: `MAIL_USERNAME`, `MAIL_PASSWORD`
   - Update CORS origins to match your domain

### Step 2: Uncomment Contact Form HTML

Once you've chosen and configured an email integration method:

1. **Open `index.html`**

2. **Find the Contact Section** (around line 285-345):
   ```html
   <!-- Contact Section - DISABLED: Awaiting email configuration -->
   <!--
   <section id="contact" class="py-5">
   ...
   </section>
   -->
   ```

3. **Remove the Comment Tags**:
   - Delete the opening `<!--` on line ~286
   - Delete the closing `-->` on line ~344
   - Remove or update the "DISABLED" comment

   **Result**:
   ```html
   <!-- Contact Section -->
   <section id="contact" class="py-5">
   ...
   </section>
   ```

### Step 3: Restore Navigation Links

1. **Restore Top Navigation Contact Link** (around line 62-66):

   **Before**:
   ```html
   <!-- Contact link disabled: Awaiting email configuration
   <li class="nav-item">
       <a class="nav-link" href="#contact">Contact</a>
   </li>
   -->
   ```

   **After**:
   ```html
   <li class="nav-item">
       <a class="nav-link" href="#contact">Contact</a>
   </li>
   ```

2. **Restore Hero CTA Button** (around line 79-82):

   **Before**:
   ```html
   <div class="d-flex gap-3">
       <a href="#products" class="btn btn-primary btn-lg">Explore Products</a>
       <a href="#about" class="btn btn-outline-light btn-lg">Learn More</a>
   </div>
   ```

   **After**:
   ```html
   <div class="d-flex gap-3">
       <a href="#products" class="btn btn-primary btn-lg">Explore Products</a>
       <a href="#contact" class="btn btn-outline-light btn-lg">Get Started</a>
   </div>
   ```

### Step 4: Restore Footer Contact Information

1. **Update Footer Links Section** (around line 382-397):

   **Before**:
   ```html
   <div class="col-md-4">
       <h5 class="mb-3">Links</h5>
       <ul class="list-unstyled text-muted">
           <!-- Contact info disabled: Awaiting email configuration
           <li class="mb-2">
               <i class="fas fa-envelope me-2"></i>
               <a href="mailto:info@edefense.nz" class="text-muted text-decoration-none">info@edefense.nz</a>
           </li>
           -->
           <li class="mb-2">
               <i class="fas fa-globe me-2"></i>
               <a href="https://edefense.nz" class="text-muted text-decoration-none">edefense.nz</a>
           </li>
           <li class="mb-2">
               <i class="fas fa-code me-2"></i>
               <a href="https://github.com/edefense" class="text-muted text-decoration-none">GitHub</a>
           </li>
       </ul>
   </div>
   ```

   **After**:
   ```html
   <div class="col-md-4">
       <h5 class="mb-3">Contact</h5>
       <ul class="list-unstyled text-muted">
           <li class="mb-2">
               <i class="fas fa-envelope me-2"></i>
               <a href="mailto:info@edefense.nz" class="text-muted text-decoration-none">info@edefense.nz</a>
           </li>
           <li class="mb-2">
               <i class="fas fa-globe me-2"></i>
               <a href="https://edefense.nz" class="text-muted text-decoration-none">edefense.nz</a>
           </li>
           <li class="mb-2">
               <i class="fas fa-code me-2"></i>
               <a href="https://github.com/edefense" class="text-muted text-decoration-none">GitHub</a>
           </li>
       </ul>
   </div>
   ```

## 🧪 Testing the Contact Form

After re-enabling and configuring email:

### 1. Local Testing

```bash
# Start local server
python -m http.server 8000

# Or use VS Code Live Server extension
```

Visit `http://localhost:8000` and test:

- ✅ Form validation (required fields)
- ✅ Email format validation
- ✅ Successful submission
- ✅ Error handling (disconnect internet to test)
- ✅ Form reset after success
- ✅ Feedback messages display correctly

### 2. Email Verification

1. Submit test form with your email as sender
2. Check that email arrives at `info@edefense.nz`
3. Verify all form fields are included
4. Check email formatting is readable

### 3. Spam Testing

Submit forms with:
- ❌ Common spam keywords
- ❌ Multiple URLs in message
- ❌ Suspicious email addresses

Verify spam protection is working (if using Formspree/Spring Boot filter).

### 4. Performance Testing

- ⚡ Form submits within 2 seconds
- ⚡ No JavaScript errors in console
- ⚡ Mobile responsive (test 320px-768px)
- ⚡ Accessibility (screen reader compatible)

## 🔒 Security Checklist

Before going live with contact form:

- [ ] **SSL/HTTPS enabled** (GitHub Pages enforces this)
- [ ] **CORS configured** (if using Spring Boot backend)
- [ ] **Rate limiting** (prevent spam submissions)
- [ ] **Input sanitization** (already implemented in `js/main.js`)
- [ ] **Email validation** (client-side + server-side)
- [ ] **Honeypot field** (consider adding for spam prevention)
- [ ] **reCAPTCHA** (optional, adds friction but prevents bots)
- [ ] **API keys protected** (use environment variables)
- [ ] **Error messages generic** (don't expose system details)

## 📝 Additional Configuration

### Custom Domain Setup (edefense.nz)

**Status**: Need to create CNAME file and configure DNS

1. **Create CNAME file** in repository root:
   ```
   edefense.nz
   ```
   OR
   ```
   www.edefense.nz
   ```

2. **Configure DNS Records** (in your domain registrar):

   **For apex domain (edefense.nz)**:
   ```
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   ```

   **For www subdomain**:
   ```
   CNAME    www    edefense.github.io
   ```

3. **Recommendation**: Use `www.edefense.nz` as primary with apex redirect for best performance and flexibility.

4. **Enable HTTPS** in GitHub Pages settings (Settings → Pages → Enforce HTTPS).

### Email Account Setup

**Required Email**: info@edefense.nz

**Setup Options**:

1. **Google Workspace** (Recommended):
   - Professional email: info@edefense.nz
   - $6/user/month
   - Excellent spam filtering
   - Mobile app support
   - Calendar + Drive integration

2. **Microsoft 365**:
   - Professional email: info@edefense.nz
   - $6/user/month
   - Outlook integration
   - Teams + OneDrive

3. **Domain Registrar Email**:
   - Often included free with domain
   - Limited features
   - May lack robust spam filtering

## 🎯 Recommended Implementation Path

**Phase 1: Quick Launch (Day 1)**
1. ✅ Set up email: info@edefense.nz (Google Workspace/Microsoft 365)
2. ✅ Configure Formspree (5 minutes)
3. ✅ Test contact form locally
4. ✅ Uncomment HTML sections (Steps 2-4 above)
5. ✅ Push to GitHub, verify live

**Phase 2: Domain Setup (Week 1)**
1. ⏳ Create CNAME file
2. ⏳ Configure DNS records
3. ⏳ Enable HTTPS enforcement
4. ⏳ Test email delivery on custom domain

**Phase 3: Enterprise Solution (Month 1)**
1. 🔮 Build Spring Boot email endpoint
2. 🔮 Add database logging
3. 🔮 Implement advanced spam filtering
4. 🔮 Add rate limiting
5. 🔮 Set up monitoring/alerts

## 📧 Support

If you need help with email integration:

1. **Email Integration Issues**: Check service-specific documentation (Formspree, EmailJS)
2. **DNS Configuration**: Contact your domain registrar support
3. **Spring Boot Backend**: Refer to WebSite project documentation
4. **General Questions**: Review this document's troubleshooting section

## 🔧 Troubleshooting

### Form Not Submitting
- ✅ Check browser console for JavaScript errors
- ✅ Verify email endpoint URL is correct
- ✅ Test with browser DevTools Network tab
- ✅ Ensure CORS is configured (if using backend)

### Emails Not Arriving
- ✅ Check spam/junk folder
- ✅ Verify email configuration (SMTP settings)
- ✅ Test with alternative email address
- ✅ Check service quota limits (Formspree: 50/month free)

### SSL/HTTPS Issues
- ✅ Wait 24 hours after DNS changes
- ✅ Clear browser cache
- ✅ Verify CNAME file content
- ✅ Check GitHub Pages settings

---

**Document Version**: 1.0.0
**Last Updated**: March 7, 2026
**Maintained By**: eDefense Systems Development Team
