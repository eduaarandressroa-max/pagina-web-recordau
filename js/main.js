/**
 * RecordaU Main Application Script
 * Controls i18n switching, navbar behavior, FAQ accordion, demo viewer, and contact form
 */

// --- 1. Internationalization (i18n) Engine ---
let currentLang = localStorage.getItem('recordau_lang') || 'es';

function updateLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('recordau_lang', lang);
  document.documentElement.lang = lang;

  // Update text content with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      // Check if text has HTML tags
      if (translations[lang][key].includes('<')) {
        element.innerHTML = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // Update input placeholders with data-i18n-ph
  document.querySelectorAll('[data-i18n-ph]').forEach(element => {
    const key = element.getAttribute('data-i18n-ph');
    if (translations[lang][key]) {
      element.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Update language buttons active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// --- 2. Toast Notification Helper ---
function showToast(message, duration = 3500) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 14 14"></polyline>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// --- 3. DOM Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize default language
  updateLanguage(currentLang);

  // Language switcher event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetLang = e.currentTarget.getAttribute('data-lang');
      updateLanguage(targetLang);
    });
  });

  // Sticky Navbar Scroll Effect
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Menu
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu on clicking any link inside
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items for single-open experience
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Demo Viewer Tab Switching
  const demoTabs = document.querySelectorAll('.demo-tab-btn');
  const demoPlaceholderTitle = document.getElementById('demo-placeholder-title');
  const demoPlaceholderDesc = document.getElementById('demo-placeholder-desc');

  demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      demoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetTab = tab.getAttribute('data-tab');
      if (demoPlaceholderTitle && demoPlaceholderDesc) {
        demoPlaceholderTitle.setAttribute('data-i18n', `demo_ph_${targetTab}_title`);
        demoPlaceholderDesc.setAttribute('data-i18n', `demo_ph_${targetTab}_desc`);
        updateLanguage(currentLang);
      }
    });
  });

  // Download "Coming Soon" Buttons Handler
  document.querySelectorAll('.btn-download-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = currentLang === 'es' 
        ? 'Próximamente en Google Play y App Store. ¡Estamos en fase de preparación!' 
        : 'Coming soon on Google Play and App Store. Currently in preparation!';
      showToast(msg);
    });
  });

  // Contact Form Handling (Local & Mailto preparation)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        const errorMsg = currentLang === 'es' 
          ? 'Por favor, completa todos los campos del formulario.' 
          : 'Please fill out all fields in the form.';
        showToast(errorMsg);
        return;
      }

      // Visual success confirmation
      const successMsg = currentLang === 'es'
        ? '¡Gracias ' + name + '! Tu mensaje ha sido preparado.'
        : 'Thank you ' + name + '! Your message is ready to send.';
      showToast(successMsg);

      // Prepare mailto link as fallback for local static operation
      const mailtoUrl = `mailto:soporte@recordau.app?subject=${encodeURIComponent('Contacto RecordaU: ' + name)}&body=${encodeURIComponent('Nombre: ' + name + '\nCorreo: ' + email + '\n\nMensaje:\n' + message)}`;
      window.location.href = mailtoUrl;

      contactForm.reset();
    });
  }

  // Floating Contact Button Click
  const floatingBtn = document.querySelector('.floating-contact-btn');
  if (floatingBtn) {
    floatingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
