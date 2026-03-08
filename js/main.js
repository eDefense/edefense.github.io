/**
 * eDefense Systems - Main JavaScript
 * Handles form validation, smooth scrolling, and interactive features
 */

(function() {
  'use strict';

  /**
   * Initialize all functionality when DOM is fully loaded
   */
  document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initSmoothScrolling();
    initNavbarBehavior();
    initScrollAnimations();
  });

  /**
   * Form Validation and Submission
   * Implements HTML5 validation with Bootstrap styling
   */
  function initFormValidation() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      // Remove previous feedback
      feedback.style.display = 'none';
      feedback.className = 'mt-3';

      // Check form validity
      if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return;
      }

      // Form is valid - collect data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        product: document.getElementById('product').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
      };

      // Simulate form submission (replace with actual API call)
      submitForm(formData)
        .then(function(response) {
          // Success
          showFeedback('success', 'Thank you! Your message has been sent successfully. We will contact you soon.');
          form.reset();
          form.classList.remove('was-validated');
        })
        .catch(function(error) {
          // Error
          showFeedback('danger', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
          console.error('Form submission error:', error);
        });
    });
  }

  /**
   * Simulates form submission (replace with actual backend API)
   * @param {Object} formData - The form data to submit
   * @returns {Promise} - Promise that resolves on success
   */
  function submitForm(formData) {
    return new Promise(function(resolve, reject) {
      // Simulate API call with timeout
      setTimeout(function() {
        // Log form submission without PII
        console.log('Form submission initiated');

        // Simulate success (90% success rate for demo)
        if (Math.random() > 0.1) {
          resolve({ success: true, message: 'Form submitted successfully' });
        } else {
          reject(new Error('Simulated submission error'));
        }
      }, 1500);
    });
  }

  /**
   * Display feedback message to user
   * @param {string} type - Bootstrap alert type (success, danger, warning, info)
   * @param {string} message - Message to display
   */
  function showFeedback(type, message) {
    const feedback = document.getElementById('formFeedback');

    feedback.className = 'mt-3 alert alert-' + type + ' alert-dismissible fade show';
    feedback.setAttribute('role', 'alert');

    // Use safe DOM construction — never assign untrusted content via innerHTML
    feedback.textContent = '';
    const msgNode = document.createTextNode(message);
    feedback.appendChild(msgNode);
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn-close';
    closeBtn.setAttribute('data-bs-dismiss', 'alert');
    closeBtn.setAttribute('aria-label', 'Close');
    feedback.appendChild(closeBtn);
    feedback.style.display = 'block';

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(function() {
        const bsAlert = new bootstrap.Alert(feedback);
        bsAlert.close();
      }, 5000);
    }
  }

  /**
   * Smooth Scrolling for Anchor Links
   * Enhances navigation experience with smooth scroll behavior
   */
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(event) {
        const href = link.getAttribute('href');

        // Skip empty or hash-only links
        if (href === '#' || href === '#!') return;

        const target = document.querySelector(href);

        if (target) {
          event.preventDefault();

          // Calculate offset for fixed navbar
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight - 20;

          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  /**
   * Navbar Behavior
   * Adds/removes shadow on scroll for visual depth
   */
  function initNavbarBehavior() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('shadow-lg');
      }
    });
  }

  /**
   * Scroll Animations
   * Animate elements when they come into viewport
   */
  function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.product-card, .feature-box');
    animateElements.forEach(function(element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }

  /**
   * Email Validation Helper
   * More robust email validation than HTML5 default
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if valid email format
   */
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Input Sanitization Helper
   * Escapes HTML characters to prevent XSS
   * @param {string} input - User input to sanitize
   * @returns {string} - Sanitized string
   */
  function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  // Animation class is defined in css/main.css (.animate-fade-in) — no dynamic style injection needed

  // Expose utility functions for testing (optional)
  if (typeof window !== 'undefined') {
    window.eDefenseUtils = {
      validateEmail: validateEmail,
      sanitizeInput: sanitizeInput
    };
  }

})();
