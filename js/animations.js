/**
 * RecordaU Animations & Interaction Enhancements
 * Smooth, subtle scroll reveals and interactive feedback
 */
document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Reveal elements on scroll
  const revealElements = document.querySelectorAll(
    '.glass-card, .workflow-step-card, .feature-card, .step-box-card, .security-card, .faq-item, .store-badge-card, .about-card'
  );

  // Setup initial styles for scroll reveal
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Slight stagger effect for nearby elements
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 60);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Phone Mockup 3D Tilt on Hover (Desktop only)
  const phoneDevice = document.querySelector('.phone-device');
  if (phoneDevice && window.innerWidth > 1024) {
    const heroWrapper = document.querySelector('.hero-mockup-wrapper');
    if (heroWrapper) {
      heroWrapper.addEventListener('mousemove', (e) => {
        const rect = heroWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -y * 0.03;
        const rotateY = x * 0.03;
        phoneDevice.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      heroWrapper.addEventListener('mouseleave', () => {
        phoneDevice.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    }
  }
});
